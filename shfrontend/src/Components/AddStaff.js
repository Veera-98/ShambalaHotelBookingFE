import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateAccount.css'; // Importing CSS for styling

function AddStaff() {

    let navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const validatePassword = () => {
        return password === confirmPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword()) {
            setPasswordError(true);
            return;
        }
        try {
            const response = await axios.post('http://localhost:8181/api/hotel-staff/user', {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                mobileNo: document.getElementById('mobileNo').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value, // Added password field
                role_id:1
            });
            console.log('Success:', response.data);
            if (response.status === 200) {
                alert('Added successfully.');
                navigate('/StaffDashboard');
            }
        } catch (error) {
            console.error('Error:', error);
        }


    };

    return (
        <div className="container"> {/* Changed to a proper container with CSS */}
            <form id="registerForm" onSubmit={handleSubmit} className="form-style">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" /><br /><br />
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" /><br /><br />
                <label htmlFor="mobileNo">Mobile No:</label>
                <input type="text" id="mobileNo" name="mobileNo" /><br /><br />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" /><br /><br />
                <label htmlFor="password">Password:</label> {/* Added password field */}
                <input type="password" id="password" name="password" /><br /><br />
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
}
export default AddStaff;