import React, { useLayoutEffect, useState } from "react";
import { BrowserRouter as Router, Link, Navigate, Routes, Route, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import UserDetail from "./UserDetail";

function UserDetailManager(){
    const {username} = useParams();
    const [data, setData] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState();
    const { token } = useAuth();
    const [updateTimestamp, setUpdateTimestamp] = useState(new Date())

    useLayoutEffect(() => {
        fetch(/*`${process.env.REACT_APP_BASE_URI}/employees`*/`http://localhost:8080/api/v1/users/${username}`, {
          headers: new Headers({
            'Authorization': 'Bearer ' + token,
          }),
        })
          .then(response => {
            if (response.ok) {
              return response.json()
            }
            throw new Error(`Unable to get data: ${response.statusText}`)
          })
          .then(json => setData(json))
          .catch((err) => setError(err.message))
          .finally(() => setIsPending(false))
    
      }, []);

      if(isPending){
        return "Loading...";
      }

      console.log(data);

      return (

        <div>
            {isPending && "Loading..."}
            {data && <UserDetail data={data} />}
        </div>
      );
}

export default UserDetailManager;