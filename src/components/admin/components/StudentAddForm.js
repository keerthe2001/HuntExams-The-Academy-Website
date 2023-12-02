import React, { useState, useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import { Button, Form, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 function from

import { useNavigate, useParams } from 'react-router-dom';

import StudentContext from '../../../context/StudentContext';

export default function StudentAddForm() {
  const { id } = useParams(); // Get the id parameter from the URL
  const context = useContext(StudentContext);
  const { students, handleStudentget } = context;
  let Navigate = useNavigate();
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [formData, setFormData] = useState({

    name: '',
    email: '',
    mobNo: '',
    college: '',
    department: '',
    courseName: '',
    batchNumber: '',
    feeStatus: '',
    assignmentStatus: '',
    feedbackStatus: '',
    projectStatus: '',
    projectCompleted: '',
    certificateStatus: '',
  });

  const UpdateStudent = async (form) => {
    try {
        console.log("Handling Update...")
        const url = `${host}/api/student/${form._id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(form)
        });
        const json = await response.json();
        if (json.success) {
          errmsg = json.message
          setTimeout(() => {
            document.getElementById("success").innerText = "";
          }, 1500);
          document.getElementById("success").innerText = errmsg
          setTimeout(() => {
            Navigate('/admin/studentlist');
          }, 2000);
        }
        else if (json.error) {
          errmsg = json.error
          setTimeout(() => {
            document.getElementById("error").innerText = "";
          }, 1500);
          document.getElementById("error").innerText = errmsg
    
          setTimeout(() => {
            Navigate('/admin/addstudent');
          }, 2000);
        }
    }
    catch (error) {
        console.error('Error updating student details:', error.message);
    }
}

  useEffect(() => {
    handleStudentget();
    if (id) {
      console.log("entered inside")
      // If there's an 'id' parameter in the URL, update the form data
      UpdateForm(id);
    }
  }, [id]); // Add id to the dependency array to update form data when it changes

  const UpdateForm = (studentId) => {
    const studentToEdit = students[0].find((studentEdit) => studentEdit._id === studentId);

    if (studentToEdit) {
      setFormData({ ...studentToEdit });
      setEditingStudentId(studentId);
      console.log("form data", formData)
    }
  };
  const UpdateFrom = (studentId) => {
    console.log("called", students[0])
    // Find the student with the given ID and populate the form data for editing
    const studentToEdit = students[0].find((studentEdit) => studentEdit._id === studentId);
    console.log(studentToEdit)

    if (studentToEdit) {
      setFormData({ ...studentToEdit });
      console.log("asdfasdf", formData)
      setEditingStudentId(studentId);
    }
  }


  useEffect(() => {
    return () => {
      setFormData(formData)
    }
  }, [])

  // setEditingStudentId(editingStudentIds)
  useEffect(() => {
    // Fetch students data from MongoDB or any other data source
    handleStudentget();
  }, []);

  let errmsg = "";
  const host = "http://localhost:5000"

  const handleAddStudent = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/student/addStudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(formData)
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      errmsg = json.message
      setTimeout(() => {
        document.getElementById("success").innerText = "";
      }, 1500);
      document.getElementById("success").innerText = errmsg
      setTimeout(() => {
        Navigate('/admin/studentlist');
      }, 2000);
    }
    else if (json.error) {
      errmsg = json.error
      setTimeout(() => {
        document.getElementById("error").innerText = "";
      }, 1500);
      document.getElementById("error").innerText = errmsg

      setTimeout(() => {
        Navigate('/admin/addstudent');
      }, 2000);
    }

  }
  return (
    <div>
      {/* Form for adding/editing student */}
      <div className='bg-light p-2 fw-bold text-success' id='success'></div>
      <div className='bg-light p-2 fw-bold text-danger' id='error'></div>
      <Form className="mt-4 p-3 text-light">
        <Row>
          <Col >
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" name='name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <Form.Label>Email:</Form.Label>

              <Form.Control type="text" name='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </Form.Group>
          </Col>
          <Col md={4} sm={4}>
            <Form.Group controlId="formName">
              <Form.Label>MobileNo:</Form.Label>
              <Form.Control type="text" name='mobNo' value={formData.mobNo} onChange={(e) => setFormData({ ...formData, mobNo: e.target.value })} />

              <Form.Label>College:</Form.Label>
              <Form.Control type="text" name='college' value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} />

              <Form.Label>Department:</Form.Label>
              <Form.Control type="text" name='department' value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />

            </Form.Group>
          </Col>

          <Col md={4} sm={4}>
            <Form.Group controlId="formName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" name='coursename' value={formData.courseName} onChange={(e) => setFormData({ ...formData, courseName: e.target.value })} />

              <Form.Label>BatchNo:</Form.Label>
              <Form.Control type="text" name='batchno' value={formData.BatchNo} onChange={(e) => setFormData({ ...formData, BatchNo: e.target.value })} />
            </Form.Group>
          </Col>

          {/* Add other form fields similarly */}

        </Row>
        <div className="text-center mt-4">
       { editingStudentId ? 
          <Button
            variant="btn border-3 border-light text-light"
            type="button"
            onClick={() => UpdateStudent(formData)}
          >
            Update Student 
          </Button>
          : <Button
            variant="btn border-3 border-light text-light"
            type="button"
            onClick={handleAddStudent}
          >
            Add Student
          </Button>
          }
        </div>
      </Form>
    </div>
  )
}

