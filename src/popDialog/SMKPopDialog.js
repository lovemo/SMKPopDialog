(function SMKPopDialog(global, factory) {

    global.SMKPopDialog = factory();

}(this, function(){

    var dialog = {

        /**
         * 初始化配置
         */
        _options: null,

        /**
         * 初始化
         * options.bgColor 背景色
         * options.width   宽度
         * options.height  高度
         * options.bgImage 背景图片
         * options.bgClick 背景点击
         * options.msg.text 弹框文字
         * options.msg.fontSize 弹框文字大小
         * options.msg.color    弹框文字颜色
         * options.close.width  关闭宽度
         * options.close.height 关闭高度
         * options.close.image  关闭图片
         * options.close.offset 关闭位置 lt:左上 lb:左下 rt:右上 rb:右下 tc:上中 bc:底中  l+/-x,t+/-x偏移位置
         */
        init: function (options) {
            var self = this;
            self._options = options
            return self;
        },

        /**
         * 显示
         */
        show: function() {
            var dialog = $('#pop-dialog-container')
            if (dialog.length <= 0) {
                this._renderContainer()
                this._renderDialog()
                if (this._options.close) this._renderClose()
                if (this._options.msg) this._renderMsg()
                if (this._options.container) this._renderBottom()
                this._layout()
                $('#pop-dialog-container #pop-dialog').stop().animate({
                    'opacity': 1.0
                })
                this._event()
            } else {
                dialog.show()
                $('#pop-dialog-container #pop-dialog').stop().animate({
                    'opacity': 1.0
                })
            }
        },

        /**
         * 隐藏
         */
        hide: function() {
            $('#pop-dialog-container').hide()
            $('#pop-dialog-container #pop-dialog').stop().animate({
                'opacity': 0
            })
        },

        /**
         * 渲染容器
         */
        _renderContainer: function() {
            var self = this;

            var html = ''
            html += '<div id="pop-dialog-container">'
                html += '<div id="pop-dialog">'
                    html += '<div id="pop-dialog-msg">'
                    html += '</div>'
                    html += '<div id="pop-dialog-close">'
                    html += '</div>'
                    html += '<div id="pop-dialog-bottom">'
                    html += '</div>'
                html += '</div>'
            html += '</div>'
            $('body').append(html)

            var pop_dialog_container_css = {}
            pop_dialog_container_css['background-color'] = self._options.bgColor
            pop_dialog_container_css['height']           = Math.max($(document).outerHeight(true), $(document).height())
       
            $('#pop-dialog-container').css(pop_dialog_container_css)
        },

        /**
         * 渲染弹出框
         */
        _renderDialog: function() {
            var self = this;
            var pop_dialog_css = {}

            pop_dialog_css['width'] = self._options.width ? self._options.width : $('#pop-dialog-container #pop-dialog').width()
            pop_dialog_css['height'] = self._options.height ? self._options.height : $('#pop-dialog-container #pop-dialog').height()
    
            if (self._options && self._options.bgImage) {
                pop_dialog_css['background']      = 'url("'+ self._options.bgImage +'") no-repeat'
                pop_dialog_css['background-size'] = '100%'

                self._imageSize(self._options.bgImage, function(w, h) {
                    pop_dialog_css['height']      = h / w * pop_dialog_css['width']
                    pop_dialog_css['top']         = ($(window).height()- pop_dialog_css['height']) * 0.5 + 'px'
                    console.log(pop_dialog_css)
                    $('#pop-dialog-container #pop-dialog').css(pop_dialog_css)
                })
            } else {
                $('#pop-dialog-container #pop-dialog').css(pop_dialog_css)
            }
        },

        /**
         * 渲染消息
         */
        _renderMsg: function() {
            var msg = $('#pop-dialog #pop-dialog-msg')
            msg.html(this._options.msg.text)
            msg.css({
                'font-size': this._options.msg.fontSize,
                'color': this._options.msg.color
            })
        },

        /**
         * 渲染关闭
         */
        _renderClose: function() {
            var self = this
            var pop_dialog_close_css = {}
            pop_dialog_close_css['width']  = self._options.close.width ? self._options.close.width : $('#pop-dialog #pop-dialog-close').width()
            pop_dialog_close_css['height'] = self._options.close.height ? self._options.close.height : $('#pop-dialog #pop-dialog-close').height()
 
            if (self._options && self._options.close.image) {
                 pop_dialog_close_css['background']      = 'url("'+ self._options.close.image +'") no-repeat'
                 pop_dialog_close_css['background-size'] = '100%'
                
                 self._imageSize(self._options.close.image, function(w, h) {
                     pop_dialog_close_css['height'] = h / w * pop_dialog_close_css['width']
                     $('#pop-dialog #pop-dialog-close').css(pop_dialog_close_css)
                 }) 
             } else {
                 $('#pop-dialog #pop-dialog-close').css(pop_dialog_close_css)
            }
        },

        /**
         * 渲染底部
         */
        _renderBottom: function() {
            $('#pop-dialog #pop-dialog-bottom').html(this._options.container.html)
        },

        /**
         * 布局UI
         */
        _layout: function() {
           var self = this;
           var values = self._options.close.offset.split(',')
           if (values.length != 2) {
                return
           }

           var condition = ''

           var left_adds = right_adds = left_subs = right_subs = []
           var left_value = right_value = 0;

           // 处理左部分偏移配置
           if (values[0].indexOf('+') != -1) {
                left_adds = values[0].split('+')
                left_value = '+' + left_adds[1] + 'px'
                condition += left_adds[0] 
           } 
           if (values[0].indexOf('-') != -1) {
                left_subs = values[0].split('-')
                left_value = '-' + left_subs[1] + 'px'
                condition += left_subs[0] 
            } 
            if (left_adds.length == 0 && left_subs.length == 0) {
                condition += values[0]
            }
    
            // 处理右部分偏移配置
            if (values[1].indexOf('+') != -1) {
                right_adds = values[1].split('+')
                right_value = '+' + right_adds[1] + 'px'
                condition += right_adds[0] 
            } 
            if (values[1].indexOf('-') != -1) {
                right_subs = values[1].split('-')
                right_value = '-' + right_subs[1] + 'px'
                condition += right_subs[0] 
            } 
            if (right_adds.length == 0 && right_subs.length == 0) {
                condition += values[1]
            }

           var pop_dialog_close_css = {}
           switch (condition) {
                case 'lt':
                    pop_dialog_close_css['left'] = left_value
                    pop_dialog_close_css['top'] = right_value
                   break;
                case 'lb':
                    pop_dialog_close_css['left'] = left_value
                    pop_dialog_close_css['bottom'] = right_value
                    break;
                case 'rt':
                    pop_dialog_close_css['right'] = left_value
                    pop_dialog_close_css['top'] = right_value
                    break;
                case 'rb':
                    pop_dialog_close_css['right'] = left_value
                    pop_dialog_close_css['bottom'] = right_value
                    break;
                case 'tc':
                    pop_dialog_close_css['left'] = 0
                    pop_dialog_close_css['right'] = 0
                    pop_dialog_close_css['top'] = left_value
                    pop_dialog_close_css['margin'] = 'auto'
                    break;
                case 'bc':
                    pop_dialog_close_css['left'] = 0
                    pop_dialog_close_css['right'] = 0
                    pop_dialog_close_css['bottom'] = left_value
                    pop_dialog_close_css['margin'] = 'auto'
                    break;
           
                default:
                   break;
           }

           $('#pop-dialog #pop-dialog-close').css(pop_dialog_close_css)

           if (self._options.msg && self._options.msg.offest) {
                $('#pop-dialog #pop-dialog-msg').css({
                    'top': self._options.msg.offest
                })
           }
        },

        /**
         * 事件
         */
        _event: function() {
            var self = this
            $('#pop-dialog #pop-dialog-close').click(function() {
                self.hide()
                if (typeof self._options.close.callback === "function") {
                    self._options.close.callback()
                }
            })

            $('#pop-dialog-container').click(function() {
                if (typeof self._options.bgClick === "function") {
                    self._options.bgClick()
                }
            })
        },

        /**
         * 获取图片原图大小
         */
        _imageSize: function(url,callback){
            var img = new Image();
	        img.src = url;
            // 如果图片被缓存，则直接返回缓存数据
            if (img.complete) {
                callback(img.width, img.height);
                img = null
            } else {
                // 完全加载完毕的事件
                img.onload = function() {
                    callback(img.width, img.height);
                    img = null
                }
            }
        }

    }

    return dialog;
}));

'function' == typeof define ? define(function() {
    return dialog;
  }) : function(){
    
    var js = document.scripts, script = js[js.length - 1], jsPath = script.src;
    var path = jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
    
    // 如果合并方式，则需要单独引入pop-dialog.css
    if(script.getAttribute('merge')) return; 
    
    document.head.appendChild(function(){
      var link = document.createElement('link');
      link.href = path + 'need/pop-dialog.css';
      link.type = 'text/css';
      link.rel = 'styleSheet'
      link.id = 'layermcss';
      return link;
    }());
    
  }();
  