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
use TeamELF\Exception\HttpNotFoundException;
use TeamELF\Ext\Task\Task;
use TeamELF\Ext\Task\TaskAssignee;
use TeamELF\Ext\Task\TaskProcess;
use TeamELF\Http\AbstractController;

class AssigneeListController extends AbstractController
{
    protected $needLogin = true;

    /**
     * handle the request
     *
     * @return Response
     * @throws HttpForbiddenException
     * @throws HttpNotFoundException
     */
    public function handler(): Response
    {
        $task = Task::find($this->getParameter('taskId'));
        if (!$task) {
            throw new HttpNotFoundException();
        }
        if (!$task->can($this->getAuth(), 'item')) {
            throw new HttpForbiddenException();
        }
        $response = [];
        foreach (TaskAssignee::where(['task' => $task], ['createdAt' => 'ASC']) as $assignee) {
            $response[] = [
                'id' => $assignee->getId(),
                'username' => $assignee->getAssignee()->getUsername(),
                'name' => $assignee->getAssignee()->getName(),
                'admin' => $assignee->isAdmin()
            ];
        }
        return response($response);
    }
}
