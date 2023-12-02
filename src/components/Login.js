import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [credencials, setcredencials] = useState({email:"",password:""})
    const navigate = useNavigate();
    const host = "http://localhost:5000";
    let errmsg = "";
    const handleLogin = async (e)=>{
        e.preventDefault();

        const response =  await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({"email":credencials.email,"password":credencials.password })
          });
          const json = await response.json();
          console.log(json.authtoken)
          if(json.authtoken)
          {
              localStorage.setItem('token',json.authtoken)
              navigate("/");
          }
          if(json.authtoken && json.userRole === 'admin')
          {
              localStorage.setItem('token',json.authtoken)
              localStorage.setItem('userRole',json.userRole)

              navigate("/admin/dashboard");
          }
          if(json.authtoken && json.userRole === 'student')
          {
              localStorage.setItem('token',json.authtoken)
              localStorage.setItem('userRole',json.userRole)
              navigate("/student/dashboard");
          }
          else if(json.error){
              errmsg = json.error
              setTimeout(() => {
                  document.getElementById("error").innerText = "";
                }, 1500);
                document.getElementById("error").innerText = errmsg
          }
    }

    const onChange = (e) =>{
        setcredencials({...credencials,[e.target.name]:e.target.value})
    }
    return (
        <div className='container shadow p-3 w-50'>
            <h2 className='text-center fw-bold'>Login</h2>
            <form onSubmit={handleLogin} method='post'>
                <div className='text-danger' id="error">

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email:</label>
                    <input type="email" value={credencials.email} required onChange = {onChange} name='email' className="form-control" id="email" aria-describedby="emailHelp" />
                  
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label fw-bold" >Password:</label>
                    <input type="password" value={credencials.password} required onChange = {onChange}  name="password" className="form-control" id="password" />
                </div>

                <div className='text-center'>

                <button type="submit" className="btn btn-small btn-primary">Login</button>
                </div>
               
            </form>
        </div>
    )
}
