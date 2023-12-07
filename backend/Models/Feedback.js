const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"student.gif"
    },
    feedback_description:{
        type:String,
        required:true,
        unique:true
    },
    rating:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:0,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Feedback = mongoose.model('feedback',FeedbackSchema);

module.exports = Feedback