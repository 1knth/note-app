import React, { useState, useEffect } from 'react';
import RateLimitedUI from './RateLimitedUI';
import {toast} from 'react-hot-toast';
import {getNotes} from '../lib/api.js';
import Card from '../components/Card.jsx';

const NoteList = () => {
    const [loadNotes, setLoadNotes] = useState(false); 
    const [isRateLimited, setRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    
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
                setLoadNotes(false);
            }
        }
        loadNotes();
    }, [loadNotes]);

    const mapNotes = () => {
        return notes.map((note) => {
            return (
                <Card 
                    key={note._id}
                    note={note}
                    onDelete={() => setLoadNotes(true)}
                />
            );
        });
    };


    return (
        <div>
            {isRateLimited && <RateLimitedUI />}
            
            {isLoading 
            ? <div>Loading</div>
            : <div className='grid grid-cols-3 gap-10'>
                {mapNotes()}
            </div>}
        </div>
    );
}

export default NoteList;
