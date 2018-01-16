/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { Card, Input, List, Icon, Avatar } = antd;

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      members: [],
      assignees: [],
      username: ''
    };
    this.fetchMembers();
    this.fetchAssignees();
  }
  fetchMembers () {
    axios.get('member').then(r => {
      this.setState({members: r.data.map(o => ({
        key: o.username,
        value: o.name
      }))});
    });
  }
  fetchAssignees () {
    axios.get(`task/${this.props.id}/assignee`).then(r => {
      this.setState({assignees: r.data});
    });
  }
  createAssignee () {
    const data = {
      username: this.state.username
    };
    axios.post(`task/${this.props.id}/assignee`, data).then(r => {
      this.setState({username: ''});
      this.fetchAssignees();
    });
  }
  deleteAssignee (assigneeId) {
    axios.delete(`task/${this.props.id}/assignee/${assigneeId}`).then(r => {
      this.fetchAssignees();
    });
  }
  render () {
    const SearchAssignee = (
      <Input
        value={this.state.username}
        onChange={e => this.setState({username: e.target.value})}
        onPressEnter={this.createAssignee.bind(this)}
      />
    );
    return (
      <Card
        style={{marginBottom: 16}}
        title="指派任务给"
        extra={SearchAssignee}
      >
        <List
          itemLayout="horizontal"
          dataSource={this.state.assignees}
          renderItem={o => (
            <List.Item actions={[<a onClick={this.deleteAssignee.bind(this, o.id)}><Icon type="close"/></a>]}>
              <List.Item.Meta
                avatar={<Avatar/>}
                title={o.name}
                description={o.username}
              />
              {o.admin && <Icon type="compass"/>}
            </List.Item>
          )}
        />
      </Card>
    );
  }
}
