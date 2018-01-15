/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import extend from 'teamelf/common/extend';
import Task from 'teamelf/mailer/Task';
import App from 'teamelf/App';
import { SideNav } from 'teamelf/layout/SideNav';
import Permission from 'teamelf/Permission';

extend(App.prototype, 'routes', routes => {
  routes.push(...[
    {path: '/task', component: Task}
  ]);
});

extend(SideNav.prototype, 'navigations', navigations => {
  if (can('task.*')) {
    navigations.push({path: '/task', icon: 'mail', title: '任务进度'});
  }
});

extend(Permission.prototype, 'permissions', permissions => {
  permissions.push({
    name: '任务进度',
    children: [
      {name: '查看发信邮箱列表', permission: 'mailer.list'},
      {name: '创新发信邮箱', permission: 'mailer.create'},
      {name: '更新发信邮箱', permission: 'mailer.update'},
      {name: '删除发信邮箱', permission: 'mailer.delete'}
    ]
  });
});
