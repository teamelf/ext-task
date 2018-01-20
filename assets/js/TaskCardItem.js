/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { Card } = antd;

export default class extends React.Component {
  render () {
    return (
      <Card
        style={{marginBottom: 16}}
        title={this.props.name}
        extra={moment.unix(this.props.createdAt).format('YYYY-MM-DD')}
        hoverable
        onClick={e => window.location.href = '/task/' + this.props.id + '?mode=' + (this.props.draft ? 'edit' : 'team')}
      >
        <small>任务简介</small>
        <div>{this.props.abstract}</div>
      </Card>
    );
  }
}
