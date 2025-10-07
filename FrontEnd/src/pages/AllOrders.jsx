import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader/Loader'

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-vbva.onrender.com/api/user/get-all-orders",
        { headers }
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, [])
  return (
    <>
      {!AllOrders && (
        <div className='h-[100%] flex items-center justify-center'>
          {""}
          <Loader/>
        </div>
      )}
    </>
  )
}

export default AllOrders
