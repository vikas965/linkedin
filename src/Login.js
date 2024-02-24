import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Login.css';
import loginlogo from './assets/loginlogo.png';
import { Link } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    userIdentifier: '',
    userPassword: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    // Check if any required field is empty

    if (!formData.userIdentifier || !formData.userPassword) {
      setMessage('Please Enter Both Email and Password');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return; // Do not proceed with login if any field is empty
    }

    // Start loading
    setLoading(true);

    try {
      const response = await axios.post('https://csigmrit.com/project/userLogin.php', formData);

      if (response.data.status === 'success') {
        // Set user ID in local storage
        localStorage.setItem('user_id', response.data.user_id);

        setMessage('Login successful');
        setTimeout(() => {
          setMessage('');
          // Redirect to the dashboard after login
          window.location.href = '/'; // You can use react-router navigation here
        }, 2000);
      } else {
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // Stop loading, whether login succeeded or failed
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className='form-wholediv'>
      <img src={loginlogo} alt='' />

      <form className='formcon'  onSubmit={(e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  handleLogin(); // Call your login function
}}>
        <div className='form-floating mb-3'>
          <input
            type='email'
            name='userIdentifier'
            value={formData.userIdentifier}
            onChange={handleChange}
            className='form-control extra'
            id='floatingInput'
            placeholder='name@example.com'
          />
          <label htmlFor='floatingInput'>Email address</label>
        </div>
        <div className='form-floating'>
          <input
            type={passwordVisible ? 'text' : 'password'}
            name='userPassword'
            value={formData.userPassword}
            onChange={handleChange}
            className='form-control extra'
            id='floatingPassword'
            placeholder='Password'
          />
          <label htmlFor='floatingPassword'>Password</label>
          <i
            onClick={togglePasswordVisibility}
            className={`fa-regular fa-eye${passwordVisible ? '-slash' : ''} eyeclass`}
          ></i>
        </div>

        <br />
        {/* Bootstrap Button for Submission */}
        <button type='submit' className='btn btn-primary' onClick={handleLogin} disabled={loading}>
          {loading ? (
            <>
              <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
              <span className='visually-hidden'>Loading...</span>
            </>
          ) : (
            'Login'
          )}
        </button>


        <div className="register-direct">
            Not a linkedin member ? <Link to="/register">Signup here</Link> 
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

export default Login;
