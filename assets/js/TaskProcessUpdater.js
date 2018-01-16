/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { Card, Timeline } = antd;

export default class extends React.Component {
  render () {
    return (
      <Card
        style={{marginBottom: 16}}
        title="进度信息"
      >
        <Timeline>
          <Timeline.Item color="red">
            <strong>MISSION</strong>
            <div>Create a services site 2015-09-01</div>
          </Timeline.Item>
          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
      </Card>
    );
  }
}
