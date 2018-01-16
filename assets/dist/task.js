"use strict";

System.register("teamelf/task/TaskAssigneeUpdater", [], function (_export, _context) {
  "use strict";

  var _createClass, _antd, Card, Input, AutoComplete, _class;

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
      Input = _antd.Input;
      AutoComplete = _antd.AutoComplete;

      _class = function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class(props) {
          _classCallCheck(this, _class);

          var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

          _this.state = {
            members: []
          };
          _this.fetchMembers();
          return _this;
        }

        _createClass(_class, [{
          key: "fetchMembers",
          value: function fetchMembers() {
            var _this2 = this;

            axios.get('member').then(function (r) {
              _this2.setState({ members: r.data.map(function (o) {
                  return {
                    key: o.username,
                    value: o.name
                  };
                }) });
            });
          }
        }, {
          key: "render",
          value: function render() {
            return React.createElement(Card, {
              style: { marginBottom: 16 },
              title: "\u6307\u6D3E\u4EFB\u52A1\u7ED9"
            });
          }
        }]);

        return _class;
      }(React.Component);

      _export("default", _class);
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
                  return window.location.href = '/task/' + _this2.props.id;
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
                this.props.introduction
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

System.register('teamelf/task/TaskItem', ['teamelf/layout/Page', 'teamelf/task/TaskStatus', 'teamelf/task/TaskUpdater', 'teamelf/task/TaskProcessUpdater', 'teamelf/task/TaskAssigneeUpdater'], function (_export, _context) {
  "use strict";

  var Page, TaskStatus, TaskUpdater, TaskProcessUpdater, TaskAssigneeUpdater, _extends, _createClass, _antd, Row, Col, Radio, _class;

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
    }, function (_teamelfTaskTaskStatus) {
      TaskStatus = _teamelfTaskTaskStatus.default;
    }, function (_teamelfTaskTaskUpdater) {
      TaskUpdater = _teamelfTaskTaskUpdater.default;
    }, function (_teamelfTaskTaskProcessUpdater) {
      TaskProcessUpdater = _teamelfTaskTaskProcessUpdater.default;
    }, function (_teamelfTaskTaskAssigneeUpdater) {
      TaskAssigneeUpdater = _teamelfTaskTaskAssigneeUpdater.default;
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

      _class = function (_Page) {
        _inherits(_class, _Page);

        function _class(props) {
          _classCallCheck(this, _class);

          var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

          var query = new URLSearchParams(window.location.search);
          _this.mode = query.get('mode') || 'team';
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

            axios.get('task/' + this.props.match.params.id).then(function (r) {
              _this2.setState({ task: r.data });
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
                return React.createElement(
                  'div',
                  null,
                  username,
                  ' view'
                );
              } else {
                // this.mode === 'team' or others
                return React.createElement(
                  'div',
                  null,
                  'team view'
                );
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
              window.location.href = '/task/' + r.data.id;
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
                size: 'small',
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
                title: '\u4EFB\u52A1\u6D41\u7A0B',
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
                        o.title
                      )
                    ),
                    React.createElement(
                      'div',
                      { style: { color: '#757575' } },
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
                  '\u4EFB\u52A1\u540D\u79F0'
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
                  '\u4EFB\u52A1\u63CF\u8FF0'
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
        if (can('task.*')) {
          navigations.push({ path: '/task', icon: 'check-circle-o', title: '任务进度' });
        }
      });

      extend(Permission.prototype, 'permissions', function (permissions) {
        permissions.push({
          name: '任务进度',
          children: [{ name: '查看所有任务列表', permission: 'task.list' }, { name: '查看任务详情', permission: 'task.item' }, { name: '创新新任务', permission: 'task.create' }, { name: '更新任务', permission: 'task.update' }, { name: '发布任务', permission: 'task.publish' }, { name: '删除未发布的任务', permission: 'task.delete' }]
        });
      });
    }
  };
});