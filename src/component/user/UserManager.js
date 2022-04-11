import React, { useLayoutEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import IssueList from "./IssueList";

function UserManager(props){
    const [data, setData] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState();
    const { token } = useAuth();
    const [updateTimestamp, setUpdateTimestamp] = useState(new Date())

    useLayoutEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URI}api/v1/users`, {
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

      return (

        <div>
            {isPending && "Loading..."}
            {data && <IssueList data={data} />}
        </div>
      );
}

export default UserManager;