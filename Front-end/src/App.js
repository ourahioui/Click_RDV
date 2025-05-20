// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js' ; 
// import Slider from './pages/Slider.js' ; 
import Login from './pages/Login.js' ; 
import SendVerificationCode from './pages/SendVerificationCode.js' ; 
import UserRegisterForm from './pages/UserRegisterForm' ; 
import {Route,Routes,Router} from 'react-router-dom' ; 
function App() {
  return (
    // <Router>
        <Routes>
            <Route path="/" element={<Home/> }/>
             <Route path="/Login" element={<Login/> }/>
             
            <Route path="/Useregister" element={<UserRegisterForm/> }/>
            <Route path="/SendVerificationCode" element={<SendVerificationCode/>}/>
        </Routes>
    // </Router>
  );
}

export default App;
