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
use TeamELF\Ext\Task\Api\AssigneeCreateController;
use TeamELF\Ext\Task\Api\AssigneeDeleteController;
use TeamELF\Ext\Task\Api\AssigneeListController;
use TeamELF\Ext\Task\Api\ProcessCreateController;
use TeamELF\Ext\Task\Api\ProcessDeleteController;
use TeamELF\Ext\Task\Api\ProcessListController;
use TeamELF\Ext\Task\Api\ProcessUpdateController;
use TeamELF\Ext\Task\Api\ReportCreateController;
use TeamELF\Ext\Task\Api\ReportDeleteController;
use TeamELF\Ext\Task\Api\ReportItemController;
use TeamELF\Ext\Task\Api\ReportListController;
use TeamELF\Ext\Task\Api\ReportSubmitController;
use TeamELF\Ext\Task\Api\ReportUpdateController;
use TeamELF\Ext\Task\Api\TaskCreateController;
use TeamELF\Ext\Task\Api\TaskDeleteController;
use TeamELF\Ext\Task\Api\TaskItemController;
use TeamELF\Ext\Task\Api\TaskListController;
use TeamELF\Ext\Task\Api\TaskPublishController;
use TeamELF\Ext\Task\Api\TaskStatisticsController;
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
            ->delete('task-delete', '/{taskId}', TaskDeleteController::class)
            ->post('task-publish', '/{taskId}', TaskPublishController::class)
            ->get('task-statistics', '/{taskId}/statistics', TaskStatisticsController::class)

            ->prefix('/api/task/{taskId}/process')
            ->get('task-process-list', '', ProcessListController::class)
            ->post('task-process-create', '', ProcessCreateController::class)
            ->put('task-process-update', '/{processId}', ProcessUpdateController::class)
            ->delete('task-process-delete', '/{processId}', ProcessDeleteController::class)

            ->prefix('/api/task/{taskId}/assignee')
            ->get('task-assignee-list', '', AssigneeListController::class)
            ->post('task-assignee-create', '', AssigneeCreateController::class)
            ->delete('task-assignee-delete', '/{assigneeId}', AssigneeDeleteController::class)

            ->prefix('/api/task/{taskId}/report')
            ->get('task-report-list', '', ReportListController::class)
            ->post('task-report-create', '', ReportCreateController::class)
            ->get('task-report-view', '/{reportId}', ReportItemController::class)
            ->put('task-report-update', '/{reportId}', ReportUpdateController::class)
            ->delete('task-report-delete', '/{reportId}', ReportDeleteController::class)
            ->post('task-report-submit', '/{reportId}', ReportSubmitController::class);
    }
}
