import React from 'react'
import {Link}from 'react-router-dom';
export default function Navbar() {
  return (
    <>
  
    <header className="bg-white sticky-top shadow d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1 mb-4 px-2 border-bottom ">

      <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <img src='https://keerthe2001.github.io/HuntExams-The-Academy-Website/images/logo.png' alt='' style={{width:'75px'}}/>
        {/* <span style={{margin:'5px',fontWeight:'bold',fontFamily: 'Autour One, cursive'}}>HuntExams</span> */}
      </a>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
        <li><a href="/#trendingcourse" className="nav-link px-2 link-dark">Features</a></li>
        <li><a href="/#studentfeedbacks" className="nav-link px-2 link-dark">Feedbacks</a></li>
        <li><a href="#" className="nav-link px-2 link-dark">Pricing</a></li>
        <li><a href="#" className="nav-link px-2 link-dark">About</a></li>
      </ul>

      <div className="col-md-3 text-end">
        <button type="button" className="btn btn-outline-primary me-2"> <Link  to='/LoginSignUp'>Login</Link></button>
        <button type="button" className="btn btn-primary">Sign-up</button>
      </div>
    </header>

    </>
  )
}
