
//消息类实现
class Message {
    name: string;
    type: string;
    listeners: Map<String, Set<Function>>;
    constructor(name: string) {
        this.name = name;
        this.listeners = new Map()
    }
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

//创建love对象,并将消息总线添加到属性中
let love : any = {
    //消息总线实例,放入love命名空间下,方便定位访问
    msgbus: message,

    //快捷方法,通过消息总线发送消息
    send(key, ...args) {
        message.send(key, ...args);
    },
    //快捷方法,监听消息总线的消息
    listen(key, callback) {
        message.listen(key, callback);
    },

    components:{}

    
}
//创建lovejs的总命名空间,放入window下,并防止篡改 
Object.defineProperty((<any>window), "love", {
    writable: false,
    value: love
})
export default message;
export { Message, Hook, love };