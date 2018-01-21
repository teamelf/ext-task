<?php

/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace TeamELF\Ext\Task\Api;

use Symfony\Component\HttpFoundation\Response;
use TeamELF\Exception\HttpForbiddenException;
use TeamELF\Ext\Task\Task;
use TeamELF\Ext\Task\TaskAssignee;
use TeamELF\Ext\Task\TaskProcess;
use TeamELF\Ext\Task\TaskReport;
use TeamELF\Ext\Task\TaskReportMention;
use TeamELF\Http\AbstractController;

class TaskStatisticsController extends AbstractController
{
    /**
     * handle the request
     *
     * @return Response
     * @throws HttpForbiddenException
     */
    public function handler(): Response
    {
        $task = Task::find($this->getParameter('taskId'));
        if (!$task) {
            throw new HttpForbiddenException();
        }
        if (!$task->can($this->getAuth(), 'item')) {
            throw new HttpForbiddenException();
        }
        $doneProcess = 0;
        $doneReportCount = 0;
        $totalReportCount = 0;
        $statistics = [];
        $processes = TaskProcess::where(['task' => $task]);
        $assignees = TaskAssignee::where(['task' => $task]);
        $reports = TaskReport::where(['task' => $task, 'draft' => false]);
        $prefix = ['finish', 'close', 'fix', 'done', 'finished', 'closed', 'fixed'];
        foreach ($processes as $process) {
            $statistics[$process->getId()] = [
                'done' => 0,
                'total' => 0,
                'progress' => 0,
                'assignee' => []
            ];
            $sa = &$statistics[$process->getId()]['assignee'];
            foreach ($assignees as $assignee) {
                $sa[$assignee->getAssignee()->getUsername()] = [
                    'done' => 0,
                    'total' => 0,
                    'progress' => 0
                ];
            }
        }
        foreach ($processes as $process) {
            $processId = $process->getId();
            $sp = &$statistics[$processId];
            foreach ($reports as $report) {
                $username = $report->getAssignee()->getUsername();
                $sa = &$sp['assignee'][$username];
                if (TaskReportMention::count(['report' => $report, 'process' => $process, 'prefix' => $prefix])) {
                    // the report has done the process
                    ++$sp['done']; ++$sa['done']; ++$doneReportCount;
                    ++$sp['total']; ++$sa['total']; ++$totalReportCount;
                    $sp['progress'] = $sa['progress'] = 100;
                } else if (TaskReportMention::count(['report' => $report, 'process' => $process])) {
                    // the report belongs to the process
                    ++$sp['total']; ++$sa['total']; ++$totalReportCount;
                } else {
                    // do nothing
                }
            }
            if ($sp['done'] > 0) {
                ++$doneProcess;
            }
        }
        return response([
            'process' => $statistics,
            'done' => $doneReportCount,
            'total' => $totalReportCount,
            'progress' => count($processes) === 0 ? 0 : 100.0 * $doneProcess / count($processes)
        ]);
    }
}
