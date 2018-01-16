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
use TeamELF\Core\Member;
use TeamELF\Exception\HttpForbiddenException;
use TeamELF\Exception\HttpNotFoundException;
use TeamELF\Ext\Task\Task;
use TeamELF\Ext\Task\TaskAssignee;
use TeamELF\Ext\Task\TaskProcess;
use TeamELF\Http\AbstractController;

class AssigneeCreateController extends AbstractController
{
    protected $needPermissions = ['task.update'];

    /**
     * handle the request
     *
     * @return Response
     * @throws HttpForbiddenException
     * @throws HttpNotFoundException
     */
    public function handler(): Response
    {
        $data = $this->validate([
            'username' => [
                new NotBlank()
            ]
        ]);
        $task = Task::find($this->getParameter('taskId'));
        $member = Member::search($data['username']);
        if (!$task || !$member) {
            throw new HttpNotFoundException();
        }
        $attributes = [
            'task' => $task,
            'assignee' => $member
        ];
        if (TaskAssignee::where($attributes)) {
            throw new HttpForbiddenException();
        }
        $assignee = (new TaskAssignee($attributes))->save();
        return response([
            'id' => $assignee->getId()
        ]);
    }
}
