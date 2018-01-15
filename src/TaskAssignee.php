<?php

/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace TeamELF\Ext\Task;

use TeamELF\Core\Member;
use TeamELF\Database\AbstractModel;

/**
 * @Entity
 * @Table(name="task_assignee")
 */
class TaskAssignee extends AbstractModel
{
    // ----------------------------------------
    // | ORM DEFINITIONS

    /**
     * @var Task
     *
     * @ManyToOne(targetEntity="Task")
     * @JoinColumn(name="task_id", referencedColumnName="id")
     */
    protected $task;

    /**
     * @var Member
     *
     * @ManyToOne(targetEntity="TeamELF\Core\Member")
     * @JoinColumn(name="member_id", referencedColumnName="id")
     */
    protected $assignee;

    // ----------------------------------------
    // | GETTERS & SETTERS

    /**
     * getter of $task
     *
     * @return Task
     */
    public function getTask()
    {
        return $this->task;
    }

    /**
     * setter of $task
     *
     * @param Task $task
     * @return $this
     */
    public function task(Task $task)
    {
        $this->task = $task;
        return $this;
    }

    /**
     * getter of $assignee
     *
     * @return Member
     */
    public function getAssignee()
    {
        return $this->assignee;
    }

    /**
     * setter of $assignee
     *
     * @param Member $assignee
     */
    public function assignee(Member $assignee)
    {
        $this->assignee = $assignee;
    }

    // ----------------------------------------
    // | HELPER FUNCTIONS
}
