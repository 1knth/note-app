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
  const [title, setTitle] = useState(null);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();
  
  
  useEffect(() => {
    const loadNote = async () => {
      try {
        setLoading(true);
        const note = await getNote(id);
        console.log(note);
        setNote(note);
        setTitle(note.title);
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
        // objects containing array 'ops'
        // gets the ENTIRE contents of the doc -> entire formatted text
        const content = quillRef.current.getContents(); 
        
        // regular string of text of the content
        const getSnippet = () => {
          if ( quillRef.current.getText().length > 75) return ( (quillRef.current.getText()).substring(0,75) );
          return (
            quillRef.current.getText()
          );
        }
        const save = await saveNote(id, {ops: content.ops, snippet: getSnippet()});
        console.log("save:", save);
      } catch (error) {
        toast.error("Error saving notes:"+ error);
      } finally {
        setSaved(true);
      }

    }, 2000);
    return () => clearTimeout(delayBounceFn);
  }, [lastChange]);

  const getTitle = (e) => {
    console.log(title);
    return (
      setTitle(e.target.value)
    );
  };

  return (
    <>
      {isLoading 
      ? <h1>loading</h1>
      : <article className="w-full min-h-100 flex flex-col text-black ">
          <div className='flex h-20 flex-col justify-center ml-5 text-sm'>
            <input className='text-5xl important font-bold' defaultValue={note?.title} onChange={(e) => getTitle(e)}/>
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
            defaultValue={new Delta(note?.content.ops)}
            onSelectionChange={setRange}
            onTextChange={setLastChange}
          />


        </article>
      }
    </>
  )
}

export default NoteDetailsPage;
