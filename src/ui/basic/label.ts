import View from '../view'


/**
 * label 组件
 * 使用说明: tempate参数中,描述你构建的html结构代码
 * {view:"Label", Label:"User Name"}
 */
class Label extends View {
    render() {
        let label = this.config.label;
        this.dom.html(`<label>${label}</label>`);
    }
}
Label.register("label");