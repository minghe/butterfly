// Generated by CoffeeScript 1.6.2
KISSY.add(function(S, Base, Select) {
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
      var $el, config, isShow, select, tagConfigKeys, tagconfig;

      $el = ev.$el;
      if (!this._isRenderUi($el)) {
        return true;
      }
      this.set('target', $el);
      isShow = $el.css('display') !== 'none';
      config = this.get('config');
      tagConfigKeys = ['width'];
      tagconfig = Base.tagConfig($el, tagConfigKeys);
      S.mix(config, tagconfig);
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
