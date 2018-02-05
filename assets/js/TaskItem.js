/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Page from 'teamelf/layout/Page';
const { Row, Col, Radio, Button } = antd;
import TaskUpdater from 'teamelf/task/TaskUpdater';
import TaskProcessUpdater from 'teamelf/task/TaskProcessUpdater';
import TaskAssigneeUpdater from 'teamelf/task/TaskAssigneeUpdater';
import TaskTeamOverview from 'teamelf/task/TaskTeamOverview';
import TaskMemberOverview from 'teamelf/task/TaskMemberOverview';

export default class extends Page {
  constructor (props) {
    super(props);
    const query = new URLSearchParams(window.location.search);
    this.mode = query.get('mode') || 'team';
    this.taskId = this.props.match.params.id;
    this.state = {
      task: null
    };
    this.fetchTask();
  }
  fetchTask () {
    axios.get('task/' + this.taskId).then(r => {
      this.setState({task: r.data});
    });
  }
  publishTask () {
    antd.Modal.confirm({
      title: '不可撤销',
      content: [
        <div>确定要发布任务么？发布后，您将</div>,
        <ul>
          <li>可以继续添加新的任务流程</li>
          <li>可以指派任务给新成员</li>
          <li><strong>不可</strong>删除该任务</li>
          <li><strong>不可</strong>更改已有提交报告关联的流程信息</li>
          <li><strong>不可</strong>删除已有提交报告关联的流程</li>
          <li><strong>不可</strong>删除已提交报告的成员</li>
        </ul>
      ],
      onOk: () => {
        axios.post('task/' + this.taskId).then(r => {
          window.location.href = '/task/' + this.taskId + '?mode=team';
        });
      }
    });
  }
  deleteTask () {
    antd.Modal.confirm({
      title: '不可恢复',
      content: '确定要删除该任务么？',
      onOk: () => {
        axios.delete('task/' + this.taskId).then(r => {
          window.location.href = '/task';
        });
      }
    });
  }
  title () {
    if (this.state.task) {
      return this.state.task.name;
    }
  }
  description () {
    let otherViewer = null;
    if (this.mode.match(/^member_/)) {
      const username = this.mode.substr('member_'.length);
      if (window.auth.username !== username) {
        otherViewer = <Radio.Button value={`member_${username}`}>{username}的报告</Radio.Button>;
      }
    }
    if (this.state.task) {
      return (
        <Row>
          <Col sm={24} md={12}>
            <div style={{marginBottom: 16}}>
              <strong>创建时间：</strong>
              <span>{moment.unix(this.state.task.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
            <div style={{marginBottom: 16}}>
              <strong>最后更新：</strong>
              <span>{moment.unix(this.state.task.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
          </Col>
          <Col sm={24} md={12}>
            <div style={{marginBottom: 16}}>
              <Radio.Group
                defaultValue={this.mode}
                onChange={e => window.location.href = '?mode=' + e.target.value}
              >
                <Radio.Button value="edit">编辑模式</Radio.Button>
                <Radio.Button value="team">团队视角</Radio.Button>
                <Radio.Button value={`member_${window.auth.username}`}>我的报告</Radio.Button>
                {otherViewer}
              </Radio.Group>
            </div>
            <Row type="flex" gutter={16} style={{marginBottom: 16}}>
              {this.state.task && this.state.task.draft && (
                <Col>
                  <Button
                    type="primary"
                    onClick={this.publishTask.bind(this)}
                  >发布任务</Button>
                </Col>
              )}
              {this.state.task && this.state.task.draft && (
                <Col>
                  <Button
                    type="danger"
                    onClick={this.deleteTask.bind(this)}
                  >删除</Button>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      );
    }
  }
  view () {
    if (this.state.task) {
      if (this.mode === 'edit') {
        return (
          <Row type="flex" gutter={16}>
            <Col xs={24}>
              <TaskUpdater
                {...this.state.task}
                onEdit={this.fetchTask.bind(this)}
              />
            </Col>
            <Col xs={24} md={12}>
              <TaskProcessUpdater
                {...this.state.task}
              />
            </Col>
            <Col xs={24} md={12}>
              <TaskAssigneeUpdater
                {...this.state.task}
              />
            </Col>
          </Row>
        );
      } else if (this.mode.match(/^member_/)) {
        const username = this.mode.substr('member_'.length);
        return <TaskMemberOverview {...this.state.task} username={username}/>
      } else { // this.mode === 'team' or others
        return <TaskTeamOverview {...this.state.task}/>
      }
    }
  }
}
