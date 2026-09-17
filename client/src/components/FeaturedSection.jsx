import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import MovieCard from './MovieCard'
import LoadingComponent from './LoadingComponent'
import { api } from '../lib/api'


const FeaturedSection = () => {
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const load = async () => {
            try {
                const data = await api('/show/now-playing');
                setMovies((data.movie || []).slice(0, 4));
            } catch (error) {
                console.error(error.message);
            }
        };
        load();
    }, []);

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
            <div className='relative flex items-center justify-between pt-20 pb-10' >
                <BlurCircle top='0' right='-80px' />
                <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
                <button onClick={() => navigate('/Movies')} className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'>View All
                    <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5' />
                </button>
            </div>

            <div className='flex'>
                {movies.map((show) => (
                    <MovieCard key={show._id} movie={show}></MovieCard>
                ))}
            </div>

            <div className='flex justify-center mt-20'>
                <button onClick={() => { navigate('/Movies'); scrollTo(0, 0) }} className='px-6 py-3 rounded-md bg-primary hover:bg-primary-dull transition font-medium cursor-pointer'>show more</button>
            </div>
        </div>
    )
}

export default FeaturedSection