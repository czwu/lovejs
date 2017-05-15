import msg, { Message, Hook } from './../core/message'
import { MSG } from '../core/constant'
import { assign, defaults } from 'lodash'
import html from './html'
import config from './../core/config'
import utils from './../core/utils'


class Component {

    // 用于保存应用注册的ui,包含名称 与实现class的引用
    static uiClass = new Map<String, Function>();

    static components =  new Map<String, Object>() ;

    /** UI 注册, 注册之后,才能用于通用渲染中 (通过注册名称找到UI实现类,进行初始化动作)
     * @param  {String} uiName    //ui注册名称
     * @param  {Function} uiClass //ui 实际实现的Class类
     */
    static UIReg(uiName: String, uiClass: Function) {
        this.uiClass.set(uiName, uiClass);
    }

    id: string;

    name: string = "component";

    hooks: Hook;

    parentDom: any;

    inlineStyle:String = "";

    dom: any;

    config: any = {};

    defaults = {
    }


    _initConfig; //保存组件初始化的原始配置引用


    constructor(config) {
        this._initConfig = config;
        this.config = utils.copy({}, config);
        // this.hooks = new Hook("WidgetHook");


    }

    render(){
        this.id = this.config.id || utils.genId(this.name);
        this.config = defaults(this.config, (<any>this).defaults);
        this.$render();
    }

    $beforeRender():any{
        // this.hooks.emit("onBeforeRender", ()=>{
        //     this.$onBeforeRender();
        // })
    }

    $render(): any {
        //缓存初始化的UI
        if (Component.components.get(this.id)) {
            msg.send("LOVE-ERROR", "初始化UI时, 发现 ID 重复异常, ", this)
        } else {
            Component.components.set(this.id, this);
        }
        let conf = this.config;
        this.$beforeRender();
        let cssName = `ui ${conf._css || ''} ${conf.css || ''}`;
        this.dom = html.create("div", { id: this.id, class: cssName, style: this.inlineStyle });
    
    }

    $destructor() {
        

    }

}


export default Component;