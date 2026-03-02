import React, { useRef, useEffect, useState} from 'react'
import {useParams} from 'react-router';
import {getNote, saveNote} from '../lib/api.js';
import Editor from '../components/Editor.jsx';
import Quill from 'quill';
const Delta = Quill.import('delta');
import {toast} from 'react-hot-toast';
// import '../components/extra.css';

const NoteDetailsPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const {id} = useParams();
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [isSaved, setSaved] = useState(true);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();
  
  
  useEffect(() => {
    const loadNote = async () => {
      try {
        setLoading(true);
        const note = await getNote(id);
        console.log(note);
        setNote(note);
        console.log(note.content.insert);
      } catch (error) {
        console.error("Error loading note: ", error);
      } finally {
        setLoading(false);
      }
    }
    loadNote();
  }, []);

  // for auto updates
  useEffect(() => {
    if (!quillRef.current || !lastChange) return; 
    setSaved(false);
    const delayBounceFn = setTimeout(async () => {
      try {
        const content = quillRef.current.getContents(); 
        // regualar string of text
        const fullPlainText = quillRef.current.getText();
        console.log("Saving this to Mongoose:", content);
        console.log("ops:", content.ops);
        const save = await saveNote(id, content.ops);
        console.log("save:", save);
      } catch (error) {
        toast.error("Error saving notes:"+ error);
      } finally {
        setSaved(true);
      }

    }, 2000);
    return () => clearTimeout(delayBounceFn);
    
  }, [lastChange]);

  return (
    <>
      {isLoading 
      ? <h1>loading</h1>
      : <article className="w-full min-h-100 flex flex-col text-black ">
          <div className='flex h-20 flex-col justify-center ml-5 text-sm'>
            <input className='text-5xl important font-bold' defaultValue={note?.title}/>
            {isSaved 
            ? <p className='opacity-40'>All changes saved.</p> 
            : <div className="flex gap-2">
                <p>Changes saving</p>
                <img src={null} alt="loading" />
            </div>}
          </div>
          <Editor
            ref={quillRef}
            readOnly={readOnly}
            defaultValue={new Delta(note.content)}
            onSelectionChange={setRange}
            onTextChange={setLastChange}
          />


        </article>
      }
    </>
  )
}

export default NoteDetailsPage;
