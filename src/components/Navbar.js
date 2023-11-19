import React from 'react'
import {Link}from 'react-router-dom';
export default function Navbar() {
  return (
    <>
  
    <header className="bg-white sticky-top shadow d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1 mb-4 px-2 border-bottom ">

      <Link href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <img src='https://keerthe2001.github.io/HuntExams-The-Academy-Website/images/logo desktop2.jpg' alt='HuntExam' style={{width:'75px'}}/>
        {/* <span style={{margin:'5px',fontWeight:'bold',fontFamily: 'Autour One, cursive'}}>HuntExams</span> */}
      </Link>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
        <li><Link to="/#trendingcourse" className="nav-link px-2 link-dark">Features</Link></li>
        <li><Link to="/#studentfeedbacks" className="nav-link px-2 link-dark">Feedbacks</Link></li>
        {/* <li><Link to="/pricing" className="nav-link px-2 link-dark">Pricing</Link></li> */}
        <li><Link to="/about" className="nav-link px-2 link-dark">About</Link></li>
      </ul>

      <div className="col-md-3 text-end">
      <Link className='btn btn-primary'  to='/LoginSignUp'>Login/Signup</Link>
      </div>
    </header>

    </>
  )
}
