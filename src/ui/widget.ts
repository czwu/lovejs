import { Message, Hook } from './../core/message'
import config from './../core/config'
import utils from './../core/utils'

class Widget {

    widgetType : string = "widget";

    hook : Hook;

    config = {

    };

    _initConfig; //保存组件初始化的原始配置引用

    constructor(config){
        this._initConfig = config;
        this.hook = new Hook("WidgetHook");
        utils.copy(this.config, config);
    }

    protected init(){


    }
}


export default Widget;