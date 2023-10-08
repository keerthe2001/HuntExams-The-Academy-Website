import './App.css';
import Navbar from './components/Navbar';
import Slider from './components/Slider';


import LoginSignUp from './components/LoginSignUp';

import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
    <Router>

      <Navbar/>
      <Routes>
          <Route path="/LoginSignUp" element={<LoginSignUp/>}>
          </Route>
        </Routes>
    
      <Slider/>
      <Footer/>
        </Router>

    </>
  );
}


export default App;
