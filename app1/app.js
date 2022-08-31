const express = require("express")
const kafka = require("kafka-node")
const app = express()
app.use(express.json())
const sequelize = require("sequelize")
const db = new sequelize(process.env.POSTGRES_URL)
const dbRun = ()=>{
const User = db.define('user',{
    name:sequelize.STRING,
    email:sequelize.STRING,
    password:sequelize.STRING
})
db.sync({force:true})
const client = new kafka.KafkaClient({kafkaHost:process.env.KAFKA_BOOTSTRAP_SERVERS})

const producer = new kafka.Producer(client)
app.post("/",async(req,res)=>{
    res.send("KKDK")
    })
producer.on('ready',async()=>{
app.post("/",async(req,res)=>{
 res.send([{topic:process.env.KAFKA_TOPIC, messages:JSON.stringify(req.body)}],async(err,data)=>{
    if(err) console.log(err)
    else{
       
         User.create(req.body).then(()=>{
            res.send(req.body)
         })
      
    }
 })
})
}) 
}
setTimeout(dbRun,1000)


app.listen(process.env.PORT)