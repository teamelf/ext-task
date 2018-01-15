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
use TeamELF\Http\AbstractController;

class TaskListController extends AbstractController
{
    protected $needPermissions = ['task.list'];

    /**
     * handle the request
     *
     * @return Response
     */
    public function handler(): Response
    {
        return response([]);
    }
}
