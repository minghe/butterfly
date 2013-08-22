/*
combined files : 

gallery/butterfly/1.4/plugin/bidi

*/
// Generated by CoffeeScript 1.6.2
KISSY.add('gallery/butterfly/1.4/plugin/bidi',function(S, Node, Base) {
  var $, Bidi, isTag;

  $ = Node.all;
  /*是否是逻辑需要的tag名称
  */

  isTag = function($el, tagName) {
    tagName = $el.getDOMNode().tagName;
    return tagName === tagName;
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
          return ui.sync && ui.sync();
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

