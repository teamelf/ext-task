/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { Row, Col, Card, Button, Timeline, Table } = antd;
import TaskReportEditor from 'teamelf/task/TaskReportEditor';

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      processes: [],
      reports: []
    };
    this.fetchProcesses();
    this.fetchReports();
  }
  fetchProcesses () {
    return axios.get(`task/${this.props.id}/process`).then(r => {
      this.setState({processes: r.data});
      return r;
    });
  }
  fetchReports () {
    return axios.get(`task/${this.props.id}/report`).then(r => {
      this.setState({reports: r.data});
      return r;
    });
  }
  submitReport (reportId) {
    antd.Modal.confirm({
      title: '不可撤销',
      content: "确认要提交总结么，提交后您将不能对此总结做任何修改操作",
      onOk: () => {
        axios.post(`task/${this.props.id}/report/${reportId}`).then(r => {
          this.fetchReports();
        });
      }
    });
  }
  render () {
    const columns = [{
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record, index) => {
        return moment.unix(text).format('YYYY-MM-DD HH:mm:ss');
      }
    }, {
      title: '最后修改',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text, record, index) => {
        return moment.unix(text).format('YYYY-MM-DD HH:mm:ss');
      }
    }, {
      title: '概览',
      dataIndex: 'abstract',
      key: 'abstract',
      render: (text, record, index) => {
        return [
          record.draft && <span style={{color: 'red'}}>[草稿] </span>,
          text
        ];
      }
    }, {
      title: (
        <Row type="flex" gutter={16}>
          <Col>
            <TaskReportEditor
              taskId={this.props.id}
              onEdit={this.fetchReports.bind(this)}
            />
          </Col>
          <Col>
            <Button
              type="dashed"
              icon="reload"
              onClick={this.fetchReports.bind(this)}
            >刷新</Button>
          </Col>
        </Row>
      ),
      key: 'operation',
      render: (text, record, index) => {
        return (
          <Row type="flex" gutter={16}>
            <Col>
              <TaskReportEditor
                readonly
                taskId={this.props.id}
                {...record}
              />
            </Col>
            {record.draft && (
              <Col>
                <TaskReportEditor
                  taskId={this.props.id}
                  {...record}
                  onEdit={this.fetchReports.bind(this)}
                />
              </Col>
            )}
            {record.draft && (
              <Col>
                <Button
                  type="dashed"
                  onClick={this.submitReport.bind(this, record.id)}
                >提交</Button>
              </Col>
            )}
          </Row>
        );
      }
    }];
    return [
      <Table
        style={{background: '#fff'}}
        dataSource={this.state.reports}
        columns={columns}
        pagination={false}
      />
    ];
  }
}
