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
use TeamELF\Http\AbstractController;

class AssigneeDeleteController extends AbstractController
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
        $task = Task::find($this->getParameter('taskId'));
        $assignee = TaskAssignee::find($this->getParameter('assigneeId'));
        if (!$task || !$assignee || $assignee->getTask()->getId() !== $task->getId()
            || !$task->isDraft() || $assignee->isAdmin()) {
            throw new HttpForbiddenException();
        }
        $assignee->delete(true);
        return response();
    }
}