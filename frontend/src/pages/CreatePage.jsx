import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import '../components/extra.css';
import {toast} from 'react-hot-toast';
import {createNote} from '../lib/api.js';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [isLoading,setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(()=> {
    console.log(title);
  },[setTitle]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const note = await createNote(title);
      toast.success("Note Created!");
      navigate(`/note/${note._id}`);
    } catch (error) {
      console.error("Error creating note: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='overflow-y-hidden create-container z-20 absolute flex justify-center items-center w-screen'>
        <div className=" z-50 rounded-xl gap-10 flex flex-col justify-center items-center text-area-container w-96 h-80">
          <h1 className='text-white text-3xl' >Create Note</h1>
          <div className='gap-5 flex flex-col justify-center items-center'>
            <div className='flex flex-row gap-5 text-black px-2'>
              <input className='rounded-xl px-2 py-1' onChange={e => setTitle(e.target.value)} placeholder='enter title...' type="text" />
            </div>
            <button className='btn-submit rounded-xl' value={title} onClick={() => handleSubmit()}>Create</button>
          </div>
        </div>
      </div>
    </>
  )
};

export default CreatePage;
 