/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Page from 'teamelf/layout/Page';
const { Row, Col, Radio } = antd;
import TaskStatus from 'teamelf/task/TaskStatus';
import TaskUpdater from 'teamelf/task/TaskUpdater';
import TaskProcessUpdater from 'teamelf/task/TaskProcessUpdater';
import TaskAssigneeUpdater from 'teamelf/task/TaskAssigneeUpdater';

export default class extends Page {
  constructor (props) {
    super(props);
    const query = new URLSearchParams(window.location.search);
    this.mode = query.get('mode') || 'team';
    this.state = {
      task: null
    };
    this.fetchTask();
  }
  fetchTask () {
    axios.get('task/' + this.props.match.params.id).then(r => {
      this.setState({task: r.data});
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
        otherViewer = <Radio.Button value={`member_${username}`}>{username}的视角</Radio.Button>;
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
                <Radio.Button value={`member_${window.auth.username}`}>我的视角</Radio.Button>
                {otherViewer}
              </Radio.Group>
            </div>
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
        return <div>{username} view</div>;
      } else { // this.mode === 'team' or others
        return <div>team view</div>;
      }
    }
  }
}
