import msg, { Message } from './core/message'
import love from './core/context'
import utils from './core/utils'
import Component from './ui/component'
import './ui/layout'
import './ui/basic/button'
import './ui/basic/label'
import './ui/basic/text'
import './core/logger'
import './style/loveui'
import './style/designer'
msg.listen("message.test", function (name) {
    console.log(`${name} i am ok!`)
})
msg.send("message.test", "czw");

let uiConfig = {
    view: "layout",//视图类型 [Layout, Table, Tree, Tab 等等]
    width: 0, // 宽度,  默认填充 100%,
    border: 1, //边框
    css: "", //生成样式名称,
    contianer: "app",
    autoSize: true,
    elements: [
        {
            view: "layout",
            css: "header",
            height: 50, //高度
        },
        {
            css: "body",
            view: "layout",
            type: "cols",
            elements: [
                {
                    view: "layout",
                    css: "left-content",
                    width: 250,
                    elements: [
                        {
                            view: "template",
                            template: "widgets",
                            height: 25
                        }
                    ]
                },
                {
                    view: "layout",
                    elements: [
                        {
                            view:"button",
                            label:"button1"
                        }
                    ]
                }
            ]
        }
    ]
}
love.ui(uiConfig, "app");
