import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './register.css'

function Register() {
  const Navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send data to server
    await fetch("http://localhost:5000/api/register", {
      method: "POST",
      body: JSON.stringify({ firstname, lastname, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form id="registerForm" onSubmit={handleSubmit}>
        <div>
          <label>
            FirstName:
            <input
              type="text"
              value={firstname}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            LastName:
            <input
              type="text"
              value={lastname}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </div>
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
        <button id="login" type="submit">Login</button>
      </form>
      <img src="https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1600" id="background_image" alt="" />
    </div>
  );
}

export default Register;
