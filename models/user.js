const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    profilePicLink:{
        type:String,
        required:false  
    },
   
   
    email: {
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid')
            }
        }
    },
  
    
    
})



const User = mongoose.model('User', userSchema)

module.exports = User