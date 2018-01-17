/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { Card, List, Icon, Avatar } = antd;
import MemberSearcher from 'teamelf/member/MemberSearcher';

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      assignees: []
    };
    this.fetchAssignees();
  }
  fetchAssignees () {
    axios.get(`task/${this.props.id}/assignee`).then(r => {
      this.setState({assignees: r.data});
    });
  }
  createAssignee (username) {
    axios.post(`task/${this.props.id}/assignee`, {username}).then(r => {
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
    const AssigneeSearcher = (
      <MemberSearcher
        onSelect={this.createAssignee.bind(this)}
        exclude={this.state.assignees.map(o => o.username)}
      />
    );
    return (
      <Card
        style={{marginBottom: 16}}
        title="指派任务给"
        extra={AssigneeSearcher}
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
