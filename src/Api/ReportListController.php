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
use TeamELF\Exception\HttpNotFoundException;
use TeamELF\Ext\Task\Task;
use TeamELF\Ext\Task\TaskReport;
use TeamELF\Http\AbstractController;

class ReportListController extends AbstractController
{
    protected $needPermissions = ['task.item'];

    /**
     * handle the request
     * @return Response
     * @throws HttpNotFoundException
     */
    public function handler(): Response
    {
        $task = Task::find($this->getParameter('taskId'));
        if (!$task) {
            throw new HttpNotFoundException();
        }
        $response = [];
        foreach (TaskReport::where(['task' => $task]) as $report) {
            $response[] = [
                'id' => $report->getId(),
                'createdAt' => $report->getCreatedAt() ? $report->getCreatedAt()->getTimestamp() : null,
                'updatedAt' => $report->getUpdatedAt() ? $report->getUpdatedAt()->getTimestamp() : null,
                'abstract' => $report->getAbstract(20),
                'draft' => $report->isDraft()
            ];
        }
        return response($response);
    }
}
