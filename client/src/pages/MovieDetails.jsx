import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BlurCircle from '../components/BlurCircle';
import { Heart, PlayIcon, StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeformat';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard';
import LoadingComponent from '../components/LoadingComponent';
import { api } from '../lib/api';
import { tmdbImage } from '../lib/tmdbImage';

const MovieDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [show, setShow] = useState(null);
    const [similar, setSimilar] = useState([]);

    const getShow = async () => {
        try {
            const data = await api(`/show/${id}`);
            if (data.movie) {
                setShow({
                    movie: data.movie,
                    dateTime: data.datetime || {},
                });
            }
            // "You may also like" movies
            const all = await api('/show/now-playing');
            setSimilar((all.movie || []).filter((m) => (m._id || m.id) !== id).slice(0, 4));
        } catch (error) {
            console.error(error.message);
            setShow(null);
        }
    }

    useEffect(() => {
        getShow();
    }, [id]);

    return show ? (
        <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>

            <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
                <img src={tmdbImage(show.movie.poster_path, 'w780')} alt='' className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover bg-gray-700' />

                <div className='relative flex flex-col gap-3'>
                    <BlurCircle top='100px' left='100px' />
                    <p className='text-primary'>English</p>
                    <h1 className='text-4xl max-w-96 font-semibold text-balance'>{show.movie.title}</h1>
                    <div className='flex gap-2 items-center text-gray-300'>
                        <StarIcon className='w-5 h-5 text-primary fill-primary'></StarIcon>
                        {show.movie.vote_average?.toFixed(1)} User Rating
                    </div>
                    <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>
                    <p>{timeFormat(show.movie.runtime)} . {show.movie.genres?.map((g) => g.name).join(",")} . {show.movie.release_date?.split("-")[0]}</p>

                    <div className='flex flex-wrap items-center gap-4'>
                        <button className='flex gap-2 bg-gray-800 hover:bg-gray-900 transition rounded-md px-7 py-3 text-sm cursor-pointer active:scale-95'>
                            <PlayIcon className='w-5 h-5' />
                            Watch Trailer
                        </button>
                        <a href='#dateSelect' className='bg-primary rounded-md px-7 py-3 text-sm cursor-pointer active:scale-95 hover:bg-primary-dull'>Buy Tickets</a>
                        <button className='bg-gray-700 rounded-full p-2.5 active:scale-95 cursor-pointer transition'>
                            <Heart className='w-5 h-5' />
                        </button>
                    </div>
                </div>
            </div>

            <p className='text-lg mt-20 font-medium'>Your Favorite Cast</p>

            <div className='overflow-x-auto gap-4 no-scrollbar mt-8 pb-4'>
                <div className='flex items-center gap-4 no-scrollbar w-max px-4'>
                    {(show.movie.casts || []).slice(0, 12).map((cast, index) => (
                        <div key={index} className='flex flex-col items-center text-center'>
                            <img className='rounded-full h-20 aspect-square object-cover bg-gray-700' src={tmdbImage(cast.profile_path, 'w185')} alt='' />
                            <p className='font-medium text-xs mt-3'>{cast.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {Object.keys(show.dateTime).length === 0 && (
                <div className='text-center mt-8 border border-primary/20 rounded-lg p-6'>
                    <p className='text-lg font-semibold'>No shows scheduled yet</p>
                    <p className='text-sm text-gray-400'>No shows are scheduled for this movie yet. Please check back later.</p>
                </div>
            )}

            <DateSelect datetime={show.dateTime} id={id} />

            {similar.length > 0 && (
                <>
                    <p className='text-sm mt-20'>You May Also Like</p>
                    <div className='flex flex-nowrap max-sm:justify-center gap-2 mt-4'>
                        {similar.map((movie, index) => (<MovieCard movie={movie} key={movie._id || index} />))}
                    </div>
                </>
            )}

            <div className='flex justify-center mt-20'>
                <button onClick={() => { navigate('/movies'); scrollTo(0, 0) }} className='bg-primary hover:bg-primary-dull px-10 py-3 rounded-md font-medium cursor-pointer'>
                    Show More
                </button>
            </div>

        </div>

    ) : <LoadingComponent />
}
export default MovieDetails;