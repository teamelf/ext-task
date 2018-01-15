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
 * @Table(name="task")
 */
class Task extends AbstractModel
{
    // ----------------------------------------
    // | ORM DEFINITIONS

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

    /**
     * @var boolean
     *
     * @Column(type="boolean", options={"default":TRUE})
     */
    protected $teamwork = true;

    /**
     * @var boolean
     *
     * @Column(type="boolean", options={"default":TRUE})
     */
    protected $draft = true;

    /**
     * @var TaskProcess[]
     *
     * @OneToMany(targetEntity="TaskProcess", mappedBy="task")
     */
    protected $processes;

    /**
     * @var TaskAssignee[]
     *
     * @OneToMany(targetEntity="TaskAssignee", mappedBy="task")
     */
    protected $assignees;

    // ----------------------------------------
    // | GETTERS & SETTERS

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

    /**
     * getter of $teamwork
     *
     * @return boolean
     */
    public function isTeamwork()
    {
        return !!$this->teamwork;
    }

    /**
     * setter of $teamwork
     *
     * @param bool $teamwork
     * @return $this
     */
    public function teamwork(bool $teamwork)
    {
        $this->teamwork = $teamwork;
        return $this;
    }

    /**
     * getter of $draft
     *
     * @return boolean
     */
    public function isDraft()
    {
        return !!$this->draft;
    }

    /**
     * setter of $draft
     *
     * @param bool $draft
     * @return $this
     */
    public function draft(bool $draft)
    {
        $this->draft = $draft;
        return $this;
    }

    /**
     * getter of $processes
     *
     * @return TaskProcess[]
     */
    public function getProcesses()
    {
        return $this->processes;
    }

    /**
     * getter of $assignees
     *
     * @return TaskAssignee[]
     */
    public function getAssignees()
    {
        return $this->assignees;
    }

    // ----------------------------------------
    // | HELPER FUNCTIONS
}
