// src/pages/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create_user } from '../../actions/actions';
import AuthenticationNavigation from './authentication_navigation';
import { Button } from './buttons';
import { Requirement, validateEmail, validatePassword } from './login';

function Register() {
  const navigate = useNavigate();
  const [showRequirement, setShowRequirement] = useState(false)

  const [formData, setFormData] = useState({
    firstname : '',
    lastname : "",
    email : '',
    password : '',
    password2 : ''
  });
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.password != formData.password2) {
      setError('All fields are required.');
      return;
    }

    try {
      create_user(firstname, lastname, email, password, navigate)
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
              <input type="text" name="firstname" id="firstname"  placeholder='First Name' className='p-2 m-2 rounded bg-slate-100 outline-none'/>
              <input type="text" name="lastname" id="lastname"  placeholder='Last Name' className='p-2 m-2 rounded bg-slate-100 outline-none'/>
            </div>
            <div className='flex flex-col gap-4 mt-2'>
              <input type="text" name='Email' placeholder='Email Address' className='p-2 bg-slate-100 w-[25rem] outline-none'/>
              <input type="text" name='Password' placeholder='Password' className='p-2 bg-slate-100 w-[25rem] outline-none'/>
              <input type="text" name='Password2' placeholder='Confirm Password' className='p-2 bg-slate-100 w-[25rem] outline-none'/>
              <Button Icon={undefined}  button_name = "register" className = "bg-black w-36 rounded p-3 mt-3 mb-32 text-white" onClick = {()=>{
                if(validateEmail(email), validatePassword(password)){
                  create_user(formData.firstname, formData.lastname, formData.email, formData.password, formData.password2)
                }
              }}/>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
