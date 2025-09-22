import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {authActions} from '../store/auth';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...Values,
      [name]: value,
    });
  };

  const submit = async () => {
    try {
      const { username, password } = Values;

      if (!username || !password) {
        toast.error("All fields are required");
        return;
      }
      else {
        const response = await axios.post(
          "http://localhost:4000/api/user/sign-in", 
          Values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        toast.success(response.data.message || "Login successful!");
        // console.log(response.data.id);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setTimeout(() => navigate('/profile'), 1000);
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong during sign-up.");
    }
  }
  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <ToastContainer />
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'><strong>Login</strong></p>
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
            <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600' onClick={submit}>
              LogIn
            </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            Or
          </p>
          <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
            Don't have an account? &nbsp;
            <Link to="/signup" className="hover:text-blue-500">
              <u>Sign Up</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
