import View from './../view'
import domTools from './../domTools'
class Text extends View {

	css = "text"

	defaults: any = {

		// width: 100,  //宽度
		// height :20, //高度
		// icon : ""  //图标
	};

	constructor(config) {
		super(config);
	};

	render() {
		super.render();
		let textNode = domTools.create("input", { type: "text" });
		this.dom.appendChild(textNode)
	};


}

Text.register("text");
export default View;



