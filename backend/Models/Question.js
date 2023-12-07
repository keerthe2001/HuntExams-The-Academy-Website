// models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswerIndex: Number,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
