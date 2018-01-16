"use strict";

System.register("teamelf/task/TaskItem", [], function (_export, _context) {
  "use strict";

  var _createClass, _class;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _class = function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class() {
          _classCallCheck(this, _class);

          return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
          key: "render",
          value: function render() {
            return React.createElement(
              "div",
              null,
              "item"
            );
          }
        }]);

        return _class;
      }(React.Component);

      _export("default", _class);
    }
  };
});
'use strict';

System.register('teamelf/task/TaskList', ['teamelf/layout/Page'], function (_export, _context) {
  "use strict";

  var Page, _createClass, _antd, Button, _class;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_teamelfLayoutPage) {
      Page = _teamelfLayoutPage.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _antd = antd;
      Button = _antd.Button;

      _class = function (_Page) {
        _inherits(_class, _Page);

        function _class() {
          _classCallCheck(this, _class);

          return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
          key: 'title',
          value: function title() {
            return '任务/项目进度管理';
          }
        }, {
          key: 'description',
          value: function description() {
            return [React.createElement(
              'p',
              null,
              '\u8FD9\u91CC\u60A8\u521B\u5EFA\u81EA\u5DF1\u7684\u4EFB\u52A1\uFF0C\u5E76\u8FDB\u884C\u5206\u5DE5\u3001\u5B9E\u65F6\u8DDF\u8E2A\u8FDB\u5EA6\u3001\u63D0\u4EA4\u62A5\u544A\u3001\u4E0A\u4F20\u6750\u6599\u7B49\u64CD\u4F5C'
            ), React.createElement(
              Button,
              { type: 'primary' },
              '\u65B0\u5EFA\u4EFB\u52A1/\u9879\u76EE'
            )];
          }
        }, {
          key: 'view',
          value: function view() {
            return React.createElement(
              'div',
              null,
              'list'
            );
          }
        }]);

        return _class;
      }(Page);

      _export('default', _class);
    }
  };
});
'use strict';

System.register('teamelf/task/main', ['teamelf/common/extend', 'teamelf/App', 'teamelf/layout/SideNav', 'teamelf/Permission', 'teamelf/task/TaskList', 'teamelf/task/TaskItem'], function (_export, _context) {
  "use strict";

  var extend, App, SideNav, Permission, TaskList, TaskItem;
  return {
    setters: [function (_teamelfCommonExtend) {
      extend = _teamelfCommonExtend.default;
    }, function (_teamelfApp) {
      App = _teamelfApp.default;
    }, function (_teamelfLayoutSideNav) {
      SideNav = _teamelfLayoutSideNav.SideNav;
    }, function (_teamelfPermission) {
      Permission = _teamelfPermission.default;
    }, function (_teamelfTaskTaskList) {
      TaskList = _teamelfTaskTaskList.default;
    }, function (_teamelfTaskTaskItem) {
      TaskItem = _teamelfTaskTaskItem.default;
    }],
    execute: function () {
      /**
       * This file is part of TeamELF
       *
       * (c) GuessEver <guessever@gmail.com>
       *
       * For the full copyright and license information, please view the LICENSE
       * file that was distributed with this source code.
       */

      extend(App.prototype, 'routes', function (routes) {
        routes.push({ path: '/task', exact: true, component: TaskList }, { path: '/task/:id', exact: true, component: TaskItem });
      });

      extend(SideNav.prototype, 'navigations', function (navigations) {
        if (can('task.*')) {
          navigations.push({ path: '/task', icon: 'check-circle-o', title: '任务进度' });
        }
      });

      extend(Permission.prototype, 'permissions', function (permissions) {
        permissions.push({
          name: '任务进度',
          children: [{ name: '查看所有任务列表', permission: 'task.list' }, { name: '查看任务详情', permission: 'task.item' }, { name: '创新新任务', permission: 'task.create' }, { name: '更新任务', permission: 'task.update' }, { name: '删除未发布的任务', permission: 'task.delete' }]
        });
      });
    }
  };
});