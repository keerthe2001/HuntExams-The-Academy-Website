const express = require('express');
const { body, validationResult } = require('express-validator');
const Courses = require('../Models/Courses'); // Import your Course model
const fetchuser = require('../Middleware/fetchuser');
const router = express.Router();


// Endpoint to submit course
router.post('/addcourse', async (req, res) => {
  const { coursename,coursediscription,image,categories} = req.body;

  try {
    // Create a new course instance
    const course = new Courses({
      coursename:req.body.coursename,
      coursediscription:req.body.coursediscription,
      image:req.body.image,
      categories:req.body.categories,
    });

    // Save the course to the database
    await course.save();

    res.json({ message: 'Course Added successfully',success:true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({error:error.message});
  }
});

// Endpoint to get all course (admin-only, adjust as needed)
router.get('/getcourse', async (req, res) => {
  try {
    // Check if the user is an admin (you may have a role field in your User model)
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Unauthorized' });
    // }

    // Fetch all course from the database
    const Course = await Courses.find();
     res.json({ Course });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});


// Update status to 1 for a specific course by ID
router.put('/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log(req.body)
    const {statusid} = req.body
    // Find the course by ID and update the status to 1
    let updatedCourse = null;
   
      updatedCourse = await Courses.findByIdAndUpdate(
        courseId,
        { $set: req.body },
        { new: true } // To return the updated course
      );
    

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(updatedCourse);

  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
