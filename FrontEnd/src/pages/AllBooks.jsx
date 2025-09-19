import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import axios from 'axios';

const AllBooks = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:4000/api/book/get-all-books");
      // console.log(response.data.data);
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
      <h4 className='text-3xl text-yellow-100'>All books</h4>
      {/* If there any issue in api, Loader will be shown */}
      {!Data && (
        <div className='h-screen bg-zinc-900 flex items-center justify-center'>
          <Loader />{""}
        </div>
      )}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
        {Data &&
          Data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default AllBooks
