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
use Symfony\Component\Validator\Constraints\Choice;
use Symfony\Component\Validator\Constraints\NotBlank;
use TeamELF\Exception\HttpForbiddenException;
use TeamELF\Ext\Task\Task;
use TeamELF\Ext\Task\TaskAssignee;
use TeamELF\Ext\Task\TaskProcess;
use TeamELF\Ext\Task\TaskReport;
use TeamELF\Http\AbstractController;

class AssigneeDeleteController extends AbstractController
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
        $assignee = TaskAssignee::find($this->getParameter('assigneeId'));
        if (!$assignee->can($this->getAuth(), 'delete')) {
            throw new HttpForbiddenException();
        }
        if (!$task || !$assignee || $assignee->getTask()->getId() !== $task->getId() || $assignee->isAdmin()) {
            throw new HttpForbiddenException();
        }
        if (!$task->isDraft() && TaskReport::count(['task' => $task, 'assignee' => $assignee]) > 0) {
            throw new HttpForbiddenException('该成员已经提交过报告，不能删除');
        }
        $assignee->delete();
        return response();
    }
}
