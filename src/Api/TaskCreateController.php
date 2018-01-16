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
use TeamELF\Ext\Task\TaskAssignee;
use TeamELF\Http\AbstractController;

class TaskCreateController extends AbstractController
{
    protected $needPermissions = ['task.create'];

    /**
     * handle the request
     *
     * @return Response
     */
    public function handler(): Response
    {
        $task = (new Task())
            ->name(date('Y-m-d', time()) . ' 新任务')
            ->save();
        (new TaskAssignee())
            ->assignee($this->getAuth())
            ->task($task)
            ->admin(true)
            ->save();
        return response([
            'id' => $task->getId()
        ]);
    }
}
