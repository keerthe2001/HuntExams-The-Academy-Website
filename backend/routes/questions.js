// routes/questions.js
const express = require('express');
const router = express.Router();
const Question = require('../Models/Question');

// Get all questions
router.get('/getquestions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add a new question
router.post('/addquestions', async (req, res) => {
  const { question, options, correctAnswerIndex } = req.body;
  console.log(req.body.newQuestion)

  if (!question || !options || !correctAnswerIndex) {
    return res.status(400).json({ error: 'Invalid request. Make sure to provide question, options, and correctAnswerIndex.' });
  }

  try {
    const newQuestion = new Question({
      question,
      options,
      correctAnswerIndex,
    });

    const savedQuestion = await newQuestion.save();
    res.json(savedQuestion);
  }
  catch (error) {
    console.error('Error adding question:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/addbulkquestions', async (req, res) => {
  const rawQuestions = req.body;

  const questionsData = rawQuestions.map((rawQuestion) => ({
    question: rawQuestion.questions,
    options: [rawQuestion['Option 1'], rawQuestion['Option 2 '], rawQuestion['Option 3'], rawQuestion['Option 4']],
    correctAnswerIndex: rawQuestion['Correct Answer Index'] - 1, // Adjust index to start from 0
  }));

  try {
    const insertedQuestions = await Question.create(questionsData);

    console.log('Bulk questions added successfully:', insertedQuestions);
    res.status(201).json({ message: 'Bulk questions added successfully', questions: insertedQuestions });
  } catch (error) {
    console.error('Error adding bulk questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
