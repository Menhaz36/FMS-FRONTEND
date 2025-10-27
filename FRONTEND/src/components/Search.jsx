import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Search = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [TotalPassenger, setTotalPassenger] = useState(1);

    const [flights, setFlights] = useState(null);
    const [loading, setLoading] = useState(false); // 👈 loading state

    const navigate = useNavigate();

    const SearchForFlights = async (source, destination, date) => {
        try {
            setLoading(true); // 👈 Start loading
            console.log('Searching flights with:', { source, destination, date });

            const response = await axios.post(`${API_BASE_URL}/api/search_flights`, { source, destination, date });
            console.log("this is the response", response);
            const flightsData = response.data;
            console.log(flightsData);

            setFlights(flightsData);
        } catch (error) {
            console.error('Error searching flights:', error);
            setFlights([]);
        } finally {
            setLoading(false); // 👈 Stop loading
        }
    };

    const handleClick = (flightID, flightName) => {
        navigate(`/flight/${flightID}`, {
            state: {
                selectedFlight: { flightID, source, destination, date, flightName },
                TotalPassenger
            }
        });
        console.log('Flight ID clicked:', flightID);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                SearchForFlights(source, destination, date);
            }}
            className='shadow-2xl/35 mt-20 bg-white/10 border-2 border-cyan-800 text-gray-500 rounded-lg px-20 py-15 flex flex-col md:flex-row max-md:items-start gap-6 max-w-5xl mx-auto'
        >
            <div className='flex flex-col'>
                <div className="flex flex-wrap gap-6 md:gap-10 justify-center w-full">

                    {/* From */}
                    <div className="flex flex-col w-full sm:w-[45%] md:w-[30%] xl:w-[27%]">
                        <label htmlFor="from" className="mb-1 font-medium">From</label>
                        <input
                            id="from"
                            list="city-list"
                            type="text"
                            placeholder="Type or choose source"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full rounded border border-gray-300 px-4 py-3 text-base outline-none focus:border-cyan-700"
                            required
                        />
                        <datalist id="city-list">
                            <option value="Delhi" />
                            <option value="Mumbai" />
                            <option value="Bangalore" />
                            <option value="Kolkata" />
                        </datalist>
                    </div>

                    {/* To */}
                    <div className='flex flex-col w-full sm:w-[45%] md:w-[30%] xl:w-[27%]'>
                        <label htmlFor="to">To</label>
                        <input
                            id="to"
                            list="destination-list"
                            type="text"
                            placeholder="Destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full rounded border border-gray-300 px-4 py-3 mt-1 text-base outline-none focus:border-cyan-700"
                            required
                        />
                        <datalist id="destination-list">
                            <option value="Delhi" />
                            <option value="Mumbai" />
                            <option value="Bangalore" />
                            <option value="Kolkata" />
                            <option value="Hyderabad" />
                            <option value="Pune" />
                        </datalist>
                    </div>

                    {/* Departure */}
                    <div>
                        <div className='flex items-center gap-2'>
                            <svg className="w-4 h-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                            </svg>
                            <label htmlFor="depart" className="block font-medium">Departure</label>
                        </div>
                        <input id="depart" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded border border-gray-300 px-4 py-3 mt-1 text-base outline-none focus:border-cyan-700" />
                    </div>

                    {/* Passengers */}
                    <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                        <label htmlFor="passenger">Passengers</label>
                        <input
                            min={1}
                            id="passenger"
                            type="number"
                            className="rounded border border-gray-300 px-3 py-2 mt-1.5 text-base outline-none focus:border-cyan-700 max-w-16"
                            placeholder="0"
                            value={TotalPassenger}
                            onChange={(e) => setTotalPassenger(e.target.value)}
                        />
                    </div>

                    {/* Search Button */}
                    <button
                        className="mt-7 w-64 flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-black to-gray-600 shadow-2xl/35 py-3 px-6 text-white font-medium my-auto cursor-pointer max-md:w-full max-md:py-2 
                hover:from-gray-500 hover:to-black active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                        type="submit"
                    >
                        {loading ? ( // 👈 Button spinner or loading text
                            <>
                                <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                <span>Searching...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                </svg>
                                <span>Search</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Flight Results */}
                <div className="mt-6 w-full">
                    {loading ? (
                        <p className="text-center text-black font-semibold">Loading flights...</p>
                    ) : flights === null ? null : flights.length === 0 ? (
                        <p className="text-center text-black font-semibold">No flights found</p>
                    ) : (
                        flights.map(f => (
                            <div
                                key={f.flightid}
                                className="p-2 border-b bg-blend-soft-light rounded-md mb-2 hover:bg-black cursor-pointer"
                                onClick={() => handleClick(f.flightid, f.flightname)}
                            >
                                <span className='font-semibold text-center hover:text-amber-50'>
                                    {f.flightid}. {f.flightname} : {f.source} → {f.destination} on {new Date(f.arrivaltime).toLocaleString()}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </form>
    );
};

export default Search;
