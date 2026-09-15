import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets/assets';
import LoadingComponent from '../components/LoadingComponent';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import isoTimeFormat from '../lib/isoTimeFormat';
import BlurCircle from '../components/BlurCircle';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import { api } from '../lib/api';

const SeatLayout = () => {
    const { id, date } = useParams();

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [show, setShow] = useState(null);
    const [occupiedSeats, setOccupiedSeats] = useState([]);

    const { isSignedIn } = useAuth();
    const navigate = useNavigate();
    const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];

    // Load movie + the datetime/times for that movie from the backend
    useEffect(() => {
        const getShow = async () => {
            try {
                const data = await api(`/show/${id}`);
                setShow({ movie: data.movie, dateTime: data.datetime || {} });
            } catch (error) {
                toast.error(error.message);
            }
        };
        getShow();
        // reset state when movie/date changes
        setSelectedTime(null);
        setSelectedSeats([]);
        setOccupiedSeats([]);
    }, [id, date]);

    // When a show time is selected, load the already-occupied seats
    useEffect(() => {
        if (!selectedTime) return;
        const loadOccupied = async () => {
            try {
                const data = await api(`/booking/seats/${selectedTime.showId}`);
                setOccupiedSeats(data.occupiedSeats || []);
            } catch (error) {
                setOccupiedSeats([]);
            }
        };
        loadOccupied();
        setSelectedSeats([]);
    }, [selectedTime]);

    const renderSeat = (row, count = 9) => (
        <div key={row} className='flex gap-2 mt-2'>
            <div className='flex flex-wrap items-center justify-center gap-2'>
                {Array.from({ length: count }, (_, i) => {
                    const seatid = `${row}${i + 1}`;
                    const isOccupied = occupiedSeats.includes(seatid);
                    const isSelected = selectedSeats.includes(seatid);
                    return (
                        <button
                            onClick={() => !isOccupied && handleSeatClick(seatid)}
                            key={seatid}
                            disabled={isOccupied}
                            className={`w-8 h-8 rounded border border-primary60 cursor-pointer ${isSelected ? "bg-primary text-white"
                                : isOccupied ? "bg-gray-600 text-gray-500 cursor-not-allowed"
                                    : ""}`}
                        >
                            {seatid}
                        </button>
                    )
                })}
            </div>
        </div>
    );

    const handleSeatClick = (seatid) => {
        if (!selectedTime) {
            return toast("Please select time first")
        }
        if (!selectedSeats.includes(seatid) && selectedSeats.length > 4) {
            return toast("You can only select 5 seats")
        }
        setSelectedSeats(prev => prev.includes(seatid) ? prev.filter(seat => seat !== seatid) : [...prev, seatid])
    }

    const handleBook = async () => {
        if (!selectedTime) return toast("Please select a show time");
        if (selectedSeats.length === 0) return toast("Please select at least one seat");
        if (!isSignedIn) return toast("Please login to book tickets");

        try {
            await api('/booking/create', {
                method: 'POST',
                body: { showId: selectedTime.showId, selectedSeats },
            });
            toast.success("Booked successfully");
            navigate('/MyBookings');
        } catch (error) {
            toast.error(error.message);
        }
    }

    return show ? (
        <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
            {/* available times */}
            <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
                <p className='text-lg font-semibold px-6'>Available Timings</p>
                <div>
                    {(show.dateTime[date] || []).map((item) =>
                        <div key={item.time} onClick={() => setSelectedTime(item)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.showId === item.showId ? "bg-primary text-white" : "hover:bg-primary/20"}`}>
                            <ClockIcon className='w-4 h-4' />
                            <p className='text-sm'>{isoTimeFormat(item.time)}</p>
                        </div>)}
                </div>
            </div>
            {/* seat layout */}
            <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
                <BlurCircle top='-100px' left='-100px' />
                <BlurCircle bottom='-0' right='0' />
                <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
                <img src={assets.screenImage} alt='screen' />
                <p className='text-gray-400 text-sm mb-6'>Screen Side</p>

                <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
                    <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
                        {groupRows[0].map((row) => renderSeat(row))}
                    </div>

                    <div className='grid grid-cols-2 gap-11'>
                        {groupRows.slice(1).map((group, idx) => (
                            <div key={idx}>
                                {group.map((row) => renderSeat(row))}
                            </div>
                        ))}
                    </div>

                    <div className='mt-4 text-sm text-gray-400'>
                        Selected: <span className='text-primary'>{selectedSeats.length === 0 ? "None" : selectedSeats.join(", ")}</span>
                    </div>

                    <button onClick={handleBook} className='flex items-center mt-6 px-11 py-3 text-sm gap-1 rounded-full bg-primary hover:bg-primary-dull transition font-medium cursor-pointer'>
                        Proceed to Checkout
                        <ArrowRightIcon strokeWidth={3} className='w-4 h-4' />
                    </button>
                </div>
            </div>
        </div>
    ) : (<LoadingComponent />)
}
export default SeatLayout;