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
 * @Table(name="task_report")
 */
class TaskReport extends AbstractModel
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

    /**
     * @var boolean
     *
     * @Column(type="boolean", options={"default":TRUE})
     */
    protected $draft = true;

    /**
     * @var string
     *
     * @Column(type="text")
     */
    protected $summary;

    /**
     * @var string
     *
     * @Column(type="text")
     */
    protected $plan;

    /**
     * @var string
     *
     * @Column(type="text")
     */
    protected $risk;

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
     * @return $this
     */
    public function assignee(Member $assignee)
    {
        $this->assignee = $assignee;
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
     * getter of $summary
     *
     * @return string
     */
    public function getSummary()
    {
        return $this->summary;
    }

    /**
     * setter of $summary
     *
     * @param string $summary
     * @return $this
     */
    public function summary($summary)
    {
        $this->summary = $summary;
        return $this;
    }

    /**
     * getter of $plan
     *
     * @return string
     */
    public function getPlan()
    {
        return $this->plan;
    }

    /**
     * setter of $plan
     *
     * @param string $plan
     * @return $this
     */
    public function plan($plan)
    {
        $this->plan = $plan;
        return $this;
    }

    /**
     * getter of $risk
     *
     * @return string
     */
    public function getRisk()
    {
        return $this->risk;
    }

    /**
     * setter of $risk
     *
     * @param string $risk
     * @return $this
     */
    public function risk($risk)
    {
        $this->risk = $risk;
        return $this;
    }

    // ----------------------------------------
    // | HELPER FUNCTIONS

    /**
     * get abstract of $summary
     *
     * @param int $length
     * @return string
     */
    public function getAbstract($length = 100)
    {
        $introduction = $this->getSummary();
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
            case 'create':
                if (TaskAssignee::count(['task' => $this->getTask(), 'assignee' => $member])) {
                    return true;
                }
            case 'item':
            case 'update':
            case 'delete':
            case 'submit':
                if (TaskAssignee::count(['task' => $this->getTask(), 'assignee' => $member, 'admin' => true])
                    || $this->getAssignee()->getId() === $member->getId()) {
                    return true;
                }
            default:
                return $member->can('task.update');
        }
    }
}
