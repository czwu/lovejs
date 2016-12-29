import msg from './message'
import {isDate, isArray} from 'lodash'
let deep_level = 0;

export default {
    //递归深度统计，进入方法，深度++， 放在方法开始处执行，入达到限制，发送通知抛出异常
    assertLevelIn : function () {
        deep_level++;
        if (deep_level == 100){
            msg.send("LOVE-ERROR","递归达到限定值，避免死循环！")
        }
    },
    //递归深度统计，退出方法，深度--， 放在方法末尾调用
    assertLevelOut : function () {
        deep_level--;
    },
    
    //深度对象复制
    copy : function (target, source) {
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
    }
}