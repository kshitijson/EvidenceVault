import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { isAdmin, isLoggedIn } from './utils/localStorage';
import { clearToken } from './utils/clearToken';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

  const navigate = useNavigate();
  const [loggedIn] = useState(isLoggedIn())
  const [admin] = useState(isAdmin())

  const logout = () => {
    clearToken()
    localStorage.clear()
    window.location.reload()
  }

  return (
    <nav className='navg'>
      <div className="logo">
        <Link to="/">Evidence Vault</Link>
        <div className="under">Evidence protection</div>
        <div className="under">using blockchain</div>
      </div>
      <ul id='links'>
        <li className='link'><Link to="/">Home</Link></li>
        {loggedIn ? (
          admin ? (
            <>
              <li className='link'><Link to="/ManageUser">Manage-User</Link></li>
              <li className='link'><Link to="/Logs">Logs</Link></li>
              <li className='link'><Link to="/" onClick={logout}>Logout</Link></li>
            </>
          ) : (
            <>
              <li className='link'><Link to="/Upload">Upload</Link></li>
              <li className='link'><Link to="/View">View</Link></li>
              <li className='link'><Link to="/Delete">Delete</Link></li>
              <li className='link'><Link to="/" onClick={logout}>Logout</Link></li>
            </>
          )
        ) : (
          <>
            <li className='link'><Link to="/Login">Login</Link></li>
            <li className='link'><Link to="/Contact">Contact</Link></li>
          </>
        )
        }
      </ul >
    </nav >
  )
}
