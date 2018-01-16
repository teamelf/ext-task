/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Page from 'teamelf/layout/Page';
const { Button, Row, Col } = antd;
import TaskCardItem from 'teamelf/task/TaskCardItem';

export default class extends Page {
  constructor (props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.fetchTasks();
  }
  fetchTasks () {
    axios.get('task').then(r => {
      this.setState({tasks: r.data});
    });
  }
  title () {
    return '任务/项目进度管理';
  }
  createTask () {
    axios.post('task').then(r => {
      window.location.href = '/task/' + r.data.id;
    });
  }
  description () {
    return [
      <p>这里您创建任务，并进行分工、实时跟踪进度、提交报告、上传材料等操作</p>,
      <Button
        type="primary"
        onClick={this.createTask.bind(this)}
        icon="check-circle-o"
        disabled={!can('task.create')}
      >新建任务/项目</Button>
    ];
  }
  view () {
    return (
      <Row type="flex" gutter={16}>
        {this.state.tasks.map(o => (
          <Col sm={24} md={12} lg={8} xxl={6}>
            <TaskCardItem {...o}/>
          </Col>
        ))}
      </Row>
    );
  }
}
