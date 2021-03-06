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
use TeamELF\Exception\HttpForbiddenException;
use TeamELF\Ext\Task\Task;
use TeamELF\Ext\Task\TaskProcess;
use TeamELF\Http\AbstractController;

class ProcessCreateController extends AbstractController
{
    /**
     * handle the request
     *
     * @return Response
     * @throws HttpForbiddenException
     */
    public function handler(): Response
    {
        $data = $this->validate([
            'title' => [
                new NotBlank()
            ],
            'description' => []
        ]);
        $task = Task::find($this->getParameter('taskId'));
        if (!$task) {
            throw new HttpForbiddenException();
        }
        $process = (new TaskProcess($data))
            ->task($task);
        if (!$process->can($this->getAuth(), 'create')) {
            throw new HttpForbiddenException();
        }
        $this->log('info', 'Add a process [' . $process->getId() . '] in task [' . $task->getId() . ']');
        $process->save();
        return response([
            'id' => $process->getId()
        ]);
    }
}
