import './App.css';
import React from "react";
import { BrowserRouter as Router, Link, Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "./component/AuthContext";
import LoginForm from "./component/LoginForm";
import IssueManager from "./component/issue/IssueManager";

function App() {
  const { user } = useAuth()

  const nav = user && [
    {
      title: "Home",
      to: "/",
    },
    {
      title: "Issues",
      to: "/issues",
    },
    {
      title: "Profile",
      to: "/profile",
    },
    {
      title: "Logout",
      to: "/logout",
    }
  ]

  const authenticatedRoutes = (<Router>
    <div>
      <nav>
        <ul>
          {nav?.map(navItem => {
            return <li>
              <Link to={navItem.to}>{navItem.title}</Link>
            </li>
          })}
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route exact path="/issues" element={<IssueManager />}/>
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/Logout" element={<Logout/>} />
        <Route exact path="/" element={<Home/>} />
        <Route render={() => <Navigate to="/"/>}/>
      </Routes>
    </div>
  </Router>)

  const nonAuthenticatedRoutes = (<Router>
    <Routes>
      <Route exact path="/" element={<LoginForm/>} />
      <Route path="/login" element={<LoginForm/>} />
      <Route render={() => <Navigate to="/login"/>}/>
    </Routes>
  </Router>)

  return (<>{user ? authenticatedRoutes : nonAuthenticatedRoutes}</>)

}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Logout() {
  const { removeTokens } = useAuth()
  removeTokens()
  return <Navigate to="/"/>;
}

function Profile() {
  const { user, token } = useAuth()
  return <>
    <h2>Profile</h2>
    <div>
      <strong>User</strong> {JSON.stringify(user)}
    </div>
    <div>
      <strong>Token</strong> {token}
    </div>
  </>;
}

export default App;
