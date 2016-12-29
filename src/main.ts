import msg, {Message}  from './core/message'
import Widget from './ui/widget'
import './core/logger'
msg.listen("message.test",function(name){
   console.log(`${name} i am ok!`)
})
let w = new Widget({});
msg.send("message.test","czw");

