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
use TeamELF\Ext\Task\Api\TaskListController;

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
            ->get('bulletin-list', '', TaskListController::class);
    }
}
