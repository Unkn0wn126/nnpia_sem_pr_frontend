import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import React, { useState } from 'react';

export default function LoginForm() {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({});
  const { setTokens } = useAuth();

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    data[name] = value
    setData({ ...data })
  }

  function postLogin(e) {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_BASE_URI}/api/v1/login`,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Unable to get data: ${response.statusText}`)
      })
      .then(json => {
        setTokens(json.jwttoken);
        setLoggedIn(true);
      })
      .catch((err) => {
        setIsError(err.message)
      })

  }

  if (isLoggedIn) {
    return <Navigate to="/"/>;
  }

  return (
    <div>
      <form onSubmit={postLogin}>
        <label>Username</label>
        <input type={"text"} name={"username"} onChange={handleInputChange}/>
        <label>Password</label>
        <input type={"password"} name={"password"} onChange={handleInputChange}/>
        <button>Login</button>
        {isError}
      </form>
    </div>

  )

}