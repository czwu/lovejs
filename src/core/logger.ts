import msg from './message'
import {MSG} from './constant'

const logger = {
    type: {
        debug: 10,
        info: 20,
        warn: 30,
        error: 40,
        alert: 50
    },

    log(...args) {
        if (args[0] && this.type[args[0]]) {
             console[args[0]].apply(console, args)
        } else {
             console.log.apply(console, args);
        }
    }
}

//特殊消息，内部KEY值， 接收到 LOVE-LOG 的消息，将输出日志
msg.listen(MSG.SYSTEM_LOG, function (...args) {
    logger.log.apply(logger, args)
})

//特殊消息，内部KEY值， 接收到 LOVE-ERROR 的消息，将抛出异常
msg.listen(MSG.SYSTEM_ERROR, function (errorMsg) {
    throw new Error(errorMsg);
})

export default logger;