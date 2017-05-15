
//消息类实现
class Message {
    name: string;
    type: string;
    listeners: Map<String, Set<Function>>;
    constructor(name: string) {
        this.name = name;
        this.listeners = new Map()
    }
    //消息发送,找到key值对应的监听器,依次调用,并传递参数
    send(key, ...args) {
        if (key != "LOVE-LOG") {
            message.send("LOVE-LOG", `推送消息： ${key},参数为：`, args)
        }
        if (this.listeners.has(key)) {
            let calls = this.listeners.get(key);
            calls.forEach((fn) => {
                fn(...args);
            });
        }

    }
    /**
     * 建立消息监听器,key为监听的消息类型, callback为监听到消息后的实际动作
     */
    listen(key, callback) {
        message.send("LOVE-LOG", `监听注册： ${key}`)
        if (!this.listeners.has(key)) {
            let set = new Set();
            set.add(callback);
            this.listeners.set(key, set);
        } else {
            this.listeners.get(key).add(callback);
        }
    }


    destructor() {
        this.listeners = null;
    }

}

class Hook extends Message {

    constructor(name: string) {
        super(name);
    }

    on(key, callback) {
        super.listen(key, callback)
    }

    emit(key, ...args) {
        if (this.listeners.has(key)) {
            let calls = this.listeners.get(key);
            let _continue = true;
            calls.forEach((fn) => {
                if (_continue !== false) {
                    _continue = fn(...args);
                }
            });
        }
    }
}
//创建一个消息实例,作为全局消息发送总线
const message = new Message("MESSAGE-BUS");

export default message;
export { Message, Hook };