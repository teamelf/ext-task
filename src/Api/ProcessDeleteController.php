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
use TeamELF\Ext\Task\TaskProcess;
use TeamELF\Ext\Task\TaskReportMention;
use TeamELF\Http\AbstractController;

class ProcessDeleteController extends AbstractController
{
    protected $needLogin = true;

    /**
     * handle the request
     *
     * @return Response
     * @throws HttpForbiddenException
     */
    public function handler(): Response
    {
        $task = Task::find($this->getParameter('taskId'));
        $process = TaskProcess::find($this->getParameter('processId'));
        if (!$process->can($this->getAuth(), 'delete')) {
            throw new HttpForbiddenException();
        }
        if (!$task || !$process || $process->getTask()->getId() !== $task->getId()) {
            throw new HttpForbiddenException();
        }
        if (!$task->isDraft() && TaskReportMention::count(['process' => $process])) {
            throw new HttpForbiddenException('已经有报告提到过该流程，不能删除');
        }
        $process->delete();
        return response();
    }
}
