const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobNo:{
        type:String,
        required:true,
        unique:true
    },
    college:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    coursename:{
        type:String,    
    },
    batchNumber:{
        type:String,
    },
    feeStatus:{
        type:String,
    },
    assignmentStatus:{
        type:String,
    },
    feedbackStatus:{
        type:String,
    },
    projectStatus:{
        type:String,
    },
    projectCompleted:{
        type:String,
    },
    certificateStatus:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Student = mongoose.model('student',StudentSchema);

module.exports = Student