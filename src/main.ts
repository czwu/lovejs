import msg, {Message,love}  from './core/message'
import Component from './ui/component'
import  './ui/layout'
import './core/logger'
import './style/loveui'
msg.listen("message.test",function(name){
   console.log(`${name} i am ok!`)
})
msg.send("message.test","czw");

let uiConfig = {
    view : "layout",//视图类型 [Layout, Table, Tree, Tab 等等]
    width:0, // 宽度,  默认填充 100%,
    height:0, //高度
    type:"", //布局方式,
    border:1, //边框
    css:"cssName", //生成样式名称,
    rows:[
    ]
}
love.ui("app", uiConfig);
