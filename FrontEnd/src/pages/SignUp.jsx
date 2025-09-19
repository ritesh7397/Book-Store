import React from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
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
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>
              Email
            </label>
            <input 
              type="text" 
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='xyx@example.com' 
              name='email'
              required
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
            />
          </div>
          <div className='mt-4'>
            <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600'>
              Sign Up
            </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            Or
          </p>
          <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
            Already have an account? &nbsp;
            <Link to="/login" className="hover:text-blue-500">
              <u>Login</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
