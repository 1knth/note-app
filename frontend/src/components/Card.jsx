import React, {useState} from 'react'

const Card = ({notes}) => {
    return (
        <>
            <div className='flex flex-col gap-3 p-8 bg-gray-800 cursor-pointer opacity-90 hover:opacity-100 w-80 h-44 rounded-xl'>
                <div className=' flex flex-col justify-center items-start'>
                    <h1 className='text-xl'>{notes.title}</h1>
                    <p className='text-md text-gray-500'>{notes.content}</p>
                </div>
                <div className='text-sm italic flex flex-row justify-between items-start'>
                    <h1 className='text-gray-600'>{notes.date}</h1>
                    <div className='flex flex-row gap-2 z-10'>
                        <img className=" text-gray-600 hover:text-gray-100" src="" alt="edit" />
                        <img className=" text-gray-600 hover:text-gray-100" src="" alt="delete" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;
