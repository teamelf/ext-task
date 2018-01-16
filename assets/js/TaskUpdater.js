/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { Card } = antd;
import InfoEditor from 'teamelf/components/InfoEditor';

export default class extends React.Component {
  edit (key, v) {
    const data = {
      [key]: v
    };
    return axios.put(`task/${this.props.id}`, data).then(r => {
      this.props.onEdit();
      return r;
    });
  }
  render () {
    return (
      <Card
        style={{marginBottom: 16}}
        title="基本信息"
      >
        <InfoEditor
          label="任务名称"
          value={this.props.name}
          onEdit={this.edit.bind(this, 'name')}
        />
        <InfoEditor
          type="textarea"
          label="任务描述"
          value={this.props.introduction}
          onEdit={this.edit.bind(this, 'introduction')}
        />
      </Card>
    );
  }
}
