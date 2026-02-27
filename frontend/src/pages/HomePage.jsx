import React, {useEffect, useState} from 'react';
import '../components/extra.css';
import {toast} from 'react-hot-toast';
import {getNotes} from '../lib/api.js';
import Card from '../components/Card.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import CreatePage from './CreatePage.jsx';

const HomePage = () => {
    const [isRateLimited, setRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isCreate, setCreate] = useState(false);
    
    useEffect(() => {
        const loadNotes = async () => {
            try {
                setLoading(true);
                // returns array of notes with content snippet
                const res = await getNotes();

                // const res = test;
                setNotes(res);
                setRateLimited(false);
            } catch (error) {
                console.error("Error in home page: ", error);
                if (error.response?.status === 429) {
                    setRateLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
                
            } finally {
                setLoading(false);
            }
        }
        loadNotes();
    }, []);

    const mapNotes = () => {
        return notes.map((note) => {
            return (
                <Card 
                    key={note.title}
                    note={note}
                />
            );
        });
    };

    const create = () => {
        return (
            isCreate ? setCreate(false) : setCreate(true)
        )
    };
    return (
        <>
            <section className="w-full min-h-screen flex flex-col text-white">
                {isRateLimited && <RateLimitedUI />}
                <div className='flex justify-center'>
                    {isCreate 
                    && <>
                        <div className='z-30'>
                            <button onClick={() => setCreate(false)} className='text-xl'>close</button>
                        </div>
                        <CreatePage />
                    </>}
                </div>
                <div>
                    {isLoading 
                    ? <div className='flex justify-center text-4xl'>loading</div> 
                    : <div className='flex justify-center'>
                        <div className='rounded-xl bg-gray-600 flex flex-col my-10 w-10/12'>
                            <div className='flex flex-col w-full p-20 gap-5 flex-grow'>
                                <div className='z-10 bg-gray-900 h-20 rounded-xl px-4 flex flex-row justify-between items-center'>
                                    <div className='flex flex-row gap-3 items-center'>
                                        <h1 className='text-xl opacity-80'>Latest Notes</h1>
                                        {/* <input className='h-3'type="text" /> */}
                                    </div>
                                    <button onClick= {() => create()}className="new-note-btn">New Note</button>
                                </div>
                                <div className='grid grid-cols-3 gap-10'>
                                    {mapNotes()} 
                                </div>
                            </div>
                        </div> 
                    </div>}
                </div>
            </section>
        </>
    )
};

export default HomePage;
