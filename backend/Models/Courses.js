const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
    coursename:{
        type:String,
        required:true,

    },
    coursedescription:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        default:"course.jpg"
    },
    categories:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Course = mongoose.model('courses',CourseSchema);

module.exports = Course