import Component from './component'
import msg from '../core/message'
import html from './html'
class Layout extends Component {

	defaults: any = {
		type: "rows", //rows or cols 多行布局 或 多列布局

		// width,  //宽度

		// height, //高度

		//wrap: true, 
		autoSize:false, // 尺寸自适应模式, false:自适应父级大小, true:根据容器内容自适应大小

		_css: "ui-layout ",

		align:"left"//

	};

	constructor(config) {
		super(config);
	};

	$beforeRender(){
	
		let config = this.config;
		config.css = config.css || "";
		config.css += ` layout-${this.config.type}`;
		if(config.autoSize){
			config.css += ` auto-size`;
		}
		config.css = this.config.css.trim();
		let size = config[config._sizeType]
		this.inlineStyle+=`flex:${size ? 0 : 1} 1 ${size ? size+"px" : "auto"}`
	}

	$render() {
		super.$render();
		this.renderElements();
	};

	renderElements() {
		let sizeType = this.config.type == "rows" ?　"height" : "width"
		if (this.config.elements) {
			this.config.elements.forEach((uiSetting) => {
				uiSetting._sizeType = sizeType;
				let viewName = uiSetting.view;
				let Klass: any = Component.uiClass.get(viewName);
				let widget = new Klass(uiSetting)
				widget.render();
				this.dom.appendChild(widget.dom);
			})
		}
	}
	
}
//注册UI类型, 注册之后,才能用于通用渲染中 (通过注册名称找到UI实现类,进行初始化动作)
Layout.UIReg("layout", Layout);

export default Layout;