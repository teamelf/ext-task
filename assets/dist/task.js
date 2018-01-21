'use strict';

System.register('teamelf/task/TaskAssigneeUpdater', ['teamelf/member/MemberSearcher'], function (_export, _context) {
  "use strict";

  var MemberSearcher, _createClass, _antd, Card, List, Icon, Avatar, _class;

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
    setters: [function (_teamelfMemberMemberSearcher) {
      MemberSearcher = _teamelfMemberMemberSearcher.default;
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
      Card = _antd.Card;
      List = _antd.List;
      Icon = _antd.Icon;
      Avatar = _antd.Avatar;

      _class = function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class(props) {
          _classCallCheck(this, _class);

          var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

          _this.state = {
            assignees: []
          };
          _this.fetchAssignees();
          return _this;
        }

        _createClass(_class, [{
          key: 'fetchAssignees',
          value: function fetchAssignees() {
            var _this2 = this;

            axios.get('task/' + this.props.id + '/assignee').then(function (r) {
              _this2.setState({ assignees: r.data });
            });
          }
        }, {
          key: 'createAssignee',
          value: function createAssignee(username) {
            var _this3 = this;

            axios.post('task/' + this.props.id + '/assignee', { username: username }).then(function (r) {
              _this3.setState({ username: '' });
              _this3.fetchAssignees();
            });
          }
        }, {
          key: 'deleteAssignee',
          value: function deleteAssignee(assigneeId) {
            var _this4 = this;

            axios.delete('task/' + this.props.id + '/assignee/' + assigneeId).then(function (r) {
              _this4.fetchAssignees();
            });
          }
        }, {
          key: 'render',
          value: function render() {
            var _this5 = this;

            var AssigneeSearcher = React.createElement(MemberSearcher, {
              onSelect: this.createAssignee.bind(this),
              exclude: this.state.assignees.map(function (o) {
                return o.username;
              })
            });
            return React.createElement(
              Card,
              {
                style: { marginBottom: 16 },
                title: '\u6307\u6D3E\u4EFB\u52A1\u7ED9',
                extra: AssigneeSearcher
              },
              React.createElement(List, {
                itemLayout: 'horizontal',
                dataSource: this.state.assignees,
                renderItem: function renderItem(o) {
                  return React.createElement(
                    List.Item,
                    { actions: [React.createElement(
                        'a',
                        { onClick: _this5.deleteAssignee.bind(_this5, o.id) },
                        React.createElement(Icon, { type: 'close' })
                      )] },
                    React.createElement(List.Item.Meta, {
                      avatar: React.createElement(Avatar, null),
                      title: o.name,
                      description: o.username
                    }),
                    o.admin && React.createElement(Icon, { type: 'compass' })
                  );
                }
              })
            );
          }
        }]);

        return _class;
      }(React.Component);

      _export('default', _class);
    }
  };
});
'use strict';

System.register('teamelf/task/TaskCardItem', [], function (_export, _context) {
  "use strict";

  var _createClass, _antd, Card, _class;

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

      _antd = antd;
      Card = _antd.Card;

      _class = function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class() {
          _classCallCheck(this, _class);

          return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
          key: 'render',
          value: function render() {
            var _this2 = this;

            return React.createElement(
              Card,
              {
                style: { marginBottom: 16 },
                title: this.props.name,
                extra: moment.unix(this.props.createdAt).format('YYYY-MM-DD'),
                hoverable: true,
                onClick: function onClick(e) {
                  return window.location.href = '/task/' + _this2.props.id + '?mode=' + (_this2.props.draft ? 'edit' : 'team');
                }
              },
              React.createElement(
                'small',
                null,
                '\u4EFB\u52A1\u7B80\u4ECB'
              ),
              React.createElement(
                'div',
                null,
                this.props.abstract
              )
            );
          }
        }]);

        return _class;
      }(React.Component);

      _export('default', _class);
    }
  };
});
'use strict';

