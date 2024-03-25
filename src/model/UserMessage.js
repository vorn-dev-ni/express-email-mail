import mongoose from "mongoose";

 const messageScheme = new mongoose.Schema({
    message:{
        type:String,
        lowercase:true,
        trim:true,
        default:()=>'Hello Panhavorn'

    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
        index: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']



    },
    createdDated:{
        type:Date,
        default:Date.now,
        
    }
})

 const Message = mongoose.model('message',messageScheme)
 export default Message