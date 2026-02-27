import formattedDate from '../lib/utils.js';
import {Link} from 'react-router';
import {toast} from 'react-hot-toast';

const Card = ({note}) => {
    const format = formattedDate(note.updatedAt);
    return (
        <>
            <div className='card flex flex-col gap-3 p-8 bg-gray-800 opacity-90 hover:opacity-100 w-full h-full rounded-xl'>
                <div className=' flex flex-col justify-top items-start h-20 gap-1'>
                    <h1 className='text-xl'>{note.title}</h1>
                    <p className='text-sm text-gray-500'>{note.content.substring(0,45) + '...'}</p>
                </div>
                <div className='text-sm italic flex flex-row justify-between items-end'>
                    <div className='flex flex-col'>
                        <h1 className='text-xs text-gray-700'>Last edit:</h1>
                        <h1 className='text-gray-500'>{format}</h1>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <Link to={`/note/${note._id}`}>
                            <img className="cursor-pointer text-gray-600 hover:text-orange-300" src={null} alt="edit" />
                        </Link>
                        <button onClick={() => toast.error("Deleted Successfully!")}>
                            <img className="cursor-pointer text-gray-600 hover:text-red-400" src={null} alt="delete" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;
