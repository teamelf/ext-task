/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import extend from 'teamelf/common/extend';
import App from 'teamelf/App';
import { SideNav } from 'teamelf/layout/SideNav';
import Permission from 'teamelf/Permission';
import TaskList from 'teamelf/task/TaskList';
import TaskItem from 'teamelf/task/TaskItem';

extend(App.prototype, 'routes', routes => {
  routes.push(
    {path: '/task', exact: true, component: TaskList},
    {path: '/task/:id', exact: true, component: TaskItem}
  );
});

extend(SideNav.prototype, 'navigations', navigations => {
  navigations.push({path: '/task', icon: 'check-circle-o', title: '任务进度'});
});

extend(Permission.prototype, 'permissions', permissions => {
  permissions.push({
    name: '任务进度',
    children: [
      {name: '查看所有任务详情', permission: 'task.item'},
      {name: '创新新任务', permission: 'task.create'},
      {name: '更新任务', permission: 'task.update'},
      {name: '发布任务', permission: 'task.publish'},
      {name: '删除未发布的任务', permission: 'task.delete'}
    ]
  });
});
