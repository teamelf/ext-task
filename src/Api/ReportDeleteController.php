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
use TeamELF\Ext\Task\TaskReport;
use TeamELF\Http\AbstractController;

class ReportDeleteController extends AbstractController
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
        $report = TaskReport::find($this->getParameter('reportId'));
        if (!$report->can($this->getAuth(), 'delete')) {
            throw new HttpForbiddenException();
        }
        if (!$task || !$report || $report->getTask()->getId() !== $task->getId()) {
            throw new HttpForbiddenException();
        }
        if (!$report->isDraft()) {
            throw new HttpForbiddenException('报告已提交，不能删除');
        }
        $report->delete();
        return response();
    }
}
