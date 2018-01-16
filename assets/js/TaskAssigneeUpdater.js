/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { Card, Input, AutoComplete } = antd;

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      members: []
    };
    this.fetchMembers();
  }
  fetchMembers () {
    axios.get('member').then(r => {
      this.setState({members: r.data.map(o => ({
        key: o.username,
        value: o.name
      }))});
    });
  }
  render () {
    return (
      <Card
        style={{marginBottom: 16}}
        title="指派任务给"
      >
      </Card>
    );
  }
}
