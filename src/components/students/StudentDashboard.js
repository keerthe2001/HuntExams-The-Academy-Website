import React, { useContext, useEffect } from 'react'
import feedbackContext from '../../context/feedbackContext'

export default function StudentDashboard() {
  const context = useContext(feedbackContext);
  const { feedback, handleFeedbackget } = context;

  useEffect(() => {
    const run =  async () => {
      await handleFeedbackget();
     }
     run();
  }, [])
  
  console.log(localStorage.getItem('token') && feedback && feedback[0] && feedback[0].feedbackList && feedback[0].feedbackList[0].name);
  return (
    <>
      <h1 className='text-center my-4'>Student Dashboard</h1>
      <h2 className='text-center my-4'  >Student Feedbacks</h2>
     
      {/* <table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Feedback</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  
  </tbody>
</table> */}
<div className='container'>
<div className='row  my-3'>
{localStorage.getItem('token') &&
        feedback &&
        feedback[0] &&
        feedback[0].feedbackList ? (
          feedback[0].feedbackList.map((feedbackItem, index) => (
      <div className="col-md-3 my-3" key={index}>
          <div className="card my-3 shadow" >
            <div className="card-body">
              <h5 className="card-title"><span className='fw-bold'>Name: </span>{feedbackItem.name}</h5>
              <p className="card-text"><span className='fw-bold'>college: </span>{feedbackItem.college}</p>
              <p className="card-text"><span className='fw-bold'>Department: </span>{feedbackItem.department}</p>
              <p className="card-text"><span className='fw-bold'>Star Rating: </span>{feedbackItem.rating}</p>
              <p className="card-text"><span className='fw-bold'>Feedback: </span>{feedbackItem.feedback_description}</p>
              {/* <h6 className="text-muted " style={{fontSize:'12px'}} >{notes._id}</h6> */}
              {/* <span class="badge bg-primary">{notes.tag}</span>       */}
              {/* <i className="fa-solid fa-trash mx-3" onClick={handleDelete}></i> */}
              {/* <i className="fa-solid fa-pen-to-square"  onClick={()=>{handleEdit(notes._id,notes.title,notes.description,notes.tag)}}></i> */}
            </div>
          </div>
      </div>
        ))
        )
          : <div className="container text-center pl-3">No Notes to Display</div>
        }
      </div>
      </div>

    </>
  );
}
