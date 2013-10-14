/*! butterfly - v1.4 - 2013-10-14 6:53:45 PM
* Copyright (c) 2013 明河; Licensed  */
KISSY.add("gallery/butterfly/1.4/plugin/ui/base",function(a,b,c){var d,e,f,g;return d=b.all,f="true",e="data-",g=function(b){return g.superclass.constructor.call(this,b),this.set("_guid","bf-"+a.guid()),this.set("config",b)},a.mix(g,{tagConfig:function(b,c,d){var f;return f={},b.length?a.isArray(c)?(a.each(c,function(a){var c;return c=b.attr(e+a),c?(d&&(a=a.replace(d,"")),"true"===c&&(c=!0),"false"===c&&(c=!1),f[a]=c):void 0}),f):f:f}}),a.extend(g,c,{pluginInitializer:function(a){return this.set("host",a),a.on("inputEach",this._inputEachHandler,this)},_appendToHost:function(a){var b,c,d;return(b=this.get("host"))?(d=b.get("uis"))?(c=this.get("name"),a=a||this.get("ui"),d[c]||(d[c]=a,b.set("uis",d)),this):!1:!1},_isRenderUi:function(a){var b,c;return b=!1,a.length?(c=a.attr("type")||a.attr("data-type"),b=c===this.get("type"),b&&!this._isExist()&&!this._isNoRender(a)):b},_isExist:function(){var b,c,d;return(b=this.get("host"))?(d=b.get("uis"),c=this.get("name"),a.isObject(d[c])):!1},_isNoRender:function(a){var b;return b=a.attr(e+"no-render"),b?!0:!1},_renderUi:function(a){var b,c,d;return b=this.get("target"),d=this.get("config"),c=new a(b,d),c.render&&c.render(),this.set("ui",c),c},isUseUi:function(a,b){var c;return b=b||this.get("target"),b.length?(c=b.attr(e+a),c===f):!1}},{ATTRS:{pluginId:{value:""},target:{value:"",getter:function(a){return d(a)}},name:{value:"",getter:function(a){var b;return b=this.get("target"),a=b.attr("name")||this.get("_guid")}},ui:{value:"",setter:function(b){var c;return a.isObject(b)?(c=this.get("target"),c.data("data-ui",b),this._appendToHost(b),b):b}},type:{value:""},host:{value:""},defaultConfig:{value:{}},config:{value:{},getter:function(b){var c;return c=this.get("defaultConfig"),a.merge(c,b)}},_guid:{value:""}}}),g},{requires:["node","base"]}),KISSY.add("gallery/butterfly/1.4/plugin/ui/radio",function(a,b,c,d){var e,f;return e=b.all,f=function(a){return f.superclass.constructor.call(this,a)},a.extend(f,c,{_inputEachHandler:function(a){var b;return b=a.$el,this.set("target",b),this._isRenderUi(b)?this._renderUi(d):!0}},{ATTRS:{type:{value:"radio"},target:{value:"",setter:function(a){var b,c,d;return b=e(a),d=b.attr("name"),d?b=e(document.getElementsByName(d)):(c=b.attr("data-field"),c&&(b=e(c))),b}},defaultConfig:{value:{cssUrl:""}}}}),f},{requires:["node","./base","gallery/radio/1.4/"]}),KISSY.add("gallery/butterfly/1.4/plugin/ui/checkbox",function(a,b,c,d){var e,f;return e=b.all,f=function(a){return f.superclass.constructor.call(this,a)},a.extend(f,c,{_inputEachHandler:function(a){var b;return b=a.$el,this._isRenderUi(b)?(this.set("target",b),this._renderUi(d)):!0}},{ATTRS:{type:{value:"checkbox"},defaultConfig:{value:{cssUrl:""}}}}),f},{requires:["node","./radio","gallery/checkbox/1.4/"]}),KISSY.add("gallery/butterfly/1.4/plugin/ui/select",function(a,b,c){var d;return d=function(a){return d.superclass.constructor.call(this,a)},a.extend(d,b,{pluginInitializer:function(a){return this.set("host",a),a.on("selectEach",this._selectEachHandler,this)},_selectEachHandler:function(a){var b,d,e;return b=a.$el,this._isRenderUi(b)?(this.set("target",b),d="none"!==b.css("display"),e=this._renderUi(c),d?void 0:e.hide()):!0}},{ATTRS:{type:{value:"select"}}}),d},{requires:["./base","gallery/select/1.4/"]}),KISSY.add("gallery/butterfly/1.4/plugin/ui/spinbox",function(a,b,c,d){var e,f;return e=b.all,f=function(a){return f.superclass.constructor.call(this,a)},a.extend(f,c,{_inputEachHandler:function(a){var b;return b=a.$el,this._isRenderUi(b)?(this.set("target",b),this._renderUi(d)):!0}},{ATTRS:{type:{value:"spinbox"},target:{value:""},defaultConfig:{value:{cssUrl:""}}}}),f},{requires:["node","./base","gallery/spinbox/1.4/"]}),KISSY.add("gallery/butterfly/1.4/plugin/ui/text",function(a,b,c,d,e,f){var g,h;return g=b.all,h=function(a){return h.superclass.constructor.call(this,a)},a.extend(h,c,{_inputEachHandler:function(a){var b;return b=a.$el,this._isRenderUi(b)?(this.set("target",b),this._renderUi()):!0},_renderUi:function(){var b,e,f,g,h,i,j;return e=d.TextBox,b=this.get("target"),b.length?(g=this.get("config"),h=b.parent("").getDOMNode(),i=["number"],j=c.tagConfig(b,i),a.mix(g,j),g.number&&(e=d.NumberTextBox),f=new e(h,g),f.render(),this._renderTextMagnifier(),this._renderLimiter(),f):!0},_renderTextMagnifier:function(){var a,b,c;return a=this.get("target"),this.isUseUi("magnifier")?(c=this.get("config"),b=new e(a,c),b.render(),b):!0},_renderLimiter:function(){var b,d,e,g;return b=this.get("target"),this.isUseUi("limiter")?(d=["max","wrapper","isCut","isEnToCn","isRejectTag","defaultTpl","exceedTpl"],d=a.map(d,function(a){return"limiter-"+a}),e=c.tagConfig(b,d,"limiter-"),g=new f(b,e),g.render()):!0}},{ATTRS:{type:{value:"text"}}}),h},{requires:["node","./base","gallery/textbox/1.4/","gallery/textMagnifier/1.1/","gallery/limiter/1.4/"]}),KISSY.add("gallery/butterfly/1.4/plugin/ui/textarea",function(a,b,c){var d,e;return d=b.all,e=function(a){return e.superclass.constructor.call(this,a)},a.extend(e,c,{pluginInitializer:function(a){return this.set("host",a),a.on("textareaEach",this._textareaEachHandler,this)},_textareaEachHandler:function(a){var b;return b=a.$el,this.set("target",b),this._isRenderUi(b)?this._renderLimiter():!1}},{ATTRS:{type:{value:"textarea"}}}),e},{requires:["node","./text"]}),KISSY.add("gallery/butterfly/1.4/plugin/ui/uploader",function(a,b,c,d,e){var f,g;return f=b.all,g=function(a){return g.superclass.constructor.call(this,a)},a.extend(g,c,{_inputEachHandler:function(a){var b;return b=a.$el,this._isRenderUi(b)?(this.set("target",b),this._renderUi(d)):!0},_renderUi:function(b){var f,g,h,i,j,k;return f=this.get("target"),g=this.get("config"),i=["restore","urlsHook","queueHook","useName","ali"],j=c.tagConfig(f,i),a.mix(g,j),b=d.Uploader,g.ali&&(b=d),k=new b(f,g),k.theme(new e({queueTarget:g.queueHook||""})),h=b.plugins,g.plugins||(k.plug(new h.Auth),k.plug(new h.UrlsInput({target:g.urlsHook||"",useName:g.useName||!1})),k.plug(new h.ProBars),k.plug(new h.TagConfig),k.plug(new h.ImageZoom)),g.restore&&k.restore(g.restore),this.set("ui",k)}},{ATTRS:{type:{value:"file"},target:{value:""}}}),g},{requires:["node","./base","gallery/uploader/1.5/aliUploader","gallery/uploader/1.5/themes/grayUploader/index","gallery/uploader/1.5/themes/grayUploader/style.css"]}),KISSY.add("gallery/butterfly/1.4/plugin/auth",function(a,b,c){var d,e;return d=b.all,e=function(a){return e.superclass.constructor.call(this,"",a),this.set("config",a)},a.extend(e,c,{pluginInitializer:function(a){return this.set("host",a),a.on("inputEach",this._EachHandler,this),a.on("selectEach",this._EachHandler,this),a.on("textareaEach",this._EachHandler,this)},_EachHandler:function(a){var b,c,d;return b=a.$el,d=this.getName(b),c=this.getField(d),c?void 0:this.add(b)}},{ATTRS:{pluginId:{value:"auth"},target:{value:"",getter:function(a){return d(a)}},host:{value:""}}}),e},{requires:["node","gallery/auth/1.5/"]}),KISSY.add("gallery/butterfly/1.4/plugin/bidi",function(a,b,c){var d,e,f;return d=b.all,f=function(a,b){var c;return a&&a.length?(c=a.getDOMNode().tagName,c===b):!1},e=function(a){return e.superclass.constructor.call(this,a),this.set("config",a)},a.extend(e,c,{pluginInitializer:function(b){var c,d;return this.set("host",b),(c=this.get("bidi"))?(d=c.model,d.on("render:linkage",function(b){var c,d;return c=b.el,f(c,"SELECT")&&(d=c.data("data-ui"),d&&a.isFunction(d.sync))?d.sync():void 0})):!1}},{ATTRS:{pluginId:{value:"bidi"},bidi:{value:""},target:{value:"",getter:function(a){return d(a)}},host:{value:""}}}),e},{requires:["node","base"]}),KISSY.add("gallery/butterfly/1.4/plugin/plugins",function(a,b,c,d,e,f,g,h,i,j,k){return{Base:b,Checkbox:c,Radio:d,Select:e,Spinbox:f,Text:g,Textarea:h,Uploader:i,Auth:j,Bidi:k}},{requires:["./ui/base","./ui/checkbox","./ui/radio","./ui/select","./ui/spinbox","./ui/text","./ui/textarea","./ui/uploader","./auth","./bidi"]});