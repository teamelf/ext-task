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
use Symfony\Component\Validator\Constraints\Choice;
use Symfony\Component\Validator\Constraints\NotBlank;
use TeamELF\Exception\HttpForbiddenException;
use TeamELF\Ext\Task\Task;
use TeamELF\Http\AbstractController;

class TaskUpdateController extends AbstractController
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
            'name' => [],
            'introduction' => []
        ]);
        $task = Task::find($this->getParameter('taskId'));
        if (!$task->can($this->getAuth(), 'update')) {
            throw new HttpForbiddenException();
        }
        $this->log('info', 'Update task [' . $task->getId() . ']');
        $task->update($data);
        return response();
    }
}
