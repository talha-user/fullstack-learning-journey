import React, { useEffect, useState } from "react";
import { userService } from "../services/api";

function UserList(){
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState('');

    useEffect(()=>{
        fetchUsers();
    }, []);

    const fetchUsers=async()=>{
        try{
            setLoading(true);
            const response = await userService.getAllUsers();
            setUsers(response.data);
        }catch(err){
            setError('Failed to fetch users from server');
            console.error('Error:', err);
        }finally{
            setLoading(false);
        }
    };
    
    if(loading) return <div className="loading">Loading users... </div>;
    if(error) return <div className="error">{error}</div>;
// Main render what users see
    return (
        <div className="user-list">
            <h2>Users ({users.length})</h2>

            {users.length===0?(
                <p>No users found. Create one below!</p>
            ):(
                <div className="users">
                    {users.map(user=>(
                        <div key={user.id} className="user-card">
                            <h3>{user.name}</h3>
                            <p>Email: {user.email}</p>
                            <small>Created: {user.createdAt}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default UserList;