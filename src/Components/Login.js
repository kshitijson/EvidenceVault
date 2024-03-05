import React, { useEffect, useState } from 'react'
import { message, Spin } from "antd";
import { clearToken } from './utils/clearToken';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from './utils/baseUrl';

import '../App.css';

export default function Login() {

    useEffect(() => {
        document.title = "EPB | Login";
    }, []);

    const navigate = useNavigate();
    const [btnText, setBtnText] = useState('Login');
    const [style, setStyle] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStyle({
            backgroundColor: "white",
            border: "1px solid #ff5e5e",
        })
        setBtnText(<Spin className='custom-spinner' />)

        const _id_ = document.getElementById("login-id").value
        const _passwd_ = document.getElementById("login-passwd").value
        const _userType_ = document.getElementById("user-type").value

        const formData = new FormData();
        formData.append('id', _id_);
        formData.append('passwd', _passwd_);
        formData.append('userType', _userType_);

        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data)

            message[`${data.messageType}`](data.messageContent);
            clearToken()
            if (data.messageType === 'success') {
                localStorage.setItem("token", data.token)
                localStorage.setItem("isLoggedIn", "true")
                if (data.user === 'admin') localStorage.setItem("isAdmin", "true")

                navigate('/');
                window.location.reload()
            } 
        } catch (error) {
            console.error('There was an error:', error);
            message.error('Server Error');
        } finally {
            setStyle(null);
            setBtnText('Submit');
            event.target.reset();
        }
    }

    return (
        <>
            <div className="container login">
                <h1 className="login-h1">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-login">
                        <label htmlFor="login-id">ID</label>
                        <input type="text" id="login-id" placeholder="Enter ID" required />
                    </div>
                    <div className="input-login">
                        <label htmlFor="input-passwd">Password</label>
                        <input type="password" id="login-passwd" placeholder="Enter Password" required />
                    </div>
                    <div className="input-login">
                        <label htmlFor="user-type">You are?</label>
                        <select id="user-type" required>
                            <option value="">Select User Type</option>
                            <option value="admin">Admin</option>
                            <option value="police">Police Department</option>
                            <option value="forensic">Forensic Department</option>
                        </select>
                    </div>
                    <div className="login-button">
                        <button type="submit" style={style}>{btnText}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

