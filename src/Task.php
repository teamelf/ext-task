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
     * @Column(type="text", nullable=TRUE)
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

    /**
     * get abstract of $introduction
     *
     * @param int $length
     * @return string
     */
    public function getAbstract($length = 100)
    {
        $introduction = $this->getIntroduction();
        if (mb_strlen($introduction) > $length - 3) {
            return mb_substr($introduction, 0, $length - 3) . '...';
        } else {
            return $introduction;
        }
    }

    /**
     * special permission checking
     *
     * @param Member $member
     * @param string $permission
     * @return bool
     */
    public function can(Member $member, $permission)
    {
        switch ($permission) {
            case 'assignee.create':
            case 'assignee.delete':
            case 'process.create':
            case 'process.delete':
            case 'process.update':
            case 'report.create':
            case 'report.delete':
            case 'report.item':
            case 'report.list':
            case 'report.submit':
            case 'report.update':
                //////
            case 'item':
                if (TaskAssignee::count(['task' => $this, 'assignee' => $member])) {
                    return true;
                }
            case 'delete':
            case 'publish':
            case 'update':
                if (TaskAssignee::count(['task' => $this, 'assignee' => $member, 'admin' => true])) {
                    return true;
                }
            case 'create':
            default:
                return $member->can('task.' . $permission);
        }
    }
}
