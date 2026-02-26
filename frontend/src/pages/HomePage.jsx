import React, {useEffect, useState} from 'react';
import Card from '../components/Card.jsx';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import fetchNotes from '../api/api.js';

const HomePage = () => {
    const [isRateLimited, setRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const loadNotes = async () => {
            try {
                // returns array of notes with content snippet
                const res = await fetchNotes();
                // const test = [
                //     {title: "1", content:"hands", date:"May 15, 2024"},
                //     {title: "2", content:"eye", date:"January 28, 2023"},
                //     {title: "3", content:"twelve", date:"February 13, 2025"},
                //     {title: "4", content:"dramatic", date:"May 13, 2024"}
                // ]

                // const res = test;
                console.log(res);
                setNotes(res);
            } catch (error) {
                console.error("Error in home page: ", error);
                
            }
        }
        loadNotes();
    }, [setNotes]);

    const mapper = () => {
        return notes.map((note) => {
            return (
                <ul key={note.title}>
                    <Card 
                        notes={note}
                    />
                </ul>
            );
        });
    };
    return (
        <>
            <section className="bg-gray-500 w-full min-h-screen flex flex-col text-white">
                <Navbar />
                {isRateLimited && <RateLimitedUI />}
                <div className='bg-gray-600 flex flex-col mt-10'>
                    <div className='flex flex-col justify-center w-full p-20 gap-5 flex-grow'>
                    <h1 className='text-4xl opacity-90'>COLLECTION:</h1>
                        <div className='grid grid-cols-3 gap-10'>
                            {mapper()} 
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default HomePage;
