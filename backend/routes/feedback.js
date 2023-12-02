const express = require('express');
const { body, validationResult } = require('express-validator');
const Feedback = require('../Models/Feedback'); // Import your Feedback model
const fetchuser = require('../Middleware/fetchuser');
const router = express.Router();


// Endpoint to submit feedback
router.post('/feedback',fetchuser, [
   // Authentication middleware to ensure the user is logged in
  body('name', 'Feedback message is required').notEmpty(),
  body('feedback_description', 'Feedback message is required').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name,feedback_description } = req.body;

  try {
    // Create a new feedback instance
    const feedback = new Feedback({
      user: req.user.id, // Assuming you store the user ID in the auth middleware
        name:req.body.name,
        feedback_description:req.body.feedback_description
         
    });

    // Save the feedback to the database
    await feedback.save();

    res.json({ message: 'Feedback submitted successfully',success:true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({error:'Server Error'});
  }
});

// Endpoint to get all feedback (admin-only, adjust as needed)
router.get('/getfeedback',fetchuser, async (req, res) => {
  try {
    // Check if the user is an admin (you may have a role field in your User model)
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Unauthorized' });
    // }

    // Fetch all feedback from the database
    const feedbackList = await Feedback.find().populate('user', ['name', 'email']);

    const result = await res.json({ feedbackList });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


// Update status to 1 for a specific feedback by ID
router.put('/:id', async (req, res) => {
  try {
    const feedbackId = req.params.id;
    console.log(req.body)
    const {statusid} = req.body
    // Find the feedback by ID and update the status to 1
    let updatedFeedback = null;
    if(statusid == '0' ){
      updatedFeedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      { $set: { status: 1 } },
      { new: true } // To return the updated feedback
    );
    }else{
      updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        { $set: { status: 0 } },
        { new: true } // To return the updated feedback
      );
    }

    if (!updatedFeedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.json(updatedFeedback);

  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
