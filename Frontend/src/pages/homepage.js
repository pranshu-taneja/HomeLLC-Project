import React from 'react'
import { useEffect, useState } from 'react'
// import jwt from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import './homepage.css'

function Homepage() {
  
  const [UserName, SetUserName] = useState();

  const navigate = useNavigate();

  async function fetchUsername(){
    const req = await fetch(`http://localhost:5000/api/username`, {
      headers:{
        'x-access-token': localStorage.getItem('token')
      },
    })
    const data = await req.json();
    // console.log(data);

    SetUserName(data.firstname + " " + data.lastname);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      fetchUsername();
    }
    else{
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [])

  function Logout(){
    localStorage.removeItem('token');
    navigate('/login');
  }
  

  return (
    <div>
      <h1 id='username'>{UserName?UserName:'loading'}</h1>
      <button id='logout' onClick={Logout}>Logout</button>

      <img id='background_image' src="https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
    </div>

  )
}

export default Homepage