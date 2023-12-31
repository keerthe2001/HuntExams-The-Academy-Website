import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  }
  return (
    <>

      <header >
        <div className="bg-white sticky-top shadow d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1 px-2 border-bottom ">

          <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            <img src='https://keerthe2001.github.io/HuntExams-The-Academy-Website/images/logo-desktop2.png' alt='HuntExam' style={{ width: '175px' }} />
            {/* <span style={{margin:'5px',fontWeight:'bold',fontFamily: 'Autour One, cursive'}}>HuntExams</span> */}
          </Link>
          {localStorage.getItem('userRole') === 'admin' ?
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
              <li><Link to="/admin/dashboard" className="nav-link px-2 link-secondary">Dashboard</Link></li>
              <li><Link to="/#trendingcourse" className="nav-link px-2 link-dark">Features</Link></li>
              <li><Link to="/#studentfeedbacks" className="nav-link px-2 link-dark">Feedbacks</Link></li>
              {/* <li><Link to="/pricing" className="nav-link px-2 link-dark">Pricing</Link></li> */}
              <li><Link to="/about" className="nav-link px-2 link-dark">About</Link></li>
            </ul>
            : localStorage.getItem('userRole') === 'student' ?
              <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
                <li><Link to="student/dashboard" className="nav-link px-2 link-secondary">Dashboard</Link></li>
                <li><Link to="student/feedback" className="nav-link px-2 link-dark">Feedback</Link></li>
              </ul>
              :
              <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
                <li><Link to="/#trendingcourse" className="nav-link px-2 link-dark">Features</Link></li>
                <li className="nav-item dropdown">
                  <Link className="nav-link text-dark dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Exams
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/exams/neet">NEET Exam</Link></li>
                    
                    
                  </ul>
                </li>
                <li><Link to="/#studentfeedbacks" className="nav-link px-2 link-dark">Feedbacks</Link></li>
                <li><Link to="/mcqs" className="nav-link px-2 link-dark">MCQs</Link></li>
                {/* <li><Link to="/pricing" className="nav-link px-2 link-dark">Pricing</Link></li> */}
                <li><Link to="/about" className="nav-link px-2 link-dark">About</Link></li>
              </ul>



          }


          <div className="col-md-3 text-end">
            {localStorage.getItem('token') ? <Link onClick={handleLogout} className='btn bg-dark text-light mx-2' aria-current="page" to="/login">Logout</Link> : <form>
              <Link className='btn bg-dark text-light mx-2' aria-current="page" to="/login">Login</Link>
              <Link className='btn bg-dark text-light mx-2' aria-current="page" to="/signup">Signup</Link>
            </form>}
          </div>
        </div>

        {
          localStorage.getItem('userRole') === 'admin' && (

            <div className=' sticky-top top-2 bg-dark text-light mb-1'>
              <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><Link to="/admin/dashboard" className="nav-link px-2 text-light">Dashboard</Link></li>
               
                <li className="nav-item dropdown">
                  <Link className="nav-link text-light dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Students
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/admin/studentfeedback">Student Feedback</Link></li>
                    <li><Link className="dropdown-item" to="/admin/studentlist">Students List </Link></li>
                    <li><Link className="dropdown-item" to="/admin/addstudents">Add Students</Link></li>
                    
                  </ul>
                </li>
                <li><Link to="/admin/settings" className="nav-link px-2 text-light">Settings</Link></li>
                <li className="nav-item dropdown">
                  <Link className="nav-link text-light dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    MCQs
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/admin/managemcq">Add MCQs</Link></li>
                    <li><Link className="dropdown-item" to="/admin/viewmcq">View Mcqs</Link></li>
                    <li><Link className="dropdown-item" to="/admin/mcqs">Mcqs</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link text-light dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    course
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/admin/addcourse">Add Course</Link></li>
                    <li><Link className="dropdown-item" to="/admin/courses">Course List</Link></li>
                
                  </ul>
                </li>
                {/* <li><Link to="/#trendingcourse" className="nav-link px-2 text-light ">Academic</Link></li>
                <li><Link to="/#studentfeedbacks" className="nav-link px-2 text-light">Feedbacks</Link></li> */}
                {/* <li><Link to="/pricing" className="nav-link px-2 text-light">Pricing</Link></li> */}
                {/* <li><Link to="/about" className="nav-link px-2 text-light">About</Link></li> */}
              </ul>
            </div>
          )

        }
      </header>

    </>
  )
}
