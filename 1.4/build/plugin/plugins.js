/*
combined files : 

gallery/butterfly/1.4/plugin/ui/base
gallery/butterfly/1.4/plugin/ui/radio
gallery/butterfly/1.4/plugin/ui/checkbox
gallery/butterfly/1.4/plugin/ui/select
gallery/butterfly/1.4/plugin/ui/spinbox
gallery/butterfly/1.4/plugin/ui/text
gallery/butterfly/1.4/plugin/ui/uploader
gallery/butterfly/1.4/plugin/auth
gallery/butterfly/1.4/plugin/bidi
gallery/butterfly/1.4/plugin/plugins

*/
// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/ui/base',function(S, Node, Base) {
  var $, DATA, TRUE, Ui;

  $ = Node.all;
  TRUE = 'true';
  DATA = 'data-';
  Ui = function(config) {
    Ui.superclass.constructor.call(this, config);
    this.set('_guid', 'bf-' + S.guid());
    return this.set('config', config);
  };
  S.mix(Ui, {
    /*
     获取标签上的配置
     * @param {NodeList} $target 目标元素
     * @param {String} attrs 目标元素上的属性(比如"max"取data-max="10")
     * @param {String} prefix 排除前缀，比如data-limiter-wrapper 要吧limiter-去掉
     * @return {Object}
    */

    tagConfig: function($target, attrs, prefix) {
      var config;

      config = {};
      if (!$target.length) {
        return config;
      }
      if (!S.isArray(attrs)) {
        return config;
      }
      S.each(attrs, function(attr) {
        var val;

        val = $target.attr(DATA + attr);
        if (val) {
          if (prefix) {
            attr = attr.replace(prefix, '');
          }
          if (val === 'true') {
            val = true;
          }
          if (val === 'false') {
            val = false;
          }
          return config[attr] = val;
        }
      });
      return config;
    }
  });
  S.extend(Ui, Base, {
    /*插件初始化
    */

    pluginInitializer: function(host) {
      this.set('host', host);
      return host.on('inputEach', this._inputEachHandler, this);
    },
    /*
      将ui组件添加到宿主中
      核心目的是像radio或checkbox这种有组概念的Ui组件，防止多次实例化
    */

    _appendToHost: function(ui) {
      var host, name, uis;

      host = this.get('host');
      if (!host) {
        return false;
      }
      uis = host.get('uis');
      if (!uis) {
        return false;
      }
      name = this.get('name');
      ui = ui || this.get('ui');
      if (!uis[name]) {
        uis[name] = ui;
        host.set('uis', uis);
      }
      return this;
    },
    /*是否运行Ui组件，主要根据type属性进行判断
    */

    _isRenderUi: function($target) {
      var isRender, type;

      isRender = false;
      if (!$target.length) {
        return isRender;
      }
      type = $target.attr('type') || $target.attr('data-type');
      isRender = type === this.get('type');
      return isRender && !this._isExist() && !this._isNoRender($target);
    },
    /*是否已经存在该Ui实例
    */

    _isExist: function() {
      var host, name, uis;

      host = this.get('host');
      if (!host) {
        return false;
      }
      uis = host.get('uis');
      name = this.get('name');
      return S.isObject(uis[name]);
    },
    /*html tag配置了data-no-render="true"，不运行
    */

    _isNoRender: function($target) {
      var attr;

      attr = $target.attr(DATA + 'no-render');
      if (attr) {
        return true;
      }
      return false;
    },
    /*
      实例化Ui组件
      UiClass:Ui类
    */

    _renderUi: function(UiClass) {
      var $target, cls, config;

      $target = this.get('target');
      config = this.get('config');
      cls = new UiClass($target, config);
      cls.render && cls.render();
      this.set('ui', cls);
      return cls;
    },
    /*
    根据data-{ui}的存在性来判断是否使用该ui组件
       * @param {String} uiName Ui组件名称
       * @param {String} $target 目标元素，可选
       * @return {Boolean}
    */

    isUseUi: function(uiName, $target) {
      var isUse;

      $target = $target || this.get('target');
      if (!$target.length) {
        return false;
      }
      isUse = $target.attr(DATA + uiName);
      return isUse === TRUE;
    }
  }, {
    ATTRS: {
      /*插件id
      */

      pluginId: {
        value: ''
      },
      /*目标元素
      */

      target: {
        value: '',
        getter: function(v) {
          return $(v);
        }
      },
      /*获取元素的name属性
      */

      name: {
        value: '',
        getter: function(v) {
          var $el;

          $el = this.get('target');
          v = $el.attr('name') || this.get('_guid');
          return v;
        }
      },
      /*ui组件的实例
      */

      ui: {
        value: '',
        setter: function(v) {
          var $el;

          if (!S.isObject(v)) {
            return v;
          }
          $el = this.get('target');
          $el.data('data-ui', v);
          this._appendToHost(v);
          return v;
        }
      },
      /*Ui对应的元素type的值
      */

      type: {
        value: ''
      },
      /*宿主实例（一般为Butterfly实例）
      */

      host: {
        value: ''
      },
      /*默认配置
      */

      defaultConfig: {
        value: {}
      },
      /*UI组件配置
      */

      config: {
        value: {},
        getter: function(v) {
          var defaultConfig;

          defaultConfig = this.get('defaultConfig');
          return S.merge(defaultConfig, v);
        }
      },
      /*随机数
      */

      _guid: {
        value: ''
      }
    }
  });
  return Ui;
}, {
  requires: ['node', 'base']
});

// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/ui/radio',function(S, Node, Base, Radio) {
  var $, RadioUi;

  $ = Node.all;
  RadioUi = function(config) {
    return RadioUi.superclass.constructor.call(this, config);
  };
  S.extend(RadioUi, Base, {
    /*input元素循环后触发
    */

    _inputEachHandler: function(ev) {
      var $input;

      $input = ev.$el;
      this.set('target', $input);
      if (!this._isRenderUi($input)) {
        return true;
      }
      return this._renderUi(Radio);
    }
  }, {
    ATTRS: {
      type: {
        value: 'radio'
      },
      /*radio目标元素
      */

      target: {
        value: '',
        setter: function(v) {
          var $target, hook, name;

          $target = $(v);
          name = $target.attr('name');
          if (name) {
            $target = $(document.getElementsByName(name));
          } else {
            hook = $target.attr('data-field');
            if (hook) {
              $target = $(hook);
            }
          }
          return $target;
        }
      },
      defaultConfig: {
        value: {
          cssUrl: ''
        }
      }
    }
  });
  return RadioUi;
}, {
  requires: ['node', './base', 'gallery/radio/1.4/']
});

// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/ui/checkbox',function(S, Node, Base, Checkbox) {
  var $, CheckboxUi;

  $ = Node.all;
  CheckboxUi = function(config) {
    return CheckboxUi.superclass.constructor.call(this, config);
  };
  S.extend(CheckboxUi, Base, {
    /*input元素循环后触发
    */

    _inputEachHandler: function(ev) {
      var $input;

      $input = ev.$el;
      if (!this._isRenderUi($input)) {
        return true;
      }
      this.set('target', $input);
      return this._renderUi(Checkbox);
    }
  }, {
    ATTRS: {
      type: {
        value: 'checkbox'
      },
      defaultConfig: {
        value: {
          cssUrl: ''
        }
      }
    }
  });
  return CheckboxUi;
}, {
  requires: ['node', './radio', 'gallery/checkbox/1.4/']
});

// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/ui/select',function(S, Base, Select) {
  var SelectUi;

  SelectUi = function(config) {
    return SelectUi.superclass.constructor.call(this, config);
  };
  S.extend(SelectUi, Base, {
    /*插件初始化
    */

    pluginInitializer: function(host) {
      this.set('host', host);
      return host.on('selectEach', this._selectEachHandler, this);
    },
    /*select元素循环后触发
    */

    _selectEachHandler: function(ev) {
      var $el, isShow, select;

      $el = ev.$el;
      if (!this._isRenderUi($el)) {
        return true;
      }
      this.set('target', $el);
      isShow = $el.css('display') !== 'none';
      select = this._renderUi(Select);
      if (!isShow) {
        return select.hide();
      }
    }
  }, {
    ATTRS: {
      type: {
        value: 'select'
      }
    }
  });
  return SelectUi;
}, {
  requires: ['./base', 'gallery/select/1.4/']
});

// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/ui/spinbox',function(S, Node, Base, Spinbox) {
  var $, Number;

  $ = Node.all;
  Number = function(config) {
    return Number.superclass.constructor.call(this, config);
  };
  S.extend(Number, Base, {
    /*input元素循环后触发
    */

    _inputEachHandler: function(ev) {
      var $input;

      $input = ev.$el;
      if (!this._isRenderUi($input)) {
        return true;
      }
      this.set('target', $input);
      return this._renderUi(Spinbox);
    }
  }, {
    ATTRS: {
      type: {
        value: 'spinbox'
      },
      /*目标元素
      */

      target: {
        value: ''
      },
      defaultConfig: {
        value: {
          cssUrl: ''
        }
      }
    }
  });
  return Number;
}, {
  requires: ['node', './base', 'gallery/spinbox/1.4/']
});

// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/ui/text',function(S, Node, Base, TextBox, TextMagnifier, Limiter) {
  var $, Text;

  $ = Node.all;
  Text = function(config) {
    return Text.superclass.constructor.call(this, config);
  };
  S.extend(Text, Base, {
    /*input元素循环后触发
    */

    _inputEachHandler: function(ev) {
      var $input;

      $input = ev.$el;
      if (!this._isRenderUi($input)) {
        return true;
      }
      this.set('target', $input);
      return this._renderUi();
    },
    _renderUi: function() {
      var $input, Cls, cls, config, parent, tagConfigKeys, tagconfig;

      Cls = TextBox.TextBox;
      $input = this.get('target');
      if (!$input.length) {
        return true;
      }
      config = this.get('config');
      parent = $input.parent('').getDOMNode();
      tagConfigKeys = ['number'];
      tagconfig = Base.tagConfig($input, tagConfigKeys);
      S.mix(config, tagconfig);
      if (config.number) {
        Cls = TextBox.NumberTextBox;
      }
      cls = new Cls(parent, config);
      cls.render();
      this._renderTextMagnifier();
      this._renderLimiter();
      return cls;
    },
    /*
    实例化文本放大镜，data-magnifier="true"时才实例化
       * @return {TextMagnifier}
    */

    _renderTextMagnifier: function() {
      var $input, cls, config;

      $input = this.get('target');
      if (!this.isUseUi('magnifier')) {
        return true;
      }
      config = this.get('config');
      cls = new TextMagnifier($input, config);
      cls.render();
      return cls;
    },
    /*
    实例化数字统计器，data-limiter="true"时才实例化
       * @return {Limiter}
    */

    _renderLimiter: function() {
      var $input, ac, config, limiter;

      $input = this.get('target');
      if (!this.isUseUi('limiter')) {
        return true;
      }
      ac = ['max', 'wrapper', 'isCut', 'isEnToCn', 'isRejectTag', 'defaultTpl', 'exceedTpl'];
      ac = S.map(ac, function(c) {
        return "limiter-" + c;
      });
      config = Base.tagConfig($input, ac, 'limiter-');
      limiter = new Limiter($input, config);
      return limiter.render();
    }
  }, {
    ATTRS: {
      type: {
        value: 'text'
      }
    }
  });
  return Text;
}, {
  requires: ['node', './base', 'gallery/textbox/1.4/', 'gallery/textMagnifier/1.1/', 'gallery/limiter/1.4/']
});

// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/ui/uploader',function(S, Node, Base, AliUploader, ImageUploader) {
  var $, UploaderUi;

  $ = Node.all;
  UploaderUi = function(config) {
    return UploaderUi.superclass.constructor.call(this, config);
  };
  S.extend(UploaderUi, Base, {
    /*input元素循环后触发
    */

    _inputEachHandler: function(ev) {
      var $input;

      $input = ev.$el;
      if (!this._isRenderUi($input)) {
        return true;
      }
      this.set('target', $input);
      return this._renderUi(AliUploader);
    },
    _renderUi: function(Uploader) {
      var $input, config, plugins, tagConfigKeys, tagconfig, uploader;

      $input = this.get('target');
      config = this.get('config');
      tagConfigKeys = ['restore', 'urlsHook', 'queueHook', 'useName', 'ali'];
      tagconfig = Base.tagConfig($input, tagConfigKeys);
      S.mix(config, tagconfig);
      Uploader = AliUploader.Uploader;
      if (config.ali) {
        Uploader = AliUploader;
      }
      uploader = new Uploader($input, config);
      uploader.theme(new ImageUploader({
        queueTarget: config.queueHook || ''
      }));
      plugins = Uploader.plugins;
      if (!config.plugins) {
        uploader.plug(new plugins.Auth());
        uploader.plug(new plugins.UrlsInput({
          target: config.urlsHook || '',
          useName: config.useName || false
        }));
        uploader.plug(new plugins.ProBars());
        uploader.plug(new plugins.TagConfig());
      }
      if (config.restore) {
        uploader.restore(config.restore);
      }
      return this.set('ui', uploader);
    }
  }, {
    ATTRS: {
      type: {
        value: 'file'
      },
      /*目标元素
      */

      target: {
        value: ''
      }
    }
  });
  return UploaderUi;
}, {
  requires: ['node', './base', 'gallery/uploader/1.5/aliUploader', 'gallery/uploader/1.5/themes/grayUploader/index', 'gallery/uploader/1.5/themes/grayUploader/style.css']
});

// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/auth',function(S, Node, Auth) {
  var $, BfAuth;

  $ = Node.all;
  BfAuth = function(config) {
    BfAuth.superclass.constructor.call(this, '', config);
    return this.set('config', config);
  };
  S.extend(BfAuth, Auth, {
    /*插件初始化
    */

    pluginInitializer: function(host) {
      this.set('host', host);
      host.on('inputEach', this._EachHandler, this);
      host.on('selectEach', this._EachHandler, this);
      return host.on('textareaEach', this._EachHandler, this);
    },
    _EachHandler: function(ev) {
      var $el, field, name;

      $el = ev.$el;
      name = this.getName($el);
      field = this.getField(name);
      if (!field) {
        return this.add($el);
      }
    }
  }, {
    ATTRS: {
      /*插件id
      */

      pluginId: {
        value: 'auth'
      },
      /*目标元素
      */

      target: {
        value: '',
        getter: function(v) {
          return $(v);
        }
      },
      /*宿主实例（一般为Butterfly实例）
      */

      host: {
        value: ''
      }
    }
  });
  return BfAuth;
}, {
  requires: ['node', 'gallery/auth/1.5/']
});

// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/bidi',function(S, Node, Base) {
  var $, Bidi, isTag;

  $ = Node.all;
  /*是否是逻辑需要的tag名称
  */

  isTag = function($el, tagName) {
    var elTagName;

    if (!$el || !$el.length) {
      return false;
    }
    elTagName = $el.getDOMNode().tagName;
    return elTagName === tagName;
  };
  Bidi = function(config) {
    Bidi.superclass.constructor.call(this, config);
    return this.set('config', config);
  };
  S.extend(Bidi, Base, {
    /*插件初始化
    */

    pluginInitializer: function(host) {
      var bidi, model;

      this.set('host', host);
      bidi = this.get('bidi');
      if (!bidi) {
        return false;
      }
      model = bidi.model;
      return model.on("render:linkage", function(ev) {
        var $el, ui;

        $el = ev.el;
        if (isTag($el, 'SELECT')) {
          ui = $el.data('data-ui');
          if (ui) {
            if (S.isFunction(ui.sync)) {
              return ui.sync();
            }
          }
        }
      });
    }
  }, {
    ATTRS: {
      /*插件id
      */

      pluginId: {
        value: 'bidi'
      },
      /*bidi的实例
      */

      bidi: {
        value: ''
      },
      /*目标元素
      */

      target: {
        value: '',
        getter: function(v) {
          return $(v);
        }
      },
      /*宿主实例（一般为Butterfly实例）
      */

      host: {
        value: ''
      }
    }
  });
  return Bidi;
}, {
  requires: ['node', 'base']
});

// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/plugins',function(S, Base, Checkbox, Radio, Select, Spinbox, Text, Textatea, Uploader, Auth, Bidi) {
  return {
    Base: Base,
    Checkbox: Checkbox,
    Radio: Radio,
    Select: Select,
    Spinbox: Spinbox,
    Text: Text,
    Textatea: Textatea,
    Uploader: Uploader,
    Auth: Auth,
    Bidi: Bidi
  };
}, {
  requires: ['./ui/base', './ui/checkbox', './ui/radio', './ui/select', './ui/spinbox', './ui/text', './ui/textatea', './ui/uploader', './auth', './bidi']
});

