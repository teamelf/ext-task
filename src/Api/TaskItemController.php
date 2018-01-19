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
use TeamELF\Http\AbstractController;

class TaskItemController extends AbstractController
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
        if (!$task) {
            throw new HttpForbiddenException();
        }
        if (!$task->can($this->getAuth(), 'item')) {
            throw new HttpForbiddenException();
        }
        return response([
            'id' => $task->getId(),
            'createdAt' => $task->getCreatedAt() ? $task->getCreatedAt()->getTimestamp() : null,
            'updatedAt' => $task->getUpdatedAt() ? $task->getUpdatedAt()->getTimestamp() : null,
            'name' => $task->getName(),
            'introduction' => $task->getIntroduction(),
            'teamwork' => $task->isTeamwork(),
            'draft' => $task->isDraft()
        ]);
    }
}
