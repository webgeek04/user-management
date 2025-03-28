import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditUser.css";


const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://reqres.in/api/users/${id}`)
            .then(response => {
                setUser(response.data.data);
            })
            .catch(error => console.error("Error fetching user:", error));
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://reqres.in/api/users/${id}`, user);
            alert("User updated successfully.");
            navigate("/users");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={user.first_name}
                    onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    value={user.last_name}
                    onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    required
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditUser;
