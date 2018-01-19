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

class ReportSubmitController extends AbstractController
{
    protected $needLogin = true;

    protected function findMentions($content)
    {
        $matches = [];
        preg_match_all(
            '/(\b(finish|close|fix|done|finished|closed|fixed)\b )?(task|process|assignee)#([0-9A-Za-z]*)\b/',
            $content, $matches, PREG_SET_ORDER
        );
//        var_dump($matches);
        $mentions = [];
        foreach ($matches as $match) {
            $obj = Task::find($match[4]) ?? TaskProcess::find($match[4]) ?? TaskAssignee::find($match[4]);
            if ($obj) {
                $mentions[] = [
                    'prefix' => $match[2],
                    'category' => $match[3],
                    'obj' => $obj
                ];
            }
        }
        return $mentions;
    }

    protected function handleMentions(TaskReport $report)
    {
        // [action ]category#id
        // action   finish|close|fix|done|finished|closed|fixed
        // category task|process|assignee
        //
        // e.g.
        //   I've done process#666
        //   I'm working on process#233
        //   I might have some problems. process#777
        $mentions = array_merge(
            $this->findMentions($report->getSummary()),
            $this->findMentions($report->getPlan()),
            $this->findMentions($report->getRisk())
        );
//        var_dump($mentions);
        foreach ($mentions as $mention) {
            $m = (new TaskReportMention())
                ->report($report)
                ->prefix($mention['prefix']);
            switch ($mention['category']) {
                case 'task':
                    $m->task($mention['obj']);
                    break;
                case 'process':
                    $m->process($mention['obj']);
                    break;
                case 'assignee':
                    $m->assignee($mention['obj']);
                    break;
                default:
            }
            $m->save();
        }
    }

    /**
     * handle the request
     *
     * @return Response
     * @throws HttpForbiddenException
     */
    public function handler(): Response
    {
        $task = Task::find($this->getParameter('taskId'));
        $report = TaskReport::find($this->getParameter('reportId'));
        if (!$task || !$report || $report->getTask()->getId() !== $task->getId()) {
            throw new HttpForbiddenException();
        }
        if (!$report->can($this->getAuth(), 'submit')) {
            throw new HttpForbiddenException();
        }
        if (!$report->isDraft()) {
            throw new HttpForbiddenException();
        }
        $this->handleMentions($report);
        $report->draft(false)->save();
        return response();
    }
}
