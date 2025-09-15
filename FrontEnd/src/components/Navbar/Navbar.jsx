import React from 'react'
import book from  '../../assets/book.png'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";

const Navbar = () => {
    const links=[
        {
            title: "Home",
            link:"/",
        },
        {
            title: "All Books",
            link:"/all-books",
        },
        {
            title: "Cart",
            link:"/cart",
        },
        {
            title: "Profile",
            link:"/profile",
        },
    ];
    
  return (
        // LEFT SIDE
    <>
      <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
        <Link to="/" className='flex items-center'>
            <img 
              className='h-10 me-4' 
              src={book}
              alt='logo'
            />
            <h1 className='text-2xl font-semibold'>BookHeaven</h1>
        </Link>
         {/* RIGHT SIDE */}
        <div className='nav-links-bookheaven bloack md:flex items-center gap-4'>
          <div className='hidden md:flex gap-4'>
            {links.map((items, i) =>(
             <Link to={items.link}
               className='hover:text-blue-500 transition-all duration-300'
                key={i}
             >
                {items.title}
             </Link>
            ))}
          </div>
          <div className='hidden md:flex gap-4'>
            <Link to="/Login" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>
              LogIn
            </Link>
            <Link to="/SignUp" className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>
              SignUp
            </Link>
          </div>
          <button className='text-white text-2xl hover:text-zinc-400'>
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div className='bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-between'>
        {links.map((items, i) =>(
          <Link 
            to={items.link}
            className='hover:text-blue-500 transition-all duration-300'
            key={i}
          >
            {items.title}
          </Link>
            ))}
      </div>
    </>
  );
};

export default Navbar
