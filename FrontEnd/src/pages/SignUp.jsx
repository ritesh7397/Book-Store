import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...Values,
      [name]: value,
    });
  };

  const submit = async () => {
    try {
      const { username, email, password, address } = Values;

      if (!username || !email || !password || !address) {
        toast.error("All fields are required");
        return;
      }
      else {
        const response = await axios.post(
          "https://bookstore-vbva.onrender.com/api/user/sign-up",
           Values
        );
        toast.success(response.data.message || "Registration successful!");
        setTimeout(() => navigate('/Login'), 1000);         // Navigate after short delay to let user see the toast
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong during sign-up.");
    }

  };

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <ToastContainer position="top-right" autoClose={1000} />
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'><strong>Sign Up</strong></p>
        <div className='mt-4'>

          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>
              Username
            </label>
            <input
              type="text"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='username'
              name='username'
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>
              Email
            </label>
            <input
              type="text"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='xyz@example.com'
              name='email'
              required
              value={Values.email}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>
              Password
            </label>
            <input
              type="password"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>
              Address
            </label>
            <textarea
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              rows='5'
              placeholder='address'
              name='address'
              required
              value={Values.address}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <button
              className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
              onClick={submit}
            >
              Sign Up
            </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            Or
          </p>
          <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
            Already have an account? &nbsp;
            <Link to="/Login" className="hover:text-blue-500">
              <u>Login</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
