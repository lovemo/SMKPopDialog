# SMKPopDialog
a awesome coustom js pop dialog

---

![image](https://github.com/lovemo/SMKPopDialog/raw/master/demo.gif)

### usage

```js
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
