/*! butterfly - v1.4 - 2013-09-24 5:39:25 PM
* Copyright (c) 2013 明河; Licensed  */
KISSY.add("gallery/butterfly/1.4/plugin/auth",function(a,b,c){var d,e;return d=b.all,e=function(a){return e.superclass.constructor.call(this,"",a),this.set("config",a)},a.extend(e,c,{pluginInitializer:function(a){return this.set("host",a),a.on("inputEach",this._EachHandler,this),a.on("selectEach",this._EachHandler,this),a.on("textareaEach",this._EachHandler,this)},_EachHandler:function(a){var b,c,d;return b=a.$el,d=this.getName(b),c=this.getField(d),c?void 0:this.add(b)}},{ATTRS:{pluginId:{value:"auth"},target:{value:"",getter:function(a){return d(a)}},host:{value:""}}}),e},{requires:["node","gallery/auth/1.5/"]});