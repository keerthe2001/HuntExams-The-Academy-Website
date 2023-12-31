// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../Models/Student');
const fetchuser = require('../Middleware/fetchuser');

// Add Student
router.post('/addstudent', fetchuser ,async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const result = await newStudent.save();
        res.json({ message: 'Student Details submitted successfully',success:true,result});
    } catch (error) {
        
        res.status(500).send(error.message);
    }
});

// Get All Students
router.get('/getstudents',fetchuser, async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// Update Student
router.put('/:id',fetchuser, async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Student Details Updated successfully',success:true,updatedStudent});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Delete Student
router.delete('/:id',fetchuser, async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        res.json(deletedStudent);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
