import './App.css';
import Navbar from './components/Navbar';
import Slider from './components/Slider';


import LoginSignUp from './components/LoginSignUp';

import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <>
    <Router>

      <Navbar/>
      <Routes>
          <Route index exact path="/" element={<Home/>} />
          <Route exact path="/LoginSignUp" element={<LoginSignUp/>} />
      </Routes>
    
      
      <Footer/>
        </Router>

    </>
  );
}


export default App;
