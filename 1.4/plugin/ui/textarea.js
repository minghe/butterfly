// Generated by CoffeeScript 1.6.2
KISSY.add(function(S, Node, Text) {
  var $, Textarea;

  $ = Node.all;
  Textarea = function(config) {
    return Textarea.superclass.constructor.call(this, config);
  };
  S.extend(Textarea, Text, {
    /*插件初始化
    */

    pluginInitializer: function(host) {
      this.set('host', host);
      return host.on('textareaEach', this._textareaEachHandler, this);
    },
    /*textarea元素循环后触发
    */

    _textareaEachHandler: function(ev) {
      var $el;

      $el = ev.$el;
      this.set('target', $el);
      if (!this._isRenderUi($el)) {
        return false;
      }
      return this._renderLimiter();
    }
  }, {
    ATTRS: {
      type: {
        value: 'textarea'
      }
    }
  });
  return Textarea;
}, {
  requires: ['node', './text']
});
