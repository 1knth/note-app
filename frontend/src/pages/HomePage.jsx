import React, {useEffect, useState} from 'react';
import Card from '../components/Card.jsx';
import toast from 'react-hot-toast';

const HomePage = () => {

    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const loadNotes = async () => {
            try {
                // returns array of notes with content snippet
                // const notes = await fetchNotes();

                const test = [
                    {title: "1", content:"hands"},
                    {title: "2", content:"eye"},
                    {title: "3", content:"twelve"},
                    {title: "4", content:"dramatic"}
                ]

                const notes = test;
                setNotes(notes);
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
            <section data-theme="forest" className="bg-gray-500 w-full min-h-screen flex flex-col text-white">
                <div className='flex flex-col mt-10'>

                </div>
                <div className='flex flex-col mt-10'>
                    <div className='flex justify-between gap-20 pl-10 pr-10'>
                        <h1 className='text-2xl'>Notes</h1>
                        <div>
                            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-gray-700" onClick={() => toast.success("congrats")}>Create New Note</button>
                            {/* <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-gray-700" onClick={() => toast.success("congrats")}>Create New Note</button> */}
                        </div>
                    </div>
                    <div className='flex justify-center w-full p-20 flex-grow'>
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
