KISSY.add (S,Base,Checkbox,Radio,Select,Spinbox,Text,Textarea,Uploader,Auth,Bidi)->
   return{
      Base:Base
      Checkbox:Checkbox
      Radio:Radio
      Select:Select
      Spinbox:Spinbox
      Text:Text
      Textarea:Textarea
      Uploader:Uploader
      Auth:Auth
      Bidi:Bidi
   }
,
  requires : ['./ui/base','./ui/checkbox','./ui/radio','./ui/select','./ui/spinbox','./ui/text','./ui/textarea','./ui/uploader','./auth','./bidi']