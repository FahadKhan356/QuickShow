import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/BlurCircle';
import LoadingComponent from '../components/LoadingComponent';
import { api } from '../lib/api';

const Favorite = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await api('/user/favorites');
                setMovies(data.movies || []);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return isLoading ? <LoadingComponent /> : (movies.length > 0 ? (
        <div className='my-40 mb-60 px-60 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
            <h1 className='text-lg font-medium my-4'>Your Favorite Movies</h1>
            <BlurCircle top='150px' left='0' />
            <BlurCircle bottom='50px' right='-50px' />
            <div className='flex flex-wrap max-sm:justify-center gap-8'>
                {movies.map((movie) => (<MovieCard movie={movie} key={movie._id} />))}
            </div>
        </div>
    ) : (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-center text-3xl font-bold my-4'>
                No favorites available
            </h1>
        </div>
    ));
}
export default Favorite;