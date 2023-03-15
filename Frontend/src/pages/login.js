import React, { useState } from "react";
import './login.css'

function Login() {
//   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send data to server
    await fetch("http://localhost:5000/api/login", {
      method: "POST",
      body: JSON.stringify({email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.user){
          alert('login successfull!!');
          localStorage.setItem('token', data.user);
          window.location.href = "/Homepage";
        }
        else{
          alert('login failed!!');
        }
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form  id="loginform" onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button id="loginbtn" type="submit">Login</button>
      </form>

      <img id='background_image' src="https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
    </div>
  );
}

export default Login;
