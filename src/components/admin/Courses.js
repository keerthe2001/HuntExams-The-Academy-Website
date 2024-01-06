import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Courses() {
  const [credentials, setCredentials] = useState({
    coursename: "",
    coursedescription: "",
    image: "",
    categories: "",
  });

  const [editingCourseId, setEditingCourseId] = useState(null);
  const host = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { id } = useParams(); // Extract courseId from URL params

  useEffect(() => {
    // Load course details for editing when component mounts
    if (id) {
      loadCourseForEditing(id);
    }
  }, [id]);

  const handleCourse = async (e) => {
    e.preventDefault();

    const endpoint = editingCourseId
      ? `${host}/api/course/addcourse/${editingCourseId}`
      : `${host}/api/course/addcourse`;

    const method = editingCourseId ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        coursename: credentials.coursename,
        coursedescription: credentials.coursedescription,
        categories: credentials.categories,
        image: credentials.image,
      }),
    });

    const json = await response.json();
    if (json.success) {
      // Handle success
      navigate("/admin/courses");
    } else if (json.error) {
      // Handle error
      navigate("/admin/addcourse");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const loadCourseForEditing = async (courseId) => {
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
      setCredentials({
        coursename: course.coursename,
        coursedescription: course.coursedescription,
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
        <h2 className="text-center">{editingCourseId ? "Edit Course" : "Add Course"}</h2>
        <form onSubmit={handleCourse} method="post">
          <div className=' text-success' id='success'></div>
          <div className=' text-danger' id='error'></div>
          <div className="mb-3">
            <label htmlFor="coursename" className="form-label fw-bold">Course Name</label>
            <input type="text" className="form-control" onChange={onChange} value={credentials.coursename} name='coursename' id="coursename" aria-describedby="nameHelp" />
          </div>

          <div className="mb-3">
            <label htmlFor="coursedescription" className="form-label fw-bold">Course Description</label>
            <input type="text" className="form-control" onChange={onChange} name='coursedescription' id="coursedescription" value={credentials.coursedescription} aria-describedby="descriptionHelp" />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label fw-bold">Image</label>
            <input type="text" className="form-control" onChange={onChange} name='image' id="image" value={credentials.image} aria-describedby="imageHelp" />
          </div>

          <div className="mb-3">
            <label htmlFor="categories" className="form-label fw-bold">Categories</label>
            <input type="text" className="form-control" onChange={onChange} name='categories' id="categories" value={credentials.categories} aria-describedby="categoriesHelp" />
          </div>

          <div className="text-center">
            <Button
              variant="btn btn-primary border-3 border-primary text-light"
              type="submit"
            >
              {editingCourseId ? "Update Course" : "Add Course"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
