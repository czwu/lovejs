

//消息类实现
class Message {
    name: string;
    type: string;
    listeners: Map<String, Set<Function>>;

    constructor(name:string) {
        this.name = name;
        this.listeners = new Map()
    }


    send(key, ...args) {
        if(key != "LOVE-LOG"){
           message.send("LOVE-LOG", `推送消息： ${key},参数为：`,args)
        }
        if (this.listeners.has(key)) {
            let calls = this.listeners.get(key);
            calls.forEach((fn) => {
                fn.apply(null, args);
            });
        }
        
    }

    listen(key, callback) {
        message.send("LOVE-LOG",  `监听注册： ${key}`)
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
    
    constructor(name:string) {
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
                if(_continue!==false){
                     _continue = fn.apply(null, args);
                }
            });
        }
    }
}

let message = new Message("MESSAGE-BUS");

export default message;
export { Message, Hook };