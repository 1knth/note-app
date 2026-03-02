import React from 'react';
import {Link} from 'react-router';

const Navbar = () => {
  
  return (
    <header className='relative bg-gray-200 flex justify-between items-center gap-20 px-10 py-3'>
        <Link to={'/'} className='text-2xl font-mono tracking-tight text-black' >Notes</Link>
    </header>
)
}

export default Navbar