System.register('teamelf/task/TaskItem', ['teamelf/layout/Page', 'teamelf/task/TaskUpdater', 'teamelf/task/TaskProcessUpdater', 'teamelf/task/TaskAssigneeUpdater', 'teamelf/task/TaskTeamOverview', 'teamelf/task/TaskMemberOverview'], function (_export, _context) {
  "use strict";

  var Page, TaskUpdater, TaskProcessUpdater, TaskAssigneeUpdater, TaskTeamOverview, TaskMemberOverview, _extends, _createClass, _antd, Row, Col, Radio, Button, _class;

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
    }, function (_teamelfTaskTaskUpdater) {
      TaskUpdater = _teamelfTaskTaskUpdater.default;
    }, function (_teamelfTaskTaskProcessUpdater) {
      TaskProcessUpdater = _teamelfTaskTaskProcessUpdater.default;
    }, function (_teamelfTaskTaskAssigneeUpdater) {
      TaskAssigneeUpdater = _teamelfTaskTaskAssigneeUpdater.default;
    }, function (_teamelfTaskTaskTeamOverview) {
      TaskTeamOverview = _teamelfTaskTaskTeamOverview.default;
    }, function (_teamelfTaskTaskMemberOverview) {
      TaskMemberOverview = _teamelfTaskTaskMemberOverview.default;
    }],
    execute: function () {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

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
      Row = _antd.Row;
      Col = _antd.Col;
      Radio = _antd.Radio;
      Button = _antd.Button;

      _class = function (_Page) {
        _inherits(_class, _Page);

        function _class(props) {
          _classCallCheck(this, _class);

          var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

          var query = new URLSearchParams(window.location.search);
          _this.mode = query.get('mode') || 'team';
          _this.taskId = _this.props.match.params.id;
          _this.state = {
            task: null
          };
          _this.fetchTask();
          return _this;
        }

        _createClass(_class, [{
          key: 'fetchTask',
          value: function fetchTask() {
            var _this2 = this;

            axios.get('task/' + this.taskId).then(function (r) {
              _this2.setState({ task: r.data });
            });
          }
        }, {
          key: 'publishTask',
          value: function publishTask() {
            var _this3 = this;

            antd.Modal.confirm({
              title: '不可撤销',
              content: [React.createElement(
                'div',
                null,
                '\u786E\u5B9A\u8981\u53D1\u5E03\u4EFB\u52A1\u4E48\uFF1F\u53D1\u5E03\u540E\uFF0C\u60A8\u5C06'
              ), React.createElement(
                'ul',
                null,
                React.createElement(
                  'li',
                  null,
                  '\u53EF\u4EE5\u7EE7\u7EED\u6DFB\u52A0\u65B0\u7684\u4EFB\u52A1\u6D41\u7A0B'
                ),
                React.createElement(
                  'li',
                  null,
                  '\u53EF\u4EE5\u6307\u6D3E\u4EFB\u52A1\u7ED9\u65B0\u6210\u5458'
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'strong',
                    null,
                    '\u4E0D\u53EF'
                  ),
                  '\u66F4\u6539\u4EFB\u52A1\u4FE1\u606F\uFF08\u540D\u79F0\u3001\u63CF\u8FF0\uFF09'
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'strong',
                    null,
                    '\u4E0D\u53EF'
                  ),
                  '\u5220\u9664\u8BE5\u4EFB\u52A1'
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'strong',
                    null,
                    '\u4E0D\u53EF'
                  ),
                  '\u66F4\u6539\u5DF2\u6709\u63D0\u4EA4\u62A5\u544A\u5173\u8054\u7684\u6D41\u7A0B\u4FE1\u606F'
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'strong',
                    null,
                    '\u4E0D\u53EF'
                  ),
                  '\u5220\u9664\u5DF2\u6709\u63D0\u4EA4\u62A5\u544A\u5173\u8054\u7684\u6D41\u7A0B'
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'strong',
                    null,
                    '\u4E0D\u53EF'
                  ),
                  '\u5220\u9664\u5DF2\u63D0\u4EA4\u62A5\u544A\u7684\u6210\u5458'
                )
              )],
              onOk: function onOk() {
                axios.post('task/' + _this3.taskId).then(function (r) {
                  window.location.href = '/task/' + _this3.taskId + '?mode=team';
                });
              }
            });
          }
        }, {
          key: 'deleteTask',
          value: function deleteTask() {
            var _this4 = this;

            antd.Modal.confirm({
              title: '不可恢复',
              content: '确定要删除该任务么？',
              onOk: function onOk() {
                axios.delete('task/' + _this4.taskId).then(function (r) {
                  window.location.href = '/task';
                });
              }
            });
          }
        }, {
          key: 'title',
          value: function title() {
            if (this.state.task) {
              return this.state.task.name;
            }
          }
        }, {
          key: 'description',
          value: function description() {
            var otherViewer = null;
            if (this.mode.match(/^member_/)) {
              var username = this.mode.substr('member_'.length);
              if (window.auth.username !== username) {
                otherViewer = React.createElement(
                  Radio.Button,
                  { value: 'member_' + username },
                  username,
                  '\u7684\u89C6\u89D2'
                );
              }
            }
            if (this.state.task) {
              return React.createElement(
                Row,
                null,
                React.createElement(
                  Col,
                  { sm: 24, md: 12 },
                  React.createElement(
                    'div',
                    { style: { marginBottom: 16 } },
                    React.createElement(
                      'strong',
                      null,
                      '\u521B\u5EFA\u65F6\u95F4\uFF1A'
                    ),
                    React.createElement(
                      'span',
                      null,
                      moment.unix(this.state.task.createdAt).format('YYYY-MM-DD HH:mm:ss')
                    )
                  ),
                  React.createElement(
                    'div',
                    { style: { marginBottom: 16 } },
                    React.createElement(
                      'strong',
                      null,
                      '\u6700\u540E\u66F4\u65B0\uFF1A'
                    ),
                    React.createElement(
                      'span',
                      null,
                      moment.unix(this.state.task.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                    )
                  )
                ),
                React.createElement(
                  Col,
                  { sm: 24, md: 12 },
                  React.createElement(
                    'div',
                    { style: { marginBottom: 16 } },
                    React.createElement(
                      Radio.Group,
                      {
                        defaultValue: this.mode,
                        onChange: function onChange(e) {
                          return window.location.href = '?mode=' + e.target.value;
                        }
                      },
                      React.createElement(
                        Radio.Button,
                        { value: 'edit' },
                        '\u7F16\u8F91\u6A21\u5F0F'
                      ),
                      React.createElement(
                        Radio.Button,
                        { value: 'team' },
                        '\u56E2\u961F\u89C6\u89D2'
                      ),
                      React.createElement(
                        Radio.Button,
                        { value: 'member_' + window.auth.username },
                        '\u6211\u7684\u89C6\u89D2'
                      ),
                      otherViewer
                    )
                  ),
                  React.createElement(
                    Row,
                    { type: 'flex', gutter: 16, style: { marginBottom: 16 } },
                    this.state.task && this.state.task.draft && React.createElement(
                      Col,
                      null,
                      React.createElement(
                        Button,
                        {
                          type: 'primary',
                          onClick: this.publishTask.bind(this)
                        },
                        '\u53D1\u5E03\u4EFB\u52A1'
                      )
                    ),
                    this.state.task && this.state.task.draft && React.createElement(
                      Col,
                      null,
                      React.createElement(
                        Button,
                        {
                          type: 'danger',
                          onClick: this.deleteTask.bind(this)
                        },
                        '\u5220\u9664'
                      )
                    )
                  )
                )
              );
            }
          }
        }, {
          key: 'view',
          value: function view() {
            if (this.state.task) {
              if (this.mode === 'edit') {
                return React.createElement(
                  Row,
                  { type: 'flex', gutter: 16 },
                  React.createElement(
                    Col,
                    { xs: 24 },
                    React.createElement(TaskUpdater, _extends({}, this.state.task, {
                      onEdit: this.fetchTask.bind(this)
                    }))
                  ),
                  React.createElement(
                    Col,
                    { xs: 24, md: 12 },
                    React.createElement(TaskProcessUpdater, this.state.task)
                  ),
                  React.createElement(
                    Col,
                    { xs: 24, md: 12 },
                    React.createElement(TaskAssigneeUpdater, this.state.task)
                  )
                );
              } else if (this.mode.match(/^member_/)) {
                var username = this.mode.substr('member_'.length);
                return React.createElement(TaskMemberOverview, _extends({}, this.state.task, { username: username }));
              } else {
                // this.mode === 'team' or others
                return React.createElement(TaskTeamOverview, this.state.task);
              }
            }
          }
        }]);

        return _class;
      }(Page);

      _export('default', _class);
    }
  };
});
'use strict';

