import msg from './message'
import { isDate, isArray,defaults } from 'lodash'
let deep_level = 0;
let IdPrefix = {};
let prefixIndex = 0;
export default {

    setPrefixIndex:function(index:number){
        prefixIndex = index;
    },

    //递归深度统计，进入方法，深度++， 放在方法开始处执行，入达到限制，发送通知抛出异常
    assertLevelIn: function () {
        deep_level++;
        if (deep_level == 100) {
            msg.send("LOVE-ERROR", "递归达到限定值，避免死循环！")
        }
    },
    //递归深度统计，退出方法，深度--， 放在方法末尾调用
    assertLevelOut: function () {
        deep_level--;
    },

    //深度对象复制
    copy: function (target, source) {
        this.assertLevelIn();
        for (let attr in source) {
            var from = source[attr];
            if (from && typeof from == "object") {
                if (!isDate(from)) {
                    target[attr] = (isArray(from) ? [] : {});
                    this.copy(target[attr], from);
                } else
                    target[attr] = new Date(from);
            } else {
                target[attr] = from;
            }
        }
        this.assertLevelOut();
        return target;
    },

    //根据前缀生成唯一ID值
    genId(prefix: string = "ID") {
        IdPrefix[prefix] = (IdPrefix[prefix] || prefixIndex) + 1;
        return `${prefix}${IdPrefix[prefix]}`;
    },

    find(viewId) {
        return this.components[viewId];
    },

    compile(templete, context) : string{
        let fn = typeof templete=="function" ? templete : new Function("context","with(context){return `"+templete+"`}");
        return fn(context);
    },

    defaults:defaults

}
