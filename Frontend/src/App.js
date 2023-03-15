import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Homepage from "./pages/homepage";
import "./App.css";


function toggle(){
  const navigationbar = document.getElementById('navigationbar');
  const ulist = document.getElementById('ulist');
  navigationbar.className = navigationbar.className === 'navhorizontal' ? 'navvertical' : 'navhorizontal';
  ulist.className = ulist.className === 'horUL' ? 'verUL' : 'horUL';
}


function App() {
  return (
    <div>
      <BrowserRouter>
        <nav id="navigationbar" className='navhorizontal'>
          <ul id='ulist' className = 'horUL'>
            <li>
              <img src="https://www.home.llc/assets/images/logo.png"  id="logo" alt="logo" />
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
            <li>
              <Link to={"/homepage"}>Homepage</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/homepage" element={<Homepage />} />
        </Routes>
      </BrowserRouter>


      <button id='togglebutton' onClick={toggle}>Toggle</button>

    </div>
  );
}

export default App;
