import Component from './component'
import html from './html'
class View extends Component {
    defaults: any = {
        _css: "ui-view"
    }


	$beforeRender(){
		let config = this.config;
        config.css = config.css || "";
		if(config.autoSize){
			config.css += ` auto-size`;
		}
		config.css = this.config.css.trim();
		let size = config[config._sizeType]
		this.inlineStyle+=`flex:${size ? 0 : 1} 1 ${size ? size+"px" : "auto"}`
	}


    $render() {
        super.$render();
    }
}

View.UIReg("view", View);
/**
 * html 组件, 如果您所需的实现的功能比较复杂,框架中没有你所想要的组件,你可使用该组件,自己组装您的html代码
 * 使用说明: tempate参数中,描述你构建的html结构代码
 * {view:"tempate", tempalte:"<div>....</div>"}
 */
class Template extends View {
    $render() {
        super.$render();
        this.dom.innerHTML= this.config.template
    }
}
View.UIReg("template", Template);


/**
 * label 组件
 * 使用说明: tempate参数中,描述你构建的html结构代码
 * {view:"Label", Label:"User Name"}
 */
class Label extends View {
    $render() {
        let label = this.config.label;
        this.dom.html(`<label>${label}</label>`);
    }
}
View.UIReg("label", Label);


export default View;