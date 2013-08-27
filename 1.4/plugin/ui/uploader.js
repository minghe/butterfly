// Generated by CoffeeScript 1.6.2
KISSY.add(function(S, Node, Base, Uploader, Auth, UrlsInput, ProBars, TagConfig, ImageUploader) {
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
      return this._renderUi(Uploader);
    },
    _renderUi: function(Uploader) {
      var $input, config, tagConfigKeys, tagconfig, uploader;

      $input = this.get('target');
      config = this.get('config');
      tagConfigKeys = ['restore'];
      tagconfig = Base.tagConfig($input, tagConfigKeys);
      S.mix(config, tagconfig);
      uploader = new Uploader($input, config);
      uploader.theme(new ImageUploader({
        queueTarget: '#J_UploaderQueue'
      }));
      if (!config.plugins) {
        uploader.plug(new Auth());
        uploader.plug(new UrlsInput({
          target: '#refundImageUrls'
        }));
        uploader.plug(new ProBars());
        uploader.plug(new TagConfig());
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
  requires: ['node', './base', 'gallery/uploader/1.4/', 'gallery/uploader/1.4/plugins/auth/auth', 'gallery/uploader/1.4/plugins/urlsInput/urlsInput', 'gallery/uploader/1.4/plugins/proBars/proBars', 'gallery/uploader/1.4/plugins/tagConfig/tagConfig', 'gallery/uploader/1.4/themes/grayUploader/index', 'gallery/uploader/1.4/themes/grayUploader/style.css']
});
