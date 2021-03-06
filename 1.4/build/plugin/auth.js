/*
combined files : 

gallery/butterfly/1.4/plugin/auth

*/
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

