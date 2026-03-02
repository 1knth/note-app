import formattedDate from '../lib/utils.js';
import {Link} from 'react-router';
import {toast} from 'react-hot-toast';
import {deleteNote} from '../lib/api.js';


const Card = ({note, onDelete}) => {
   
    const handleDelete = async () => {
        try {
            await deleteNote(note._id);
            onDelete();
            toast.success("Note Deleted!");
        } catch (error) {
            toast.error("Error deleting note");
        }
    };

    return (
        <>
            <div className='card flex flex-col gap-3 p-8 bg-gray-700 opacity-90 hover:opacity-100 w-full h-full rounded-xl'>
                <div className=' flex flex-col justify-top items-start h-20 gap-1'>
                    <h1 className='text-xl'>{note.title}</h1>
                    <p className='text-sm text-gray-400'>{`${note.content.snippet || ""}...`}</p>
                </div>
                <div className='text-sm italic flex flex-row justify-between items-end'>
                    <div className='flex flex-col'>
                        <h1 className='text-xs text-gray-700'>Last edit:</h1>
                        <h1 className='text-gray-500'>{formattedDate(note.updatedAt)}</h1>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <Link to={`/note/${note._id}`}>
                            <img className="cursor-pointer text-gray-600 hover:text-orange-300" src={null} alt="edit" />
                        </Link>
                        <button onClick={() => handleDelete()}>
                            <img className="cursor-pointer text-gray-600 hover:text-red-400" src={null} alt="delete" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;
