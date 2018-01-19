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

class TaskDeleteController extends AbstractController
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
        if (!$task || !$task->isDraft()) {
            throw new HttpForbiddenException();
        }
        if (!$task->can($this->getAuth(), 'delete')) {
            throw new HttpForbiddenException();
        }
        $task->delete();
        return response();
    }
}
