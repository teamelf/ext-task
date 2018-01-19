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
use TeamELF\Ext\Task\Task;
use TeamELF\Http\AbstractController;

class TaskListController extends AbstractController
{
    protected $needLogin = true;

    /**
     * handle the request
     *
     * @return Response
     */
    public function handler(): Response
    {
        $response = [];
        foreach (Task::all() as $task) {
            if ($task->can($this->getAuth(), 'item')) {
                $response[] = [
                    'id' => $task->getId(),
                    'createdAt' => $task->getCreatedAt() ? $task->getCreatedAt()->getTimestamp() : null,
                    'name' => $task->getName(),
                    'abstract' => $task->getAbstract(),
                    'teamwork' => $task->isTeamwork(),
                    'draft' => $task->isDraft()
                ];
            }
        }
        return response($response);
    }
}
