import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-vbva.onrender.com/api/user/get-user-information",
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.data });
    };
    fetch();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const submitAddress = async () => {
    const response = await axios.put(
      "https://bookstore-vbva.onrender.com/api/user/update-address",
      Value,
      { headers }
    );
    toast.success(response.data.message);
  };

  return (
    <>
      {!ProfileData && (
        <div className='w-full h-[100%] flex justify-center items-center'>
          <Loader />
        </div>
      )}

      {ProfileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <ToastContainer position="top-right" autoClose={1000} />
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor=''>Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {ProfileData.username}
              </p>
            </div>
            <div className=''>
              <label htmlFor=''>Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {ProfileData.email}
              </p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor=''>Address</label>
            <textarea
              className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              rows="5"
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={change}
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <button
              className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300'
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
