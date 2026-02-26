import React from 'react'
import {Link} from 'react-router'

const Navbar = () => {
  return (
    <header className='bg-red-700 flex justify-between items-center gap-20 px-10 py-3'>
        <h1 className='text-2xl font-mono tracking-tight'>Notes</h1>
        <div>
            <Link className="w-40 btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-gray-700" onClick={() => toast.success("congrats")}>New Note</Link>
        </div>
    </header>
)
}

export default Navbar
