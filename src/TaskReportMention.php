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

// In a report, you can mention some tasks, processes, assignees
// Data stored here

/**
 * @Entity
 * @Table(name="task_report_mention")
 */
class TaskReportMention extends AbstractModel
{
    // ----------------------------------------
    // | ORM DEFINITIONS

    /**
     * @var TaskReport
     *
     * @ManyToOne(targetEntity="TaskReport")
     * @JoinColumn(name="report_id", referencedColumnName="id")
     */
    protected $report;

    /**
     * @var Task
     *
     * @ManyToOne(targetEntity="Task")
     * @JoinColumn(name="task_id", referencedColumnName="id")
     */
    protected $task;

    /**
     * @var TaskProcess
     *
     * @ManyToOne(targetEntity="TaskProcess")
     * @JoinColumn(name="process_id", referencedColumnName="id")
     */
    protected $process;

    /**
     * @var Member
     *
     * @ManyToOne(targetEntity="TeamELF\Core\Member")
     * @JoinColumn(name="member_id", referencedColumnName="id")
     */
    protected $assignee;

    /**
     * @var string
     *
     * @Column(type="string", nullable=TRUE)
     */
    protected $prefix;

    // ----------------------------------------
    // | GETTERS & SETTERS

    /**
     * getter of $report
     *
     * @return TaskReport
     */
    public function getReport()
    {
        return $this->report;
    }

    /**
     * setter of $report
     *
     * @param TaskReport $report
     * @return $this
     */
    public function report(TaskReport $report)
    {
        $this->report = $report;
        return $this;
    }

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
     * getter of $process
     *
     * @return TaskProcess
     */
    public function getProcess()
    {
        return $this->process;
    }

    /**
     * setter of $process
     *
     * @param TaskProcess $process
     * @return $this
     */
    public function process(TaskProcess $process)
    {
        $this->process = $process;
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
     * getter of $prefix
     *
     * @return string
     */
    public function getPrefix()
    {
        return $this->prefix;
    }

    /**
     * setter of $prefix
     *
     * @param string $prefix
     * @return $this
     */
    public function prefix($prefix) {
        $this->prefix = $prefix;
        return $this;
    }

    // ----------------------------------------
    // | HELPER FUNCTIONS
}
