'use strict';

System.register('teamelf/task/Task', [], function (_export, _context) {
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
          key: 'render',
          value: function render() {
            return 'task';
          }
        }]);

        return _class;
      }(React.Component);

      _export('default', _class);
    }
  };
});
'use strict';

System.register('teamelf/task/main', ['teamelf/common/extend', 'teamelf/mailer/Task', 'teamelf/App', 'teamelf/layout/SideNav', 'teamelf/Permission'], function (_export, _context) {
  "use strict";

  var extend, Task, App, SideNav, Permission;
  return {
    setters: [function (_teamelfCommonExtend) {
      extend = _teamelfCommonExtend.default;
    }, function (_teamelfMailerTask) {
      Task = _teamelfMailerTask.default;
    }, function (_teamelfApp) {
      App = _teamelfApp.default;
    }, function (_teamelfLayoutSideNav) {
      SideNav = _teamelfLayoutSideNav.SideNav;
    }, function (_teamelfPermission) {
      Permission = _teamelfPermission.default;
    }],
    execute: function () {

      extend(App.prototype, 'routes', function (routes) {
        routes.push.apply(routes, [{ path: '/task', component: Task }]);
      }); /**
           * This file is part of TeamELF
           *
           * (c) GuessEver <guessever@gmail.com>
           *
           * For the full copyright and license information, please view the LICENSE
           * file that was distributed with this source code.
           */

      extend(SideNav.prototype, 'navigations', function (navigations) {
        if (can('task.*')) {
          navigations.push({ path: '/task', icon: 'mail', title: '任务进度' });
        }
      });

      extend(Permission.prototype, 'permissions', function (permissions) {
        permissions.push({
          name: '任务进度',
          children: [{ name: '查看发信邮箱列表', permission: 'mailer.list' }, { name: '创新发信邮箱', permission: 'mailer.create' }, { name: '更新发信邮箱', permission: 'mailer.update' }, { name: '删除发信邮箱', permission: 'mailer.delete' }]
        });
      });
    }
  };
});