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

class TaskPublishController extends AbstractController
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
        if (!$task->can($this->getAuth(), 'publish')) {
            throw new HttpForbiddenException();
        }
        if (!$task || !$task->isDraft()) {
            throw new HttpForbiddenException();
        }
        $this->log('info', 'Publish task [' . $task->getId() . ']');
        $task->draft(false)->save();
        return response();
    }
}
