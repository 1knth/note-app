import React, {useEffect, useState} from 'react';
import '../components/extra.css';
import CreatePage from './CreatePage.jsx';
import NoteList from '../components/NoteList.jsx';

const HomePage = () => {
    const [isLoading, setLoading] = useState(true);
    const [isCreate, setCreate] = useState(false);

    const create = () => {
        return (
            isCreate ? setCreate(false) : setCreate(true)
        )
    };
    return (
        <>
            <section className="w-full min-h-screen flex flex-col text-white">
                <div className='flex justify-center'>
                    {isCreate 
                    && <>
                        <div className='z-30'>
                            <button onClick={() => setCreate(false)} className='text-xl'>close</button>
                        </div>
                        <CreatePage />
                    </>}
                </div>
                    <div className='flex justify-center'>
                        <div className='rounded-xl bg-gray-100 flex flex-col my-10 w-11/12'>
                            <div className='flex flex-col w-full p-20 gap-5 flex-grow'>
                                <div className='z-10 h-20 rounded-xl px-4 flex flex-row justify-between items-center'>
                                    <div className='flex flex-row gap-3 items-center'>
                                        <h1 className='text-3xl text-black'>Latest Notes</h1>
                                        {/* <input className='h-3'type="text" /> */}
                                    </div>
                                    <button onClick= {() => create()}className="new-note-btn">New Note</button>
                                </div>
                                <div>
                                    <NoteList/>
                                </div>
                            </div>
                        </div> 
                    </div>
            </section>
        </>
    )
};

export default HomePage;
