/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { Row, Col, Card, Progress, Avatar, Popover, List } = antd;

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      assignees: [],
      processes: [],
      statistics: null
    };
    this.fetchAssignees();
    this.fetchProcesses();
    this.fetchStatistics();
  }
  fetchAssignees () {
    axios.get(`task/${this.props.id}/assignee`).then(r => {
      this.setState({assignees: r.data});
    });
  }
  fetchProcesses () {
    return axios.get(`task/${this.props.id}/process`).then(r => {
      this.setState({processes: r.data});
      return r;
    });
  }
  fetchStatistics () {
    axios.get(`task/${this.props.id}/statistics`).then(r => {
      this.setState({statistics: r.data});
    });
  }
  render () {
    return (
      <Row type="flex" gutter={16}>
        <Col xs={24} md={12}>
          <Card
            style={{marginBottom: 16}}
            className="task-overview"
            title={this.props.name}
          >
            <div dangerouslySetInnerHTML={{__html: marked(this.props.introduction || '')}}/>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          {!!this.state.statistics && (
            <Card
              style={{marginBottom: 16}}
              className="task-overview"
              title={<Progress percent={this.state.statistics.progress}/>}
            >
              <List
                itemLayout="horizontal"
                dataSource={this.state.processes}
                renderItem={o => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={(
                        <Progress
                          type="circle"
                          width="70"
                          percent={this.state.statistics.process[o.id].progress}
                          format={percent => `${this.state.statistics.process[o.id].total} 报告`}
                        />
                      )}
                      title={o.title}
                      description={o.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}
        </Col>
        <Col xs={24}>
          {!!this.state.statistics && (
            <Card style={{marginBottom: 16}}>
              {this.state.assignees.map(o => (
                <Card.Grid style={{width: '100%'}}>
                  <Row type="flex" gutter={16}>
                    <Col xs={{span: 12, order: 1}} md={{span: 4, order: 1}}>
                      <Avatar size="small" style={{verticalAlign: 'middle'}}/>
                      <span style={{marginLeft: 16}}>{o.name}</span>
                    </Col>
                    <Col xs={{span: 24, order: 3}} md={{span: 16, order: 2}}>
                      {this.state.processes.map(p => (
                        <div
                          style={{
                            display: 'inline-block',
                            height: 24,
                            textAlign: 'center',
                            width: `${100.0 / this.state.processes.length}%`,
                            border: '1px solid #dcdcdc',
                            color: 'white',
                            background: (() => {
                              const s = this.state.statistics.process[p.id].assignee[o.username];
                              if (s.done) {
                                return '#52c41a';
                              } else if (s.total) {
                                return '#1890ff';
                              } else {
                                return '#aaa';
                              }
                            })()
                          }}
                        >{this.state.statistics.process[p.id].assignee[o.username].total} 报告</div>
                      ))}
                    </Col>
                    <Col xs={{span: 12, order: 2}} md={{span: 4, order: 3}} style={{textAlign: 'right'}}>
                      <a href={`?mode=member_${o.username}`}>TA的视角</a>
                    </Col>
                  </Row>
                </Card.Grid>
              ))}
            </Card>
          )}
        </Col>
      </Row>
    );
  }
}
