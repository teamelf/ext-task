<?php

/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace TeamELF\Ext\Task\Listener;

use TeamELF\Event\RoutesWillBeLoaded;
use TeamELF\Ext\Task\Api\ProcessCreateController;
use TeamELF\Ext\Task\Api\ProcessDeleteController;
use TeamELF\Ext\Task\Api\ProcessListController;
use TeamELF\Ext\Task\Api\ProcessUpdateController;
use TeamELF\Ext\Task\Api\TaskCreateController;
use TeamELF\Ext\Task\Api\TaskItemController;
use TeamELF\Ext\Task\Api\TaskListController;
use TeamELF\Ext\Task\Api\TaskPublishController;
use TeamELF\Ext\Task\Api\TaskUpdateController;

class RoutesListener
{
    public function subscribe()
    {
        app()->listen(RoutesWillBeLoaded::class, [$this, 'handler']);
    }

    public function handler(RoutesWillBeLoaded $event)
    {
        $event->getRouter()
            ->prefix('/api/task')
            ->get('task-list', '', TaskListController::class)
            ->post('task-create', '', TaskCreateController::class)
            ->get('task-view', '/{taskId}', TaskItemController::class)
            ->put('task-update', '/{taskId}', TaskUpdateController::class)
            ->post('task-publish', '/{taskId}', TaskPublishController::class)

            ->prefix('/api/task/{taskId}/process')
            ->get('task-process-list', '', ProcessListController::class)
            ->post('task-process-create', '', ProcessCreateController::class)
            ->put('task-process-update', '/{processId}', ProcessUpdateController::class)
            ->delete('task-process-delete', '/{processId}', ProcessDeleteController::class)

            ->prefix('/api/task/{taskId}/assignee')
            ->get('task-assignee-view', '')
            ->post('task-assignee-create', '/{assigneeId}')
            ->delete('task-assignee-delete', '/{assigneeId}')

            ->prefix('/api/task/{taskId}/report')
            ->get('task-report-view', '')
            ->post('task-report-create', '');
    }
}
