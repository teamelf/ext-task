/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { Card, Button, Icon, Timeline, Modal, Input } = antd;

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      processes: [],
      modal: {},
      processTitle: '',
      processDescription: ''
    };
    this.fetchProcesses();
  }
  fetchProcesses () {
    return axios.get(`task/${this.props.id}/process`).then(r => {
      this.setState({processes: r.data});
      return r;
    });
  }
  createTaskProcess () {
    const data = {
      title: this.state.processTitle,
      description: this.state.processDescription,
    };
    return axios.post(`task/${this.props.id}/process`, data).then(r => {
      this.fetchProcesses();
      return r;
    });
  }
  updateTaskProcess (processId) {
    const data = {
      title: this.state.processTitle,
      description: this.state.processDescription,
    };
    return axios.put(`task/${this.props.id}/process/${processId}`, data).then(r => {
      this.fetchProcesses();
      return r;
    });
  }
  deleteTaskProcess (processId, callback) {
    antd.Modal.confirm({
      title: '不可恢复',
      content: '确定要删除该流程么？',
      onOk: () => {
        axios.delete(`task/${this.props.id}/process/${processId}`).then(r => {
          this.fetchProcesses();
          if (callback) {
            callback();
          }
        });
      }
    });
  }
  showEditor (process) {
    const closeEditor = () => {
      this.setState({modal: {}});
    };
    let modal = {};
    if (process) {
      modal = {
        title: '编辑 #' + process.id,
        visible: true,
        footer: [
          <Button
            onClick={() => closeEditor()}
          >取消</Button>,
          <Button
            type="danger"
            onClick={() => this.deleteTaskProcess(process.id, closeEditor)}
          >删除</Button>,
          <Button
            type="primary"
            onClick={() => {
              this.updateTaskProcess(process.id).then(r => {
                closeEditor();
              });
            }}
          >保存</Button>,
        ],
        onCancel: e => closeEditor(),
        destroyOnClose: true
      };
      this.setState({
        modal,
        processTitle: process.title,
        processDescription: process.description
      });
    } else {
      modal = {
        title: '新建流程',
        visible: true,
        okText: '确认创建',
        onOk: e => {
          this.createTaskProcess().then(r => {
            closeEditor();
          })
        },
        onCancel: e => closeEditor(),
        destroyOnClose: true
      };
      this.setState({
        modal,
        processTitle: '',
        processDescription: ''
      });
    }
  }
  render () {
    const TaskProcessCreateButton = (
      <Button
        type="primary"
        onClick={this.showEditor.bind(this, null)}
      >
        <Icon type="plus"/>
        <span>添加新流程</span>
      </Button>
    );
    return [
      <Card
        style={{marginBottom: 16}}
        title="子任务/流程"
        extra={TaskProcessCreateButton}
      >
        <Timeline>
          {this.state.processes.map(o => (
            <Timeline.Item>
              <a onClick={this.showEditor.bind(this, o)}><strong>process#{o.id}</strong></a>
              <div><strong>名称：</strong>{o.title}</div>
              <div style={{color: '#757575'}}><strong>描述：</strong>{o.description}</div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>,
      <Modal {...this.state.modal}>
        <div style={{marginBottom: 16}}>
          <strong>流程名称</strong>
          <Input
            value={this.state.processTitle}
            onChange={e => this.setState({processTitle: e.target.value})}
          />
        </div>
        <div style={{marginBottom: 16}}>
          <strong>流程描述</strong>
          <Input.TextArea
            autosize={{minRows: 6, maxRows: 6}}
            value={this.state.processDescription}
            onChange={e => this.setState({processDescription: e.target.value})}
          />
        </div>
      </Modal>
    ];
  }
}
