// src/pages/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create_user } from '../../actions/actions';
import AuthenticationNavigation from './authentication_navigation';
import { Button } from './buttons';
import { Requirement, validateEmail, validatePassword } from './login';
import { useDispatch } from 'react-redux';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showRequirement, setShowRequirement] = useState(false)
  const [formData, setFormData] = useState({
    firstname : '',
    lastname : "",
    email : '',
    password : '',
    password2 : ''
  });
  // const dispatch = useDispatch()
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    formData.username = formData.email
    e.preventDefault();
    setError('');
    if (!formData.username || !formData.email || !formData.password || formData.password != formData.password2) {
      console.log(formData.username)
      setError('All fields are required.');
      return;
    }
    try {
      // console.log('creating the callback');
      
      const creareuser = create_user(formData, navigate)
      creareuser(dispatch)
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="h-lvh bg-gradient-to-b from-[#bfdbfe] to-white">
      <div className='flex'>
        <AuthenticationNavigation right_text={{button_name : "Login", before_button : "Have an account?", navigation : "/login"}} />
      </div>
      <div id='body' className='flex'>
        <div id='left' className='w-[50%] justify-items-center align-middle mt-52'>
          <p>Company Logo</p>
        </div>

        <div className='justify-items-center mt-9'>
          <div className='bg-white rounded justify-items-center p-5 m-4'>
            <h2 className='p-5'>Sign Up</h2>
            <div className='flex'>
              <input type="text" name="firstname" id="firstname"  placeholder='First Name' className='text-sm p-2 w-48 m-2 rounded bg-slate-100 outline-none' onChange={handleChange}/>
              <input type="text" name="lastname" id="lastname"  placeholder='Last Name' className='text-sm p-2 m-2 w-48 rounded bg-slate-100 outline-none' onChange={handleChange}/>
            </div>
            <div className='flex flex-col gap-4 mt-2'>
              <input type="text" name='email' placeholder='Email Address' className='text-sm p-2 bg-slate-100 w-[25rem] outline-none rounded' onChange={handleChange}/>
              <input type="password" name='password' placeholder='Password' className='text-sm p-2 bg-slate-100 w-[25rem] outline-none rounded' onChange={handleChange}/>
              <input type="password" name='password2' placeholder='Confirm Password' className='text-sm p-2 bg-slate-100 w-[25rem] outline-none rounded' onChange={handleChange}/>
              <button className= "text-sm bg-black w-36 rounded p-3 mt-3 mb-32 text-white" onClick = {(event) =>{handleSubmit(event)}}>Register</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
