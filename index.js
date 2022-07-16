const express = require('express');
const bodyParser= require('body-parser')
const User = require('../memory-box-server/models/user')
const Memory = require('../memory-box-server/models/memory')
const app = express();


const mongoose = require('mongoose')


mongoose.connect("mongodb://prabs3257:manhaton@ac-ozuxaft-shard-00-00.j77l7ph.mongodb.net:27017,ac-ozuxaft-shard-00-01.j77l7ph.mongodb.net:27017,ac-ozuxaft-shard-00-02.j77l7ph.mongodb.net:27017/?ssl=true&replicaSet=atlas-a8khfg-shard-0&authSource=admin&retryWrites=true&w=majority", (err) => {
  
    if (err) throw err;
    console.log("Connected to MongoDB");
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/user', async (req, res) =>{

  console.log(req.body)
  const user = new User(req.body)
  
    try{
        const temp = await User.findOne({email:req.body.email})
        if(!temp){
            await user.save()
        }
        //const token = await user.generateAuthToken()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }

})


app.post('/addMemory', async (req, res) =>{

    console.log(req.body)
    const memory = new Memory(req.body)
    
      try{
          await memory.save()
          //const token = await user.generateAuthToken()
          res.status(201).send(memory)
      }catch(e){
        res.status(400).send(e)
      }
  
  })

  
app.get('/getMemories', async (req, res) =>{

    try{

        const memories = await Memory.find({})
        res.status(201).send(memories)
    }catch(e){
        res.status(400).send(e)
    }
  
  })

app.listen(3000, function() {
    console.log('listening on 3000')
  })