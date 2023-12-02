import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


export default function Signup() {
    const [credencials, setcredencials] = useState({name:"",email:"",role:"",mobile:"",password:"",cpassword:""});

    const navigate = useNavigate();
    const host = "http://localhost:5000";
   const handlesignup = async(e) =>{
    e.preventDefault();
    const response =  await fetch(`${host}/api/auth/createUser`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({"name":credencials.name,"email":credencials.email,"role":credencials.role,"mobile":credencials.mobile,"password":credencials.password})
          });
          const json = await response.json();
          console.log(json.authtoken)

          if(json.authtoken)
          {
            console.log("printing...")
            navigate("/login");
          }

   }
   const onChange = (e) =>{
    setcredencials({...credencials,[e.target.name]:e.target.value})
}
  return (
    <div className='container shadow p-3 w-50 mb-5'>
      <h2 className='text-center fw-bold'>SignUp Form</h2>
        <form method='post' onSubmit={handlesignup}>
  <div  className="mb-3">
    <label for="name" className="form-label fw-bold">Name</label>
    <input type="text" name="name" onChange={onChange} value={credencials.name} className="form-control" id="name" aria-describedby="emailHelp"/>
  </div>

  <div className="mb-3">
    <label for="email" className="form-label fw-bold">Email address</label>
    <input type="email" name="email" onChange={onChange} value={credencials.email} className="form-control" id="email" aria-describedby="emailHelp"/>
  </div>

  <div className="mb-3">
    <label for="role" className="form-label fw-bold">role</label>
    <input type="text" name="role" onChange={onChange} value={credencials.role} className="form-control" id="role" aria-describedby="roleHelp"/>
  </div>

  <div className="mb-3">
    <label for="mobile" className="form-label fw-bold">Mobile:</label>
    <input type="phone" name="mobile" onChange={onChange} value={credencials.mobile} className="form-control" id="mobile" aria-describedby="MobileHelp"/>
  </div>

  <div className="mb-3">
    <label for="password" className="form-label fw-bold">Password</label>
    <input type="password" onChange={onChange} className="form-control" value={credencials.password} id="password" name="password" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label for="cpassword" className="form-label fw-bold">Confirm Password</label>
    <input type="password" onChange={onChange} className="form-control" value={credencials.cpassword} id="cpassword" name="cpassword" minLength={5} required/>
  </div>
  <div className='text-center'>
  <button type="submit" className="btn btn-primary">Signup</button>

  </div>
</form>
    </div>
  )
}
