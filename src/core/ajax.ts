import { isFunction, isObject, defaultsDeep } from 'lodash'
import utils from './utils'


class Ajax {
    // 用于统计当前激活的请求数量
    active: 0;

    // Last-Modified header cache for next request
    lastModified: {};

    ajaxSettings: any = {};

    getXHR() {
        return (<any>window).XMLHttpRequest();
    }

    ajaxSetup(target, settings): any {
        return settings ?
            // Building a settings object
            utils.copy(defaultsDeep(target, this.ajaxSettings), settings) :
            // Extending ajaxSettings
            utils.copy(this.ajaxSettings, target);
    }

    ajax(url, options?) {

        //方法重载,如果url为对象,则将url当做ajax配置对象处理
        if (typeof url === "object") {
            options = url;
            url = undefined;
        }
        // 避免option为空
        options = options || {};

      
    }

    private send(url, data, callback, type, method) {
        let options = {
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        }
        return this.ajax(Object.assign( options,  isObject(url) && url)   );
    }

    get(url, data, callback, type) {
        return this.send(url, data, callback, type, "get")
    }

    post(url, data, callback, type) {
        return this.send(url, data, callback, type, "post")
    }

    put(url, data, callback, type) {
        return this.send(url, data, callback, type, "put")
    }

    delete(url, data, callback, type) {
        return this.send(url, data, callback, type, "delete")
    }
}