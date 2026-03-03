import React, { useRef, useEffect, useState} from 'react'
import {useParams} from 'react-router';
import {getNote, saveNote} from '../lib/api.js';
import Editor from '../components/Editor.jsx';
import Quill from 'quill';
const Delta = Quill.import('delta');
import {toast} from 'react-hot-toast';
import spinner from '../assets/ring-resize.svg';
import {Link} from 'react-router';


const NoteDetailsPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const {id} = useParams();
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [isSaved, setSaved] = useState(true);
  const [title, setTitle] = useState("");
  const [isTitle, setIsTitle] = useState(false);

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
    if (!quillRef.current || (!isTitle && !lastChange)) return; 
    setSaved(false);
    const delayBounceFn = setTimeout(async () => {
      try {
        // objects containing array 'ops'
        // gets the ENTIRE contents of the doc -> entire formatted text
        const content = quillRef.current.getContents(); 
        const newTitle = title;
        // regular string of text of the content
        const getSnippet = () => {
          if ( quillRef.current.getText().length > 50) return ( (quillRef.current.getText()).substring(0,50) );
          return (
            quillRef.current.getText()
          );
        }
        await saveNote(id, {title: newTitle, ops: content.ops, snippet: getSnippet()});
      } catch (error) {
        toast.error("Error saving notes:"+ error);
      } finally {
        setIsTitle(false);
        setSaved(true);
      }

    }, 4000);
    return () => clearTimeout(delayBounceFn);
  }, [lastChange, title]);

  const getTitle = (e) => {
    console.log(title);
    setIsTitle(true)
    return (
      setTitle(e.target.value)
    );
  };

  return (
    <>
      {isLoading 
      ? <img className='w-3'src={spinner} alt="loading" />
      : <article className="w-full min-h-100 flex flex-col text-black mt-5 ">
          <Link to='/' id='back-btn' className='flex opacity-40 text-xl mx-20 hover:opacity-80'> back</Link>
          <div className='flex h-20 flex-col justify-center text-sm mx-20'>
            <input className='text-5xl important font-bold' value={title} onChange={(e) => getTitle(e)}/>
            {isSaved 
            ? <p className='opacity-40'>All changes saved.</p> 
            : <div className="opacity-60 flex items-center gap-2">
                <p>Changes saving</p>
                <img className='w-3'src={spinner} alt="loading" />
            </div>}
          </div>
          <div className='mx-20'>
            <Editor
              ref={quillRef}
              readOnly={readOnly}
              defaultValue={new Delta(note?.content.ops)}
              onSelectionChange={setRange}
              onTextChange={setLastChange}
            />
          </div>
        </article>
      }
    </>
  )
}

export default NoteDetailsPage;
