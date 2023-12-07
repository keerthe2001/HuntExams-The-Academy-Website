import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function StudentFeedback() {
    const [credencials, setcredencials] = useState({name:"",image:"",college:"",department:"",rating:"",feedback_description:""})
    const host = process.env.REACT_APP_API_URL
    let Navigate = useNavigate();
    let errmsg = "";
    const handleFeedback = async (e)=>{
        e.preventDefault();

        const response =  await fetch(`${host}/api/feedback/feedback`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token": localStorage.getItem('token')
            },
            body : JSON.stringify({"name":credencials.name,"college":credencials.college,"department":credencials.department,"image":credencials.image,"rating":credencials.rating,"feedback_description":credencials.feedback_description })
          });
          const json = await response.json();
          console.log(json.authtoken)
          if(json.success)
          {
            errmsg = json.message
            setTimeout(() => {
                document.getElementById("success").innerText = "";
              }, 1500);
              document.getElementById("success").innerText = errmsg
              setTimeout(() => {
                Navigate('/student/dashboard');
              }, 2000);
          }
          else if(json.error){
              errmsg = json.error
              setTimeout(() => {
                  document.getElementById("error").innerText = "";
                }, 1500);
                document.getElementById("error").innerText = errmsg

                setTimeout(() => {
                  Navigate('/student/dashboard');
                }, 2000);
          }

    }

    const onChange = (e) =>{
        setcredencials({...credencials,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <div className='container shadow my-5 p-3'>
    <h2 className='text-center'>Feedback Form</h2>
<form onSubmit={handleFeedback} method='post'>
<div className=' text-success' id='success'></div>
    <div className=' text-danger' id='error'></div>
  <div className="mb-3">
    <label htmlFor="name" className="form-label fw-bold">Name</label>
    <input type="text" className="form-control" onChange={onChange} name='name' id="name" aria-describedby="nameHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="college" className="form-label fw-bold">College</label>
    <input type="text" className="form-control" onChange={onChange} name='college' id="college" aria-describedby="nameHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="image" className="form-label fw-bold">Image</label>
    <input type="text" className="form-control" onChange={onChange} name='image' id="image" aria-describedby="departmentHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="Department" className="form-label fw-bold">Department</label>
    <input type="text" className="form-control" onChange={onChange} name='department' id="department" aria-describedby="departmentHelp"/>
  </div>


      <div class="form-group">
        <label for="rating">Rating:</label>
        <select class="form-control" id="rating" onChange={onChange} name="rating" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

  <div className="mb-3">
    <label htmlFor="feedback_description" className="form-label fw-bold">Your Feedback</label>
    <input type="text" className="form-control" onChange={onChange} name='feedback_description' id="feedback_description" aria-describedby="feedback_descriptionHelp"/>
  </div>

      

  <div className='text-center'>

  <button type="submit" className="btn btn-primary">Submit Feedback</button>

  </div>
  
  
</form>
    </div>
    </div>
  )
}
