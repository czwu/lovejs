
const html = {
	create: function (name, attrs, html?) {
		attrs = attrs || {};
		var node = document.createElement(name);
		for (var attr_name in attrs)
			node.setAttribute(attr_name, attrs[attr_name]);
		if (attrs.style)
			node.style.cssText = attrs.style;
		if (attrs["class"])
			node.className = attrs["class"];
		if (html)
			node.innerHTML = html;
		return node;
	},

	offset: {

	},


	bindEvent(target: HTMLElement, eventType: string, callback, context?: any) {
		context = context || {};
		if (target.addEventListener) {
			target.addEventListener(eventType, callback, !!context.capture);
		} 
	}


};
export default html;