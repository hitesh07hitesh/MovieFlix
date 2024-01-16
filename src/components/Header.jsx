import React from 'react'

const Header = () => {
    return (
        <div className='absolute top-0 w-full bg-transparent flex justify-between items-center text-white px-4 z-30 pt-2'>
            <div className='flex items-center'>
                <h2 className='text-xl font-bold mr-4 backdrop-blur-sm p-2 rounded-md  border-[1px]  '><a href="/">Movie<span className='text-[#f40000]'>Flix</span></a> </h2>
                <ul className='flex space-x-4'>
                    <li className='cursor-pointer hover:text-[#f40000]'>Movies</li>
                    <li className='cursor-pointer hover:text-[#f40000]'>Web Shows</li>
                    <li className='cursor-pointer hover:text-[#f40000]'>Popular</li>
                </ul>
            </div>
            <button className='bg-[#f40000] abg-[#c10000] text-white px-4 py-2 rounded-md '>
                Search
            </button>
        </div>
    )
}

export default Header
