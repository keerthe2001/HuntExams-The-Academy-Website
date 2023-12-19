import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CoursesList() {
    const [loading, setloading] = useState(false)
    const [CourseAvail, setCourseAvail] = useState(null)
    const [editingCourseId, setEditingCourseId] = useState(null);

    let Navigate = useNavigate();

    const fetchCourse = async () => {
        try {
          const response = await fetch(`${host}/api/course/getcourse`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          setCourseAvail(data);
        } catch (error) {
          console.error('Error fetching Course:', error);
        }
      };
    
              
      const host = process.env.REACT_APP_API_URL;
    
      useEffect(() => {
        fetchCourse();
      }, []);
    
      console.log(CourseAvail && CourseAvail.Course && CourseAvail.Course)
     const handleEditCourse = async (courseId) => {
        try {
            let id = courseId;
            Navigate(`/admin/addcourse/${id}`);
        } catch (error) {
            console.error(error);
        }
    };
    
  return (
    <>
    <h2 className='text-center my-4 fw-bold'  >Course Lists</h2>
            {loading ? (
                <div className='d-flex justify-content-center align-items-center'>
                    <div className="overlay"></div>

                    <div className=' mx-auto text-center bg-light rounded shadow' style={{ position: 'absolute', zIndex: 2, top: '30%', left: '42%', width: "200px" }}>

                        <img className='absolute' style={{ zIndex: 2 }} src="https://huntexams.000webhostapp.com/live-previews/images/logoloading2.gif" alt="Loading" />

                        <div style={{ zIndex: 2 }} className='text-center fw-bold pb-2'>Hunting..</div>
                    </div>
                </div>
            ) : ('')}
            <div className='mx-3 shadow overflow-scroll rounded' style={{ maxHeight: '300px' }} >
                <table className="table" >
                    <thead className='text-center bg-success text-light sticky-top' style={{ zIndex: 0 }}>
                        <tr >
                            <th scope="col" className='bg-success text-light'>Select</th>
                            <th scope="col" className='bg-success text-light'>Couse Name</th>
                            <th scope="col" className='bg-success text-light'>Course Discription</th>
                            {/* <th scope="col" className='bg-success text-light'>Status</th> */}
                            <th scope="col" colSpan={3} className='bg-success text-light'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            CourseAvail &&
                            CourseAvail.Course ? (
                                CourseAvail.Course.map((courseItem, index) => (
                                <tr key={index} >
                                    <th scope="row">
                                        <input type='checkbox'></input>
                                    </th>
                                    <td>{courseItem.coursename}</td>
                                    <td>{courseItem.coursediscription}</td>
                                    <td>
                                        <Button variant="btn btn-sm btn-warning" onClick={() => handleEditCourse(courseItem._id)}>
                                            Edit
                                        </Button>
                                    </td>

                                    <td>
                                        <Button variant="btn btn-sm btn-danger" >
                                            Delete
                                        </Button></td>
                                </tr>
                            ))) :
                            <div className='text-center'>No Data to Display</div>

                        }

                    </tbody>
                </table>

            </div>
    </>
  )
}