System.register('teamelf/task/TaskList', ['teamelf/layout/Page', 'teamelf/task/TaskCardItem'], function (_export, _context) {
  "use strict";

  var Page, TaskCardItem, _createClass, _antd, Button, Row, Col, _class;

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
    }, function (_teamelfTaskTaskCardItem) {
      TaskCardItem = _teamelfTaskTaskCardItem.default;
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
      Row = _antd.Row;
      Col = _antd.Col;

      _class = function (_Page) {
        _inherits(_class, _Page);

        function _class(props) {
          _classCallCheck(this, _class);

          var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

          _this.state = {
            tasks: []
          };
          _this.fetchTasks();
          return _this;
        }

        _createClass(_class, [{
          key: 'fetchTasks',
          value: function fetchTasks() {
            var _this2 = this;

            axios.get('task').then(function (r) {
              _this2.setState({ tasks: r.data });
            });
          }
        }, {
          key: 'title',
          value: function title() {
            return '任务/项目进度管理';
          }
        }, {
          key: 'createTask',
          value: function createTask() {
            axios.post('task').then(function (r) {
              window.location.href = '/task/' + r.data.id + '?mode=edit';
            });
          }
        }, {
          key: 'description',
          value: function description() {
            return [React.createElement(
              'p',
              null,
              '\u8FD9\u91CC\u60A8\u521B\u5EFA\u4EFB\u52A1\uFF0C\u5E76\u8FDB\u884C\u5206\u5DE5\u3001\u5B9E\u65F6\u8DDF\u8E2A\u8FDB\u5EA6\u3001\u63D0\u4EA4\u62A5\u544A\u3001\u4E0A\u4F20\u6750\u6599\u7B49\u64CD\u4F5C'
            ), React.createElement(
              Button,
              {
                type: 'primary',
                onClick: this.createTask.bind(this),
                icon: 'check-circle-o',
                disabled: !can('task.create')
              },
              '\u65B0\u5EFA\u4EFB\u52A1/\u9879\u76EE'
            )];
          }
        }, {
          key: 'view',
          value: function view() {
            return React.createElement(
              Row,
              { type: 'flex', gutter: 16 },
              this.state.tasks.map(function (o) {
                return React.createElement(
                  Col,
                  { sm: 24, md: 12, lg: 8, xxl: 6 },
                  React.createElement(TaskCardItem, o)
                );
              })
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

System.register('teamelf/task/TaskMemberOverview', ['teamelf/task/TaskReportEditor'], function (_export, _context) {
  "use strict";

  var TaskReportEditor, _extends, _createClass, _antd, Row, Col, Card, Button, Timeline, Table, _class;

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
    setters: [function (_teamelfTaskTaskReportEditor) {
      TaskReportEditor = _teamelfTaskTaskReportEditor.default;
    }],
    execute: function () {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

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
      Row = _antd.Row;
      Col = _antd.Col;
      Card = _antd.Card;
      Button = _antd.Button;
      Timeline = _antd.Timeline;
      Table = _antd.Table;

      _class = function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class(props) {
          _classCallCheck(this, _class);

          var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

          _this.state = {
            processes: [],
            reports: []
          };
          _this.fetchProcesses();
          _this.fetchReports();
          return _this;
        }

        _createClass(_class, [{
          key: 'fetchProcesses',
          value: function fetchProcesses() {
            var _this2 = this;

            return axios.get('task/' + this.props.id + '/process').then(function (r) {
              _this2.setState({ processes: r.data });
              return r;
            });
          }
        }, {
          key: 'fetchReports',
          value: function fetchReports() {
            var _this3 = this;

            var params = {
              username: this.props.username
            };
            return axios.get('task/' + this.props.id + '/report', { params: params }).then(function (r) {
              _this3.setState({ reports: r.data });
              return r;
            });
          }
        }, {
          key: 'submitReport',
          value: function submitReport(reportId) {
            var _this4 = this;

            antd.Modal.confirm({
              title: '不可撤销',
              content: "确认要提交总结么，提交后您将不能对此总结做任何修改操作",
              onOk: function onOk() {
                axios.post('task/' + _this4.props.id + '/report/' + reportId).then(function (r) {
                  _this4.fetchReports();
                });
              }
            });
          }
        }, {
          key: 'render',
          value: function render() {
            var _this5 = this;

            var columns = [{
              title: '创建时间',
              dataIndex: 'createdAt',
              key: 'createdAt',
              render: function render(text, record, index) {
                return moment.unix(text).format('YYYY-MM-DD HH:mm:ss');
              }
            }, {
              title: '最后修改',
              dataIndex: 'updatedAt',
              key: 'updatedAt',
              render: function render(text, record, index) {
                return moment.unix(text).format('YYYY-MM-DD HH:mm:ss');
              }
            }, {
              title: '概览',
              dataIndex: 'abstract',
              key: 'abstract',
              render: function render(text, record, index) {
                return [record.draft && React.createElement(
                  'span',
                  { style: { color: 'red' } },
                  '[\u8349\u7A3F] '
                ), text];
              }
            }, {
              title: React.createElement(
                Row,
                { type: 'flex', gutter: 16 },
                React.createElement(
                  Col,
                  null,
                  React.createElement(TaskReportEditor, {
                    taskId: this.props.id,
                    onEdit: this.fetchReports.bind(this)
                  })
                ),
                React.createElement(
                  Col,
                  null,
                  React.createElement(
                    Button,
                    {
                      type: 'dashed',
                      icon: 'reload',
                      onClick: this.fetchReports.bind(this)
                    },
                    '\u5237\u65B0'
                  )
                )
              ),
              key: 'operation',
              render: function render(text, record, index) {
                return React.createElement(
                  Row,
                  { type: 'flex', gutter: 16 },
                  React.createElement(
                    Col,
                    null,
                    React.createElement(TaskReportEditor, _extends({
                      readonly: true,
                      taskId: _this5.props.id
                    }, record))
                  ),
                  record.draft && React.createElement(
                    Col,
                    null,
                    React.createElement(TaskReportEditor, _extends({
                      taskId: _this5.props.id
                    }, record, {
                      onEdit: _this5.fetchReports.bind(_this5)
                    }))
                  ),
                  record.draft && React.createElement(
                    Col,
                    null,
                    React.createElement(
                      Button,
                      {
                        type: 'dashed',
                        onClick: _this5.submitReport.bind(_this5, record.id)
                      },
                      '\u63D0\u4EA4'
                    )
                  )
                );
              }
            }];
            return [React.createElement(Table, {
              style: { background: '#fff' },
              dataSource: this.state.reports,
              columns: columns,
              pagination: false
            })];
          }
        }]);

        return _class;
      }(React.Component);

      _export('default', _class);
    }
  };
});
'use strict';

System.register('teamelf/task/TaskProcessUpdater', [], function (_export, _context) {
  "use strict";

  var _createClass, _antd, Card, Button, Icon, Timeline, Modal, Input, _class;

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

      _antd = antd;
      Card = _antd.Card;
      Button = _antd.Button;
      Icon = _antd.Icon;
      Timeline = _antd.Timeline;
      Modal = _antd.Modal;
      Input = _antd.Input;

      _class = function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class(props) {
          _classCallCheck(this, _class);

          var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

          _this.state = {
            processes: [],
            modal: {},
            processTitle: '',
            processDescription: ''
          };
          _this.fetchProcesses();
          return _this;
        }

        _createClass(_class, [{
          key: 'fetchProcesses',
          value: function fetchProcesses() {
            var _this2 = this;

            return axios.get('task/' + this.props.id + '/process').then(function (r) {
              _this2.setState({ processes: r.data });
              return r;
            });
          }
        }, {
          key: 'createTaskProcess',
          value: function createTaskProcess() {
            var _this3 = this;

            var data = {
              title: this.state.processTitle,
              description: this.state.processDescription
            };
            return axios.post('task/' + this.props.id + '/process', data).then(function (r) {
              _this3.fetchProcesses();
              return r;
            });
          }
        }, {
          key: 'updateTaskProcess',
          value: function updateTaskProcess(processId) {
            var _this4 = this;

            var data = {
              title: this.state.processTitle,
              description: this.state.processDescription
            };
            return axios.put('task/' + this.props.id + '/process/' + processId, data).then(function (r) {
              _this4.fetchProcesses();
              return r;
            });
          }
        }, {
          key: 'deleteTaskProcess',
          value: function deleteTaskProcess(processId, callback) {
            var _this5 = this;

            antd.Modal.confirm({
              title: '不可恢复',
              content: '确定要删除该流程么？',
              onOk: function onOk() {
                axios.delete('task/' + _this5.props.id + '/process/' + processId).then(function (r) {
                  _this5.fetchProcesses();
                  if (callback) {
                    callback();
                  }
                });
              }
            });
          }
        }, {
          key: 'showEditor',
          value: function showEditor(process) {
            var _this6 = this;

            var closeEditor = function closeEditor() {
              _this6.setState({ modal: {} });
            };
            var modal = {};
            if (process) {
              modal = {
                title: '编辑 #' + process.id,
                visible: true,
                footer: [React.createElement(
                  Button,
                  {
                    onClick: function onClick() {
                      return closeEditor();
                    }
                  },
                  '\u53D6\u6D88'
                ), React.createElement(
                  Button,
                  {
                    type: 'danger',
                    onClick: function onClick() {
                      return _this6.deleteTaskProcess(process.id, closeEditor);
                    }
                  },
                  '\u5220\u9664'
                ), React.createElement(
                  Button,
                  {
                    type: 'primary',
                    onClick: function onClick() {
                      _this6.updateTaskProcess(process.id).then(function (r) {
                        closeEditor();
                      });
                    }
                  },
                  '\u4FDD\u5B58'
                )],
                onCancel: function onCancel(e) {
                  return closeEditor();
                },
                destroyOnClose: true
              };
              this.setState({
                modal: modal,
                processTitle: process.title,
                processDescription: process.description
              });
            } else {
              modal = {
                title: '新建流程',
                visible: true,
                okText: '确认创建',
                onOk: function onOk(e) {
                  _this6.createTaskProcess().then(function (r) {
                    closeEditor();
                  });
                },
                onCancel: function onCancel(e) {
                  return closeEditor();
                },
                destroyOnClose: true
              };
              this.setState({
                modal: modal,
                processTitle: '',
                processDescription: ''
              });
            }
          }
        }, {
          key: 'render',
          value: function render() {
            var _this7 = this;

            var TaskProcessCreateButton = React.createElement(
              Button,
              {
                type: 'primary',
                onClick: this.showEditor.bind(this, null)
              },
              React.createElement(Icon, { type: 'plus' }),
              React.createElement(
                'span',
                null,
                '\u6DFB\u52A0\u65B0\u6D41\u7A0B'
              )
            );
            return [React.createElement(
              Card,
              {
                style: { marginBottom: 16 },
                title: '\u5B50\u4EFB\u52A1/\u6D41\u7A0B',
                extra: TaskProcessCreateButton
              },
              React.createElement(
                Timeline,
                null,
                this.state.processes.map(function (o) {
                  return React.createElement(
                    Timeline.Item,
                    null,
                    React.createElement(
                      'a',
                      { onClick: _this7.showEditor.bind(_this7, o) },
                      React.createElement(
                        'strong',
                        null,
                        'process#',
                        o.id
                      )
                    ),
                    React.createElement(
                      'div',
                      null,
                      React.createElement(
                        'strong',
                        null,
                        '\u540D\u79F0\uFF1A'
                      ),
                      o.title
                    ),
                    React.createElement(
                      'div',
                      { style: { color: '#757575' } },
                      React.createElement(
                        'strong',
                        null,
                        '\u63CF\u8FF0\uFF1A'
                      ),
                      o.description
                    )
                  );
                })
              )
            ), React.createElement(
              Modal,
              this.state.modal,
              React.createElement(
                'div',
                { style: { marginBottom: 16 } },
                React.createElement(
                  'strong',
                  null,
                  '\u6D41\u7A0B\u540D\u79F0'
                ),
                React.createElement(Input, {
                  value: this.state.processTitle,
                  onChange: function onChange(e) {
                    return _this7.setState({ processTitle: e.target.value });
                  }
                })
              ),
              React.createElement(
                'div',
                { style: { marginBottom: 16 } },
                React.createElement(
                  'strong',
                  null,
                  '\u6D41\u7A0B\u63CF\u8FF0'
                ),
                React.createElement(Input.TextArea, {
                  autosize: { minRows: 6, maxRows: 6 },
                  value: this.state.processDescription,
                  onChange: function onChange(e) {
                    return _this7.setState({ processDescription: e.target.value });
                  }
                })
              )
            )];
          }
        }]);

        return _class;
      }(React.Component);

      _export('default', _class);
    }
  };
});
'use strict';

System.register('teamelf/task/TaskReportEditor', ['teamelf/components/Editor'], function (_export, _context) {
  "use strict";

  var Editor, _createClass, _antd, Button, Modal, Input, Divider, _class;

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
    setters: [function (_teamelfComponentsEditor) {
      Editor = _teamelfComponentsEditor.default;
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
      Modal = _antd.Modal;
      Input = _antd.Input;
      Divider = _antd.Divider;

      _class = function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class(props) {
          _classCallCheck(this, _class);

          var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

          _this.state = {
            visible: false,
            summary: '',
            plan: '',
            risk: ''
          };
          return _this;
        }

        _createClass(_class, [{
          key: 'openModal',
          value: function openModal() {
            this.setState({ visible: true });
            if (this.props.id) {
              this.fetchReport();
            }
          }
        }, {
          key: 'closeModal',
          value: function closeModal() {
            this.setState({ visible: false });
          }
        }, {
          key: 'createReport',
          value: function createReport() {
            var _this2 = this;

            var data = {
              summary: this.state.summary,
              plan: this.state.plan,
              risk: this.state.risk
            };
            return axios.post('task/' + this.props.taskId + '/report', data).then(function (r) {
              _this2.props.onEdit().then(function (r) {
                _this2.closeModal();
              });
            });
          }
        }, {
          key: 'fetchReport',
          value: function fetchReport() {
            var _this3 = this;

            axios.get('task/' + this.props.taskId + '/report/' + this.props.id).then(function (r) {
              _this3.setState({
                summary: r.data.summary,
                plan: r.data.plan,
                risk: r.data.risk
              });
            });
          }
        }, {
          key: 'updateReport',
          value: function updateReport() {
            var _this4 = this;

            var data = {
              summary: this.state.summary,
              plan: this.state.plan,
              risk: this.state.risk
            };
            return axios.put('task/' + this.props.taskId + '/report/' + this.props.id, data).then(function (r) {
              _this4.props.onEdit().then(function (r) {
                _this4.closeModal();
              });
            });
          }
        }, {
          key: 'render',
          value: function render() {
            var _this5 = this;

            var renderEditors = function renderEditors() {
              return [React.createElement(
                'div',
                { style: { marginBottom: 16 } },
                React.createElement(
                  'div',
                  null,
                  '\u60A8\u53EF\u4EE5\u5728\u4EFB\u4F55\u5730\u65B9\u5199 process#ID \u6765\u5173\u8054\u4E00\u4E2A\u4EFB\u52A1\u6D41\u7A0B'
                ),
                React.createElement(
                  'div',
                  null,
                  '\u52A0\u4E0A finish|close|fix|done|finished|closed|fixed \u524D\u7F00\u53EF\u8868\u793A\u60A8\u5DF2\u5B8C\u6210\u8BE5\u4EFB\u52A1\u6D41\u7A0B'
                ),
                React.createElement(
                  'div',
                  null,
                  '\u4F8B\u5982'
                ),
                React.createElement(
                  'ul',
                  null,
                  React.createElement(
                    'li',
                    null,
                    '....\u60A8\u7684\u603B\u7ED3... done process#K38D5fdadsXbiGP6hudLiK ...\u60A8\u7684\u603B\u7ED3...'
                  ),
                  React.createElement(
                    'li',
                    null,
                    '....\u60A8\u7684\u603B\u7ED3... process#K38D5fdadsXbiGP6hudLiK ...\u60A8\u7684\u603B\u7ED3...'
                  )
                )
              ), React.createElement(
                'div',
                { style: { marginBottom: 16 } },
                React.createElement(
                  'strong',
                  null,
                  '\u603B\u7ED3'
                ),
                React.createElement(Editor, {
                  autosize: { minRows: 5, maxRows: 5 },
                  value: _this5.state.summary,
                  onChange: function onChange(e) {
                    return _this5.setState({ summary: e });
                  }
                })
              ), React.createElement(
                'div',
                { style: { marginBottom: 16 } },
                React.createElement(
                  'strong',
                  null,
                  '\u540E\u7EED\u8BA1\u5212'
                ),
                React.createElement(Editor, {
                  autosize: { minRows: 5, maxRows: 5 },
                  value: _this5.state.summary,
                  onChange: function onChange(e) {
                    return _this5.setState({ summary: e });
                  }
                })
              ), React.createElement(
                'div',
                { style: { marginBottom: 16 } },
                React.createElement(
                  'strong',
                  null,
                  '\u98CE\u9669\u8BF4\u660E'
                ),
                React.createElement(Editor, {
                  autosize: { minRows: 5, maxRows: 5 },
                  value: _this5.state.summary,
                  onChange: function onChange(e) {
                    return _this5.setState({ summary: e });
                  }
                })
              )];
            };
            if (this.props.id) {
              if (this.props.readonly) {
                return [React.createElement(
                  Button,
                  {
                    onClick: this.openModal.bind(this)
                  },
                  '\u67E5\u770B'
                ), React.createElement(
                  Modal,
                  {
                    width: '680',
                    title: '查看报告 #' + this.props.id,
                    visible: this.state.visible,
                    footer: null,
                    onCancel: this.closeModal.bind(this)
                  },
                  React.createElement(
                    'h2',
                    null,
                    '\u603B\u7ED3'
                  ),
                  React.createElement(Editor, {
                    style: { border: '1px solid #dcdcdc', padding: 16 },
                    readonly: true, value: this.state.summary
                  }),
                  React.createElement(Divider, null),
                  React.createElement(
                    'h2',
                    null,
                    '\u540E\u7EED\u8BA1\u5212'
                  ),
                  React.createElement(Editor, {
                    style: { border: '1px solid #dcdcdc', padding: 16 },
                    readonly: true, value: this.state.plan
                  }),
                  React.createElement(Divider, null),
                  React.createElement(
                    'h2',
                    null,
                    '\u98CE\u9669\u8BF4\u660E'
                  ),
                  React.createElement(Editor, {
                    style: { border: '1px solid #dcdcdc', padding: 16 },
                    readonly: true, value: this.state.risk
                  }),
                  React.createElement(Divider, null)
                )];
              } else {
                return [React.createElement(
                  Button,
                  {
                    type: 'primary',
                    onClick: this.openModal.bind(this)
                  },
                  '\u7F16\u8F91'
                ), React.createElement(
                  Modal,
                  {
                    width: '680',
                    title: '编辑报告 #' + this.props.id,
                    visible: this.state.visible,
                    onOk: this.updateReport.bind(this),
                    onCancel: this.closeModal.bind(this)
                  },
                  renderEditors()
                )];
              }
            } else {
              // new report
              return [React.createElement(
                Button,
                {
                  type: 'primary',
                  onClick: this.openModal.bind(this)
                },
                '\u65B0\u5EFA\u62A5\u544A'
              ), React.createElement(
                Modal,
                {
                  width: '680',
                  title: '\u65B0\u5EFA\u62A5\u544A',
                  visible: this.state.visible,
                  footer: [React.createElement(
                    Button,
                    { onClick: this.closeModal.bind(this) },
                    '\u53D6\u6D88'
                  ), React.createElement(
                    Button,
                    { type: 'primary', onClick: this.createReport.bind(this) },
                    '\u4FDD\u5B58\u8349\u7A3F'
                  )],
                  onCancel: this.closeModal.bind(this)
                },
                renderEditors()
              )];
            }
          }
        }]);

        return _class;
      }(React.Component);

      _export('default', _class);
    }
  };
});
"use strict";

System.register("teamelf/task/TaskTeamOverview", ["teamelf/components/Editor"], function (_export, _context) {
  "use strict";

  var Editor, _createClass, _antd, Row, Col, Card, Progress, Avatar, Popover, List, _class;

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
    setters: [function (_teamelfComponentsEditor) {
      Editor = _teamelfComponentsEditor.default;
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
      Row = _antd.Row;
      Col = _antd.Col;
      Card = _antd.Card;
      Progress = _antd.Progress;
      Avatar = _antd.Avatar;
      Popover = _antd.Popover;
      List = _antd.List;

      _class = function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class(props) {
          _classCallCheck(this, _class);

          var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

          _this.state = {
            assignees: [],
            processes: [],
            statistics: null
          };
          _this.fetchAssignees();
          _this.fetchProcesses();
          _this.fetchStatistics();
          return _this;
        }

        _createClass(_class, [{
          key: "fetchAssignees",
          value: function fetchAssignees() {
            var _this2 = this;

            axios.get("task/" + this.props.id + "/assignee").then(function (r) {
              _this2.setState({ assignees: r.data });
            });
          }
        }, {
          key: "fetchProcesses",
          value: function fetchProcesses() {
            var _this3 = this;

            return axios.get("task/" + this.props.id + "/process").then(function (r) {
              _this3.setState({ processes: r.data });
              return r;
            });
          }
        }, {
          key: "fetchStatistics",
          value: function fetchStatistics() {
            var _this4 = this;

            axios.get("task/" + this.props.id + "/statistics").then(function (r) {
              _this4.setState({ statistics: r.data });
            });
          }
        }, {
          key: "render",
          value: function render() {
            var _this5 = this;

            return React.createElement(
              Row,
              { type: "flex", gutter: 16 },
              React.createElement(
                Col,
                { xs: 24, md: 12 },
                React.createElement(
                  Card,
                  {
                    style: { marginBottom: 16 },
                    className: "task-overview",
                    title: this.props.name
                  },
                  React.createElement(Editor, { readonly: true, value: this.props.introduction })
                )
              ),
              React.createElement(
                Col,
                { xs: 24, md: 12 },
                !!this.state.statistics && React.createElement(
                  Card,
                  {
                    style: { marginBottom: 16 },
                    className: "task-overview",
                    title: React.createElement(Progress, { percent: this.state.statistics.progress })
                  },
                  React.createElement(List, {
                    itemLayout: "horizontal",
                    dataSource: this.state.processes,
                    renderItem: function renderItem(o) {
                      return React.createElement(
                        List.Item,
                        null,
                        React.createElement(List.Item.Meta, {
                          avatar: React.createElement(Progress, {
                            type: "circle",
                            width: "70",
                            percent: _this5.state.statistics.process[o.id].progress,
                            format: function format(percent) {
                              return _this5.state.statistics.process[o.id].total + " \u62A5\u544A";
                            }
                          }),
                          title: o.title,
                          description: o.description
                        })
                      );
                    }
                  })
                )
              ),
              React.createElement(
                Col,
                { xs: 24 },
                !!this.state.statistics && React.createElement(
                  Card,
                  { style: { marginBottom: 16 } },
                  this.state.assignees.map(function (o) {
                    return React.createElement(
                      Card.Grid,
                      { style: { width: '100%' } },
                      React.createElement(
                        Row,
                        { type: "flex", gutter: 16 },
                        React.createElement(
                          Col,
                          { xs: { span: 12, order: 1 }, md: { span: 4, order: 1 } },
                          React.createElement(Avatar, { size: "small", style: { verticalAlign: 'middle' } }),
                          React.createElement(
                            "span",
                            { style: { marginLeft: 16 } },
                            o.name
                          )
                        ),
                        React.createElement(
                          Col,
                          { xs: { span: 24, order: 3 }, md: { span: 16, order: 2 } },
                          _this5.state.processes.map(function (p) {
                            return React.createElement(
                              "div",
                              {
                                style: {
                                  display: 'inline-block',
                                  height: 24,
                                  textAlign: 'center',
                                  width: 100.0 / _this5.state.processes.length + "%",
                                  border: '1px solid #dcdcdc',
                                  color: 'white',
                                  background: function () {
                                    var s = _this5.state.statistics.process[p.id].assignee[o.username];
                                    if (s.done) {
                                      return '#52c41a';
                                    } else if (s.total) {
                                      return '#1890ff';
                                    } else {
                                      return '#aaa';
                                    }
                                  }()
                                }
                              },
                              _this5.state.statistics.process[p.id].assignee[o.username].total,
                              " \u62A5\u544A"
                            );
                          })
                        ),
                        React.createElement(
                          Col,
                          { xs: { span: 12, order: 2 }, md: { span: 4, order: 3 }, style: { textAlign: 'right' } },
                          React.createElement(
                            "a",
                            { href: "?mode=member_" + o.username },
                            "TA\u7684\u89C6\u89D2"
                          )
                        )
                      )
                    );
                  })
                )
              )
            );
          }
        }]);

        return _class;
      }(React.Component);

      _export("default", _class);
    }
  };
});
"use strict";

System.register("teamelf/task/TaskUpdater", ["teamelf/components/InfoEditor"], function (_export, _context) {
  "use strict";

  var InfoEditor, _createClass, _antd, Card, _class;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

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
    setters: [function (_teamelfComponentsInfoEditor) {
      InfoEditor = _teamelfComponentsInfoEditor.default;
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
      Card = _antd.Card;

      _class = function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class() {
          _classCallCheck(this, _class);

          return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
          key: "edit",
          value: function edit(key, v) {
            var _this2 = this;

            var data = _defineProperty({}, key, v);
            return axios.put("task/" + this.props.id, data).then(function (r) {
              _this2.props.onEdit();
              return r;
            });
          }
        }, {
          key: "render",
          value: function render() {
            return React.createElement(
              Card,
              {
                style: { marginBottom: 16 },
                title: "\u57FA\u672C\u4FE1\u606F"
              },
              React.createElement(InfoEditor, {
                label: "\u4EFB\u52A1\u540D\u79F0",
                value: this.props.name,
                onEdit: this.edit.bind(this, 'name')
              }),
              React.createElement(InfoEditor, {
                type: "textarea",
                label: "\u4EFB\u52A1\u63CF\u8FF0",
                value: this.props.introduction,
                onEdit: this.edit.bind(this, 'introduction')
              })
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
        navigations.push({ path: '/task', icon: 'check-circle-o', title: '任务进度' });
      });

      extend(Permission.prototype, 'permissions', function (permissions) {
        permissions.push({
          name: '任务进度',
          children: [{ name: '查看所有任务详情', permission: 'task.item' }, { name: '创新新任务', permission: 'task.create' }, { name: '更新任务', permission: 'task.update' }, { name: '发布任务', permission: 'task.publish' }, { name: '删除未发布的任务', permission: 'task.delete' }]
        });
      });
    }
  };
});