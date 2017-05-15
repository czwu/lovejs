import msg from './message'
import Component from '../ui/component'
export default {

    //消息总线实例,放入love命名空间下,方便定位访问
    msgbus: msg,

    //快捷方法,通过消息总线发送消息
    send(key, ...args) {
        msg.send(key, ...args);
    },
    //快捷方法,监听消息总线的消息
    listen(key, callback) {
        msg.listen(key, callback);
    },

    /** ui渲染
     * @param  {any} uiSetting  渲染的具体配置
     */
    ui( uiSetting: any,containerId: String) {
        let container;
        let view = this.find(containerId);
        if (view) {
            container = view.dom;
        } else {
            container = document.querySelector("#" + containerId);
        }
        let viewName = uiSetting.view || "layout";
        let Klass: any = Component.uiClass.get(viewName);
        let widget = new Klass(uiSetting)
        widget.render();
        container.appendChild(widget.dom);
    },

    find(viewId) {
        return Component.components.get(viewId);
    }
}