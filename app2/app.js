const express = require("express")
const kafka = require("kafka-node")
const app = express()
app.use(express.json())
const mongoose = require('mongoose')

const dbRun = ()=>{
mongoose.connect(process.env.MONGO_URL)
const User = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const client = new kafka.KafkaClient({kafkaHost:process.env.KAFKA_BOOTSTRAP_SERVERS})
const consumer = new kafka.Consumer(client,[{topic:process.env.KAFKA_TOPIC}],{
   autoCommit: false
})
consumer.on('message',async(message)=>{
   const user = await new User.create(JSON.parse(message.value)) 
   await user.save()
})
consumer.on('error',(err)=>{
    console.log(err)
})

}
setTimeout(dbRun,1000)


app.listen(process.env.PORT)