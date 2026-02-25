import React, {useState} from 'react'

const Card = ({notes}) => {
    
    return (
        <>
            <div className='flex flex-col justify-center items-start p-8 bg-gray-800 w-80 h-44 rounded-xl gap-10'>
                <div className='flex flex-row justify-center items-center'>
                    <h1 className='text-xs'>{`title:`} </h1>
                    <h1>{notes.title}</h1>
                </div>
                <div className='flex flex-row justify-center items-center'>
                    <p className='text-gray-500'>{notes.content}</p>
                </div>
            </div>
        </>
    )
    }

export default Card;
