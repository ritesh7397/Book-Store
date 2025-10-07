import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);

    return (
        <>
            {role === "user" && (
                <div className="w-full flex flex-row items-center justify-around mt-4 bg-zinc-800 p-2 rounded-md shadow-sm md:hidden">
                    <Link
                        to="/profile"
                        className="text-zinc-100 text-sm font-medium px-3 py-2 rounded hover:bg-zinc-700 transition-all duration-200"
                    >
                        Favourites
                    </Link>
                    <Link
                        to="/profile/orderHistory"
                        className="text-zinc-100 text-sm font-medium px-3 py-2 rounded hover:bg-zinc-700 transition-all duration-200"
                    >
                        Order History
                    </Link>
                    <Link
                        to="/profile/settings"
                        className="text-zinc-100 text-sm font-medium px-3 py-2 rounded hover:bg-zinc-700 transition-all duration-200"
                    >
                        Settings
                    </Link>
                </div>
            )}

            {role === "admin" && (
                <div className="w-full flex flex-row items-center justify-around mt-4 bg-zinc-800 p-2 rounded-md shadow-sm md:hidden">
                    <Link
                        to="/profile"
                        className="text-zinc-100 text-sm font-medium px-3 py-2 rounded hover:bg-zinc-700 transition-all duration-200"
                    >
                        All Orders
                    </Link>
                    <Link
                        to="/profile/add-book"
                        className="text-zinc-100 text-sm font-medium px-3 py-2 rounded hover:bg-zinc-700 transition-all duration-200"
                    >
                        Add Book
                    </Link>
                </div>
            )}
        </>

    );
};

export default MobileNav;
