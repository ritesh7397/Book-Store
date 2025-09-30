import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
import cart from "../assets/cart.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };


  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:4000/api/user/get-user-cart",
        { headers }
      );

      setCart(res.data.data);
    };
    fetch();
  }, [Cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `http://localhost:4000/api/user/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    toast.success(response.data.message);
  }

  // Adding Price
  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [Cart]);

const PlaceOrder = async () => {
  try {
    const formattedCart = Cart.map(item => ({
      _id: item._id || item.id,
    }));

    const response = await axios.post(
      "http://localhost:4000/api/user/place-order",
      { order: formattedCart },
      { headers }
    );

    toast.success(response.data.message || "Order placed successfully!");
    setTimeout(() => {
      navigate("/profile/orderHistory");
    }, 1000);

  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message || "Failed to place order");
    } else {
      toast.error("Network Error: " + error.message);
    }
  }
};


  return (
    <div className='bg-zinc-900 px-12 py-8 w-full'>
      <ToastContainer position="top-right" autoClose={1000} />
      {!Cart && <div className='w-full h-screen flex items-center justify-center'><Loader /></div>}
      {Cart && Cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Empty Cart
            </h1>
            <img
              src={cart}
              alt="empty-cart"
              className='lg:h-[50vh]'
            />
          </div>
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>

          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
            Your Cart
          </h1>
          {Cart.map((items, i) => (
            <div
              className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center gap-12'
              key={i}
            >
              <img
                src={items.url}
                alt={items.title}
                // className='h-[20vh] md:h-[10vh] object-cover'
                className='h-[20vh] w-[80px] object-cover bg-zinc-700 rounded md:h-[10vh]'
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/80x100?text=No+Image';
                }}
              />
              {/* <div className='w-full md:w-auto'> */}
              <div className='flex-1 w-full md:w-auto'>
                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                  {items.title}
                </h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                  {items.desc.slice(0, 100)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>
                  {items.desc.slice(0, 65)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 block md:hidden'>
                  {items.desc.slice(0, 100)}...
                </p>
              </div>
              {/* <div className='flex-mt-4 w-full md:w-auto items-center justify-between'> */}
              <div className='flex items-center gap-4 mt-4 md:mt-0 md:w-auto'>

                <h2 className='text-zinc-100 text-3xl font-semibold flex items-center'>
                  ₹ {items.price}
                </h2>
                <button
                  className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-4'
                  onClick={() => deleteItem(items._id)}
                >
                  <AiFillDelete />
                </button>
              </div>

            </div>
          ))}
        </>
      )}

      {Cart && Cart.length > 0 && (
        <div className='mt-6 mb-10 w-full flex items-center justify-end'>
          <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-3xl text-zinc-200 font-semibold'>
              Total Amount
            </h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
              <h2>{Cart.length} books</h2><h2>₹ {Total}</h2>
            </div>
            <div className='w-[100%] mt-3'>
              <button
                className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200'
                onClick={PlaceOrder}
              >
                Place Your Order
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default Cart
