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
use TeamELF\Ext\Task\TaskReport;
use TeamELF\Http\AbstractController;

class ReportItemController extends AbstractController
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
        $report = TaskReport::find($this->getParameter('reportId'));
        if (!$task || !$report || $report->getTask()->getId() !== $task->getId()) {
            throw new HttpForbiddenException();
        }
        if (!$report->can($this->getAuth(), 'item')) {
            throw new HttpForbiddenException();
        }
        return response([
            'id' => $report->getId(),
            'createdAt' => $report->getCreatedAt() ? $report->getCreatedAt()->getTimestamp() : null,
            'updatedAt' => $report->getUpdatedAt() ? $report->getUpdatedAt()->getTimestamp() : null,
            'summary' => $report->getSummary(),
            'plan' => $report->getPlan(),
            'risk' => $report->getRisk(),
            'draft' => $report->isDraft()
        ]);
    }
}
