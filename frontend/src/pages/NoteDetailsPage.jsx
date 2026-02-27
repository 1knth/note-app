import React from 'react'
import { useEffect, useState } from 'react';
import {useParams} from 'react-router';
import {getNote} from '../lib/api.js';

const NoteDetailsPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const {id} = useParams();
  useEffect(() => {
    const loadNote = async () => {
      try {
        setLoading(true);
        const note = await getNote(id);
        setNote(note);
      } catch (error) {
        console.error("Error loading note: ", error);
      } finally {
        setLoading(false);
      }
    }
    loadNote();
  }, []);
  return (
    <>
      {isLoading 
      ? <h1>loading</h1>
      : <article className="bg-gray-500 w-full min-h-screen flex flex-col text-white">
          <div> 
            <h1>{note?.title}</h1>
            <p>{note?.content}</p>
          </div>
        </article>
      }
    </>
  )
}

export default NoteDetailsPage;
