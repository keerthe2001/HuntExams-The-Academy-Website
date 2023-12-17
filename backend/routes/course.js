const express = require('express');
const { body, validationResult } = require('express-validator');
const Courses = require('../Models/Courses'); // Import your Feedback model
const fetchuser = require('../Middleware/fetchuser');
const router = express.Router();


// Endpoint to submit feedback
router.post('/addcourse', async (req, res) => {
  const { coursename,coursediscription,image,categories} = req.body;

  try {
    // Create a new feedback instance
    const course = new Courses({
      coursename:req.body.coursename,
      coursediscription:req.body.coursediscription,
      image:req.body.image,
      categories:req.body.categories,
    });

    // Save the feedback to the database
    await course.save();

    res.json({ message: 'Course Added successfully',success:true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({error:error.message});
  }
});

// Endpoint to get all feedback (admin-only, adjust as needed)
router.get('/getcourse', async (req, res) => {
  try {
    // Check if the user is an admin (you may have a role field in your User model)
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Unauthorized' });
    // }

    // Fetch all feedback from the database
    const courseList = await Courses.find();
     res.json({ Courses });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
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
