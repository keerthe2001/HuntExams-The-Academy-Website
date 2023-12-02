import './App.css';
import Navbar from './components/Navbar';



import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
import Features from './components/Features';
import Dashboard from './components/admin/Dashboard';
import StudentDashboard from './components/students/StudentDashboard';
import StudentFeedback from './components/students/StudentFeedback';
import FeedbackState from './context/feedbackstate';
import ManageStudents from './components/admin/ManageStudents';
import AddStudent from './components/admin/AddStudent';
import StudentFeedbacks from './components/admin/StudentFeedbacks';
import StudentState from './context/StudentState';
import ManageFeedbacks from './components/admin/ManageFeedbacks';

function App() {
  const [alert, setAlert] = useState({msg:"",Type:""});

  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      Type:type
      });

      setTimeout(() => {
        setAlert(null);
      }, 1500);
  }

  return (
    <>
    <FeedbackState>
      <StudentState>
    <Router>

      <Navbar/>
      <Alert alert={alert}/>

      <Routes>
          <Route index exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/trendingcourse" element={<Features/>} />
          <Route showAlert={showAlert} exact path="/signup" element={<Signup/>} />
          <Route exact path="/admin/dashboard" element={<Dashboard/>} />
          <Route exact path="/admin/studentlist" element={<ManageStudents/>} />
          <Route exact path="/admin/studentfeedback" element={<ManageFeedbacks/>} />
          <Route exact path="/admin/addstudents" element={<AddStudent/>} />
          <Route exact path="/admin/addstudents/:id" element={<AddStudent/>} />
          <Route exact path="/admin/studentfeedbacks" element={<StudentFeedbacks/>} />
          <Route exact path="/student/dashboard" element={<StudentDashboard/>} />
          <Route exact path="/student/feedback" element={<StudentFeedback/>} />
      </Routes>
    
      
      <Footer/>
        </Router>
        </StudentState>
        </FeedbackState>

    </>
  );
}


export default App;
