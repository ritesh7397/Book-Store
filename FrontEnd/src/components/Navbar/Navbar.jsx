import React, { useState } from 'react';
import book from '../../assets/book.png';
import { Link } from 'react-router-dom';
import { FaGripLines } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const links = [
    { 
      title: 'Home', 
      link: '/' 
    },
    { 
      title: 'All Books', 
      link: '/all-books'
    },
    { 
      title: 'Cart',
       link: '/cart'
    },
    { 
      title: 'Profile', 
      link: '/profile' 
    },
];

// With the help of redux we can hide profile and cart link when user is not logged in
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if(isLoggedIn === false){
      links.splice(2,2);
    }

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      {/* DESKTOP & TOP NAVBAR */}
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img className="h-10 me-4" src={book} alt="logo" />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>

        {/* NAV LINKS & BUTTONS */}
        <div className="flex items-center gap-4">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-4">
            {links.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                className="hover:text-blue-500 transition-all duration-300"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-4">
            <Link
              to="/Login"
              className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              SignUp
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      {/* MOBILE NAVIGATION OVERLAY */}
      {isMobileNavOpen && (
        <div className="bg-zinc-800 h-screen fixed top-0 left-0 w-full z-40 flex flex-col items-center justify-center">
          {links.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
              onClick={() => setIsMobileNavOpen(false)} // close menu on click
            >
              {item.title}
            </Link>
          ))}

          <Link
            to="/Login"
            className="px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded hover:bg-white text-white hover:text-zinc-800 transition-all duration-300"
            onClick={() => setIsMobileNavOpen(false)}
          >
            LogIn
          </Link>
          <Link
            to="/SignUp"
            className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            onClick={() => setIsMobileNavOpen(false)}
          >
            SignUp
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
