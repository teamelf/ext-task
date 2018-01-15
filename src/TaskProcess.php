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

use TeamELF\Database\AbstractModel;

/**
 * @Entity
 * @Table(name="task_process")
 */
class TaskProcess extends AbstractModel
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
     * @var string
     *
     * @Column(type="string", length=50)
     */
    protected $name;

    /**
     * @var string
     *
     * @Column(type="text")
     */
    protected $introduction;

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
     * getter of $name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * setter of $name
     *
     * @param string $name
     * @return $this
     */
    public function name($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * getter of $introduction
     *
     * @return string
     */
    public function getIntroduction()
    {
        return $this->introduction;
    }

    /**
     * setter of $introduction
     *
     * @param string $introduction
     * @return $this
     */
    public function introduction($introduction)
    {
        $this->introduction = $introduction;
        return $this;
    }

    // ----------------------------------------
    // | HELPER FUNCTIONS
}
