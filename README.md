# SMKPopDialog
a awesome coustom js pop dialog

---

![image](https://github.com/lovemo/SMKPopDialog/raw/master/demo.gif)

### usage

```js
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
    var pop = SMKPopDialog.init({
        bgImage: './images/share.png',
        bgClick: function() {
            console.log('bg click ...')
        },
        msg: {
            text   : '标题标题标题标题标题标题',
            offest : 60,
            fontSize: 15,
            color: 'red'
        },
        container: {
            html: '<button class="pop-dialog-bottom-button pop-dialog-bottom-button—left">确定</button>' + 
                  '<button class="pop-dialog-bottom-button pop-dialog-bottom-button—right">取消</button>'
        },
        close: {
            offset: 'b-100,c',
            image: './images/close.png',
            width: 50,
            callback: function() {
                console.log('close ...')
            }
        }
      
    })

    $('button').click(function() {
        pop.show()
    })

    $('.pop-dialog-bottom-button—left').click(function() {
        console.log('click left button')
    })

    $('.pop-dialog-bottom-button—right').click(function() {
        console.log('click right button')
    })
```
