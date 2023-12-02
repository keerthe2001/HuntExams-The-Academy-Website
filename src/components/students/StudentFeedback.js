import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function StudentFeedback() {
    const [credencials, setcredencials] = useState({name:"",feedback_description:""})
    const host = "http://localhost:5000";
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
            body : JSON.stringify({"name":credencials.name,"feedback_description":credencials.feedback_description })
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
