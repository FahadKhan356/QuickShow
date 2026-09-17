import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title';
import dateFormat from '../../lib/dateFormat';
import LoadingComponent from '../../components/LoadingComponent';
import { api } from '../../lib/api';

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllShows = async () => {
      try {
        const data = await api('/admin/all-shows');
        setShows(data.shows || []);
      } catch (err) {
        console.error(err.message);
        setError(err.status === 401 || err.status === 403
          ? "Not authorized. Make sure you are logged in as an admin (role: admin)."
          : err.message);
      } finally {
        setLoading(false);
      }
    };
    getAllShows();
  }, []);

  return !isLoading ? (
    <>
      <Title text1={"List"} text2={"Shows"} />
      {error && (
        <div className='mt-4 mb-4 border border-red-500/30 bg-red-500/10 rounded-md px-4 py-3'>
          <p className='text-red-400'>{error}</p>
        </div>
      )}

      <div className='max-w-4xl mt-6 overflow-x-visible'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {shows.map((show, index) => (
              <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                <td className='p-2 min-w-45 pl-5'>{show.movie?.title}</td>
                <td className='p-2'>{dateFormat(show.showDateTime)}</td>
                <td className='p-2'>{Object.keys(show.occupiedSeats || {}).length}</td>
                <td className='p-2'>{currency} {Object.keys(show.occupiedSeats || {}).length * show.showPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : <LoadingComponent />
}

export default ListShows;