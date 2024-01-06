import React,{useState,useEffect,useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Button, Table } from 'react-bootstrap';
import StudentContext from '../../../context/StudentContext';
import { useNavigate } from 'react-router-dom';

export default function StudentTable() {
  let Navigate = useNavigate();
  const host = process.env.REACT_APP_API_URL;
  const context = useContext(StudentContext);
  const { students, handleStudentget } = context;
  
  useEffect(() => {
    // Fetch students data from MongoDB or any other data source
    handleStudentget();
  }, []);
  console.log("this os",students[0]);

  const handleDeleteStudent = async (studentId) => {
    try {
      // Assuming your API endpoint for deleting a student is something like '/api/students/:id'
      const response = await fetch(`${host}/api/student/${studentId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            },
      });

      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        handleStudentget();
      } else {
          // Handle errors, for example, log them to the console
          console.error(`Failed to delete student. Status: ${response.status}`);
      }

  } catch (error) {
      console.error(error);
  }
  };
 
  const handleEditStudent = async (studentId) => {
    try {
        let id = studentId;
        Navigate(`/admin/addstudents/${id}`);
    } catch (error) {
        console.error(error);
    }
};
  return (
    <div>
         {/* Table to display student data */}
      <div className='overflow-scroll' style={{maxHeight:'300px'}}>
      <Table striped bordered hover className="mt-4">
        {/* Table headers */}
        <thead>
          <tr className='' style={{fontSize:'12px',textAlign:'center'}}>
            <th colspan="2">Actions</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>College</th>
            <th>Department</th>
            <th>Course Name</th>
            <th>Batch Number</th>
            <th>Fee Status</th>
            <th>Assignment Status</th>
            <th>Feedback Status</th>
            <th>Project Status</th>
            <th>Project Completed</th>
            <th>Certificate Status</th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {localStorage.getItem('token') &&
        students &&
        students[0] ?
          
        students[0].map((student) => (
            <tr key={student._id} style={{fontSize:'14px',textAlign:'center'}}>
              <td className='col-md-8' >
                <Button variant="btn btn-sm btn-warning" onClick={() => handleEditStudent(student._id)}>
                  Edit
                </Button>
                </td>
                <td>
                <Button variant="btn btn-sm btn-danger" onClick={() => handleDeleteStudent(student._id)}>
                  Delete
                </Button>
               
              </td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.mobNo}</td>
              <td>{student.college}</td>
              <td>{student.department}</td>
              <td>{student.courseName}</td>
              <td>{student.batchNumber}</td>
              <td>{student.feeStatus}</td>
              <td>{student.assignmentStatus}</td>
              <td>{student.feedbackStatus}</td>
              <td>{student.projectStatus}</td>
              <td>{student.projectCompleted}</td>
              <td>{student.certificateStatus}</td>
              
            </tr>
          )): "No Data Found"
        }
        </tbody>
      </Table>
      </div>
    </div>
  )
}
