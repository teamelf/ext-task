/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Page from 'teamelf/layout/Page';
const { Button } = antd;

export default class extends Page {
  title () {
    return '任务/项目进度管理';
  }
  description () {
    return [
      <p>这里您创建自己的任务，并进行分工、实时跟踪进度、提交报告、上传材料等操作</p>,
      <Button type="primary">新建任务/项目</Button>
    ];
  }
  view () {
    return <div>list</div>;
  }
}
