import { useState } from "react";
import { userService } from "../services/api";

function UserForm({onUserAdded}){
//Form data state
const [formData,setFormData] = useState({
    name:'',
    email:''
});
const [loading,setLoading] = useState(false);
const [message,setMessage] = useState('');

// called when form is submitted
const handleSubmit = async(e) => {
    e.preventDefault(); //prevent page refresh
    setLoading(true);
    setMessage('');

    try{
        //call: POST http://localhost:8080/api/users
        await userService.createUser(formData);
        setMessage('User created successfully!');
        
        //reset form
        setFormData({name:'',email:''});

        //tell parent to refresh the user list
        onUserAdded();
    }catch(error){
        setMessage('Error creating user');
        console.error('Error:', error);
    }finally{
        setLoading(false);
    }
};

//called when user types in input fields
const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    });
};
return(
    <div className="user-form">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" name="name" placeholder="Enter name" value={formData.name}
                onChange={handleChange} required/>
            </div>
            <div className="form-group">
                <input type="email" name="email" placeholder="Enter email" value={formData.email}
                onChange={handleChange} required/>
            </div>
            <button type="submit" disabled={loading}>
                {loading?'Creating...':'Create User'}
            </button>
        </form>
        {message && <div className="message">{message}</div>}
    </div>
);
}

export default UserForm;