import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

export default function Courses() {
  const [credencials, setcredencials] = useState({
    coursename: "",
    coursediscription: "",
    image: "",
    categories: "",
  });
  const [editingCourseId, setEditingCourseId] = useState(null); // Add this state
  const host = process.env.REACT_APP_API_URL;
  let Navigate = useNavigate();
  let errmsg = "";

  const handleCourse = async (e) => {
    e.preventDefault();

    const endpoint = editingCourseId
      ? `${host}/api/course/editcourse/${editingCourseId}`
      : `${host}/api/course/addcourse`;

    const method = editingCourseId ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        coursename: credencials.coursename,
        coursediscription: credencials.coursediscription,
        categories: credencials.categories,
        image: credencials.image,
      }),
    });

    const json = await response.json();
    console.log(json.authtoken);
    if (json.success) {
      errmsg = json.message;
      setTimeout(() => {
        document.getElementById("success").innerText = "";
      }, 1500);
      document.getElementById("success").innerText = errmsg;
      setTimeout(() => {
        Navigate("/admin/courses");
      }, 2000);
    } else if (json.error) {
      errmsg = json.error;
      setTimeout(() => {
        document.getElementById("error").innerText = "";
      }, 1500);
      document.getElementById("error").innerText = errmsg;

      setTimeout(() => {
        Navigate("/admin/addcourse");
      }, 2000);
    }
  };

  const onChange = (e) => {
    setcredencials({ ...credencials, [e.target.name]: e.target.value });
  };

  const loadCourseForEditing = async (courseId) => {
    // Fetch course details based on courseId and set the values in the form
    const response = await fetch(`${host}/api/course/getcourse/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    if (json.success) {
      const course = json.course;
      setcredencials({
        coursename: course.coursename,
        coursediscription: course.coursediscription,
        image: course.image,
        categories: course.categories,
      });
      setEditingCourseId(courseId);
    } else {
      // Handle error while fetching course details
    }
  };

  return (
    <div>
      <div className="container shadow my-5 p-3">
        <h2 className="text-center">Course Form</h2>
        <form onSubmit={handleCourse} method="post">
<div className=' text-success' id='success'></div>
    <div className=' text-danger' id='error'></div>
  <div className="mb-3">
    <label htmlFor="coursename" className="form-label fw-bold">Course Name</label>
    <input type="text" className="form-control" onChange={onChange} name='coursename' id="coursename" aria-describedby="nameHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="coursediscription" className="form-label fw-bold">Course Discription</label>
    <input type="text" className="form-control" onChange={onChange} name='coursediscription' id="coursediscription" aria-describedby="nameHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="image" className="form-label fw-bold">Image</label>
    <input type="text" className="form-control" onChange={onChange} name='image' id="image" aria-describedby="departmentHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="categories" className="form-label fw-bold">categories</label>
    <input type="text" className="form-control" onChange={onChange} name='categories' id="categories" aria-describedby="categoriesHelp"/>
  </div>


     
      

  <div className="text-center">
            <Button
              variant="btn border-3 border-light text-light"
              type="submit" // Changed from type="button" to type="submit"
            >
              {editingCourseId ? "Update Course" : "Add Course"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
