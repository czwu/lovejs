import View from '../view'
import utils from '../../core/utils'
import domTools from '../domTools'


const ButtonTypes = new Map<String, any>();
/**
 * Button 组件
 * 使用说明: tempate参数中,描述你构建的html结构代码
 * {view:"Label", Label:"User Name"}
 */
class Button extends View {

    css = "button";

    defaults: any = {
        type: "normal",
        label: ""
    }
    constructor(config) {
        super(config)
    }

    render() {
        super.render();
        let bodyHtml: string,
            template: any = this.config.template || ButtonTypes.get(this.config.type).template;
        //判断参数类型,如果是方法模板,则传入配置对象,并执行; 否则当做字符串模板处理,通过compile解析
        if (typeof template == 'function') {
            bodyHtml = template(this.config);
        } else {
            bodyHtml = utils.compile(template, this.config)
        }
        //将生成的内容放入本身的view容器中
        this.dom.innerHTML = bodyHtml;
        this.bindEvents();

    }

    bindEvents() {
        domTools.bindEvent(this.dom, "click", () => {
            // this.hooks.emit("click")
            if (this.config.click) {
                this.config.click.call(null, this);
            }
        })
    }

}

ButtonTypes.set("normal", {
    template: "<button class='icon-${context.icon}'>${context.label}</button>"
});


Button.register("button");