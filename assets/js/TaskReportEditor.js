/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { Button, Modal, Input, Divider } = antd;
import Editor from 'teamelf/common/Editor';

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      summary: '',
      plan: '',
      risk: '',
    };
  }
  openModal () {
    this.setState({visible: true});
    if (this.props.id) {
      this.fetchReport();
    }
  }
  closeModal () {
    this.setState({visible: false});
  }
  createReport () {
    const data = {
      summary: this.state.summary,
      plan: this.state.plan,
      risk: this.state.risk,
    };
    this.setState({loading: true});
    return axios.post(`task/${this.props.taskId}/report`, data).then(r => {
      this.props.onEdit && this.props.onEdit().then(r => {
        this.setState({loading: false});
        this.closeModal();
      });
    });
  }
  fetchReport () {
    axios.get(`task/${this.props.taskId}/report/${this.props.id}`).then(r => {
      this.setState({
        summary: r.data.summary,
        plan: r.data.plan,
        risk: r.data.risk
      });
    });
  }
  deleteReport () {
    antd.Modal.confirm({
      title: '不可恢复',
      content: '确定要删除该报告么？',
      onOk: () => {
        this.setState({loading: true});
        axios.delete(`task/${this.props.taskId}/report/${this.props.id}`).then(r => {
          this.props.onEdit && this.props.onEdit().then(r => {
            this.setState({loading: false});
            this.closeModal();
          });
        });
      }
    });
  }
  updateReport () {
    const data = {
      summary: this.state.summary,
      plan: this.state.plan,
      risk: this.state.risk,
    };
    this.setState({loading: true});
    return axios.put(`task/${this.props.taskId}/report/${this.props.id}`, data).then(r => {
      this.props.onEdit && this.props.onEdit().then(r => {
        this.setState({loading: false});
        this.closeModal();
      });
    });
  }
  render () {
    const renderEditors = () => [
      <div style={{marginBottom: 16}}>
        <div>您可以在任何地方写 process#ID 来关联一个任务流程</div>
        <div>加上 finish|close|fix|done|finished|closed|fixed 前缀可表示您已完成该任务流程</div>
        <div>例如</div>
        <ul>
          <li>....您的总结... done process#K38D5fdadsXbiGP6hudLiK ...您的总结...</li>
          <li>....您的总结... process#K38D5fdadsXbiGP6hudLiK ...您的总结...</li>
        </ul>
      </div>,
      <div style={{marginBottom: 16}}>
        <strong>总结</strong>
        <Editor
          autosize={{minRows: 5, maxRows: 20}}
          value={this.state.summary}
          onChange={e => this.setState({summary: e})}
        />
      </div>,
      <div style={{marginBottom: 16}}>
        <strong>后续计划</strong>
        <Editor
          autosize={{minRows: 5, maxRows: 20}}
          value={this.state.plan}
          onChange={e => this.setState({plan: e})}
        />
      </div>,
      <div style={{marginBottom: 16}}>
        <strong>风险说明</strong>
        <Editor
          autosize={{minRows: 5, maxRows: 20}}
          value={this.state.risk}
          onChange={e => this.setState({risk: e})}
        />
      </div>
    ];
    if (this.props.id) {
      if (this.props.readonly) {
        return [
          <Button
            onClick={this.openModal.bind(this)}
          >查看</Button>,
          <Modal
            width="680"
            title={'查看报告 #' + this.props.id}
            visible={this.state.visible}
            footer={null}
            onCancel={this.closeModal.bind(this)}
          >
            <h2>总结</h2>
            <Editor
              style={{border: '1px solid #dcdcdc', padding: 16}}
              preview value={this.state.summary}
            />
            <Divider/>
            <h2>后续计划</h2>
            <Editor
              style={{border: '1px solid #dcdcdc', padding: 16}}
              preview value={this.state.plan}
            />
            <Divider/>
            <h2>风险说明</h2>
            <Editor
              style={{border: '1px solid #dcdcdc', padding: 16}}
              preview value={this.state.risk}
            />
            <Divider/>
          </Modal>
        ];
      } else {
        return [
          <Button
            type="primary"
            onClick={this.openModal.bind(this)}
          >编辑</Button>,
          <Modal
            width="680"
            title={'编辑报告 #' + this.props.id}
            visible={this.state.visible}
            footer={[
              <Button onClick={this.closeModal.bind(this)}>取消</Button>,
              <Button type="danger" onClick={this.deleteReport.bind(this)} loading={this.state.loading}>删除草稿</Button>,
              <Button type="primary" onClick={this.updateReport.bind(this)} loading={this.state.loading}>保存草稿</Button>,
            ]}
            onCancel={this.closeModal.bind(this)}
          >
            {renderEditors()}
          </Modal>
        ];
      }
    } else { // new report
      return [
        <Button
          type="primary"
          onClick={this.openModal.bind(this)}
        >新建报告</Button>,
        <Modal
          width="680"
          title="新建报告"
          visible={this.state.visible}
          footer={[
            <Button onClick={this.closeModal.bind(this)}>取消</Button>,
            <Button type="primary" onClick={this.createReport.bind(this)} loading={this.state.loading}>保存草稿</Button>
          ]}
          onCancel={this.closeModal.bind(this)}
        >
          {renderEditors()}
        </Modal>
      ];
    }
  }
}
