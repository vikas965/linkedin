import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const RegistrationComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        userrole: '',
        useremail: '',
        usernumber: '',
        userpassword: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login'); // Use the navigate function to navigate to the login page
    };

    const handleRegistration = async () => {

        if (!formData.username || !formData.userrole || !formData.useremail || !formData.usernumber || !formData.userpassword) {
            setMessage('Please Enter All Details');
            setTimeout(() => {
                setMessage('');
            }, 1500);
            return; // Do not proceed with registration if any field is empty
        }
        try {
            const response = await axios.post('https://csigmrit.com/project/userRegister.php', null, {
                params: formData,
            });

            if (response.data === 'Registration successful') {
                setMessage('Registration successful');
                setTimeout(() => {
                    setMessage('');
                    navigateToLogin(); // navigate to the login component after a delay
                }, 2000); // adjust the delay as needed
            } else {
                setMessage('Email or mobile number already exists');
                setTimeout(() => {
                    setMessage('');
                }, 1500);
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className='form-wholediv' style={{paddingTop:"15%"}}>
            <h1>Sign up here ...</h1>
            <form className='formcon' style={{paddingTop:"10%"}}>
                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        name="username" value={formData.username} onChange={handleChange}
                        className='form-control extra'
                        id='floatingInput'

                    />
                    <label htmlFor='floatingInput'>User name</label>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        name="userrole" value={formData.userrole} onChange={handleChange}
                        className='form-control extra'
                    // id='floatingInput'

                    />
                    <label htmlFor='floatingInput'>Role</label>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        type='email'
                        name="useremail" value={formData.useremail} onChange={handleChange}
                        className='form-control extra'
                    // id='floatingInput'

                    />
                    <label htmlFor='floatingInput'>Email</label>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        type='number'
                        name="usernumber" value={formData.usernumber} onChange={handleChange}
                        className='form-control extra'
                        // id='floatingInput'

                    />
                    <label htmlFor='floatingInput'>Mobile Number</label>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        type='password'
                        name="userpassword" value={formData.userpassword} onChange={handleChange}
                        className='form-control extra'
                        // id='floatingInput'

                    />
                    <label htmlFor='floatingInput'>Password</label>
                </div>







                <button className='btn btn-primary mt-4' type="button" onClick={handleRegistration}>Register</button>

                <div className="register-direct">
            Already a linkedin member ? <Link to="/login">Signin here</Link> 
        </div>
            </form>
            {message && (
                <div className="popup">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default RegistrationComponent;
