import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import "./UsersList.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';



const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`https://reqres.in/api/users?page=${currentPage}`)
            .then(response => {
                setUsers(response.data.data);
                setTotalPages(response.data.total_pages);
            })
            .catch(error => console.error("Error fetching users:", error));
    }, [currentPage]);


    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };


    const filteredUsers = users.filter(user =>
        user.first_name.toLowerCase().includes(searchQuery) ||
        user.last_name.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery)
    );


    const handleDelete = (id) => {
        axios.delete(`https://reqres.in/api/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== id)); // Remove user from state
                toast.success('User Deleted Successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
            .catch(error => console.error("Error deleting user:", error));
    };


    const handleEdit = (user) => {
        setEditingUser(user);
    };


    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`https://reqres.in/api/users/${editingUser.id}`, editingUser)
            .then(() => {
                setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
                setEditingUser(null);
                toast.success('User Updated Successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
            .catch(error => console.error("Error updating user:", error));
    };


    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="user-list-container">
            <h1>Users List</h1>

            { }
            <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
            />

            <button className="logout-btn" onClick={handleLogout}>Logout</button>

            { }
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td><img src={user.avatar} alt="avatar" className="user-avatar" /></td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td className="action-buttons">
                                    <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-users">No users found!</td>
                        </tr>
                    )}
                </tbody>
            </table>

            { }
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />

            { }
            {editingUser && (
                <div className="edit-modal">
                    <div className="edit-user-container">
                        <h3>Edit User</h3>
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                value={editingUser.first_name}
                                onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })}
                            />
                            <input
                                type="text"
                                value={editingUser.last_name}
                                onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
                            />
                            <input
                                type="email"
                                value={editingUser.email}
                                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                            />
                            <button className="save-btn" type="submit">Save</button>
                            <button className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default UsersList;
