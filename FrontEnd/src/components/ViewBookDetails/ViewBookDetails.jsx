import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GrLanguage } from 'react-icons/gr';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const ViewBookDetails = () => {
    const { id } = useParams();
    const [Data, setData] = useState();

    useEffect(() => {
        const fetch = async () => {
            try{
            const response = await axios.get(`http://localhost:4000/api/book/get-book-by-id/${id}`);
            // console.log(response.data.data);
            // console.log(response);
            setData(response.data.data);
            }
            catch(error){
                console.log("Error while fetching book details", error);
            }
        };
        fetch();
    }, []);

    return (
        <>
        {Data && (
          <div className='px-4 md:px-12 py-8 bg-zinc-900 flex-col md:flex-row flex gap-8'>
            <div className='bg-zinc-800 rounded px-4 py-12 w-full lg:w-3/6 flex  justify-around'>
                {" "}
               <div>
                {" "}
                 <img 
                  src={Data.url} 
                  alt={Data.title} 
                  className='h-[50vh] lg:h-[70vh] rounded'
                 />
                 <div className='flex md:flex-col'>
                    <button className='bg-white rounded-full text-3xl p-3 text-red-500'>
                        <FaHeart/>
                    </button>
                    <button className='bg-white rounded-full text-3xl p-3 mt-4 text-blue-500'>
                        <FaShoppingCart/>
                    </button>
                 </div>
               </div>
            </div>
            <div className='p-4 w-full lg:w-3/6'>
                <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
                <p className='text-zinc-400 mt-1'><strong>by:</strong> {Data.author}</p>
                <p className='text-zinc-500 mt-4 text-1'><strong>Description:</strong> {Data.desc}</p>
                <p className='flex mt-4 items-center justify-start text-zinc-400'>
                    <GrLanguage className ="me-3" /> {Data.language}
                </p>
                `<p className='mt-4 text-zinc-100 text-3xl font-semibold'>
                    <strong>Price</strong>: ₹ {Data.price}
                </p>
            </div>
          </div>
         )}
         {/* If there any issue in api, Loader will be shown */}
         {!Data && (
           <div className='h-screen bg-zinc-900 flex items-center justify-center'>
              <Loader/>
            </div>
         )}
        </>
     
    )
}

export default ViewBookDetails;
