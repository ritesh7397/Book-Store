import React from 'react'
import book from  '../../assets/book.png'
const Navbar = () => {
    const links=[
        {
            title: "Home",
            link:"/",
        },
        {
            title: "About Us",
            link:"/about-us",
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
    <div className='flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
        <div className='flex items-center'>
            <img 
              className='h-10 me-4' 
              src={book}
              alt='logo'
            />
            <h1 className='text-2xl font-semibold'>BookHeaven</h1>
        </div>
        <div className='nav-links-bookheaven flex items-center gap-4'>
          <div className='flex gap-4'>
            {links.map((items, i) =>(
             <div className='hover:text-blue-500 transition-all duration-300' key={i}>{items.title}</div>
            ))}
          </div>
          <div className='flex gap-4'>
            <button className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</button>
            <button className='px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</button>
          </div>
        </div>
    </div>
  );
};

export default Navbar
