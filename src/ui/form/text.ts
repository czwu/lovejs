import View from './../view'
import html from './../html'
class Text extends View {

	name : string = "text";

	defaults: any = {

		// width: 100,  //宽度
		// height :20, //高度
        // icon : ""  //图标
		_css: "text"
	};

	constructor(config) {
		super(config);
	};


	$render() {
		super.$render();
		let textNode = html.create("input", { type: "text" });
		this.dom.appendChild(textNode)
	};




}

Text.UIReg("text", Text);
export default View;