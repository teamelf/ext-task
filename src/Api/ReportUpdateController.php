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
use TeamELF\Ext\Task\TaskReport;
use TeamELF\Http\AbstractController;

class ReportUpdateController extends AbstractController
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
        $data = $this->validate([
            'summary' => [
                new NotBlank()
            ],
            'plan' => [],
            'risk' => []
        ]);
        $task = Task::find($this->getParameter('taskId'));
        $report = TaskReport::find($this->getParameter('reportId'));
        if (!$task || !$report || $report->getTask()->getId() !== $task->getId()) {
            throw new HttpForbiddenException();
        }
        if (!$report->can($this->getAuth(), 'update')) {
            throw new HttpForbiddenException();
        }
        if (!$report->isDraft()) {
            throw new HttpForbiddenException();
        }
        $report->update($data);
        return response();
    }
}
