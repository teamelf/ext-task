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
use Symfony\Component\Validator\Constraints\NotBlank;
use TeamELF\Exception\HttpForbiddenException;
use TeamELF\Ext\Task\Task;
use TeamELF\Ext\Task\TaskReport;
use TeamELF\Http\AbstractController;

class ReportCreateController extends AbstractController
{
    protected $needPermissions = ['task.update'];

    /**
     * handle the request
     *
     * @return Response
     * @throws HttpForbiddenException
     */
    public function handler(): Response
    {
        $data = $this->validate([
            'summary' => [
                new NotBlank()
            ],
            'plan' => [],
            'risk' => []
        ]);
        $task = Task::find($this->getParameter('taskId'));
        if (!$task || $task->isDraft()) {
            throw new HttpForbiddenException('任务还未发布，不能提交报告');
        }
        $report = (new TaskReport($data))
            ->task($task)
            ->assignee($this->getAuth())
            ->save();
        return response([
            'id' => $report->getId()
        ]);
    }
}
