import React, { useEffect, useState } from 'react'
import { message, Spin } from "antd";
import '../../App.css';
import { baseUrl } from '../utils/baseUrl';
import { clearToken } from '../utils/clearToken';
import { useNavigate } from 'react-router-dom';

export default function ManageUser() {

    useEffect(() => {
        document.title = "EPB | Admin | Add/Delete User";
    }, []);

    const navigate = useNavigate();
    const [btnText, setBtnText] = useState('Submit');
    const [style, setStyle] = useState(null);

    const [operation, setOperation] = useState(""); // Initialize operation state

    const addUser = async (formData) => {
        const response = await fetch(`${baseUrl}/admin/add`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        message[`${data.messageType}`](data.messageContent);
    }

    const deleteUser = async (formData) => {
        const response = await fetch(`${baseUrl}/admin/delete`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        message[`${data.messageType}`](data.messageContent);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStyle({
            backgroundColor: "white",
            border: "1px solid #ff5e5e",
        })
        setBtnText(<Spin className='custom-spinner' />)

        const _id_ = document.getElementById("manage-id").value
        const _name_ = document.getElementById("manage-passwd") ? document.getElementById("manage-passwd").value : null
        const _userType_ = document.getElementById("user-type").value

        const formData = new FormData();
        formData.append('id', _id_);
        formData.append('name', _name_);
        formData.append('userType', _userType_);


        try {
            if (document.getElementById("operation").value === 'add') {
                await addUser(formData)
            } else if (document.getElementById("operation").value === "delete") {
                await deleteUser(formData)
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
            <div className="container manage">
                <h1 className="manage-h1">Add / Delete User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-manage">
                        <label htmlFor="operation">Operation</label>
                        <select
                            id="operation"
                            required
                            value={operation} // Set the value from the state
                            onChange={(e) => setOperation(e.target.value)} // Update state when the select changes
                        >
                            <option value="">What Operation to Perform?</option>
                            <option value="add">Add User</option>
                            <option value="delete">Delete User</option>
                        </select>
                    </div>
                    <div className="input-manage">
                        <label htmlFor="manage-id">ID</label>
                        <input type="text" id="manage-id" placeholder="Enter ID" required />
                    </div>
                    {operation === "add" ? (
                        <>
                            <div className="input-manage">
                                <label htmlFor="input-passwd">Name</label>
                                <input type="text" id="manage-passwd" placeholder="Enter Name" />
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                    <div className="input-manage">
                        <label htmlFor="user-type">Organization</label>
                        <select id="user-type" required>
                            <option value="">Select Organization</option>
                            <option value="admin">Admin</option>
                            <option value="police">Police Department</option>
                            <option value="forensic">Forensic Department</option>
                        </select>
                    </div>
                    <div className="manage-button">
                        <button type="submit" style={style}>{btnText}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

