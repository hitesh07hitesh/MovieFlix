import React, { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const [showSearch, setShowSearch] = useState(false)
    const [query, setQuery] = useState("")

    const navigate = useNavigate()

    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    }
    return (
        <div className='absolute w-full'>
            <div className='absolute top-0 w-full bg-transparent flex justify-between items-center text-white px-4 z-50 pt-2'>
                <div className='flex items-center'>
                    <h2 className='text-xl font-bold mr-4 backdrop-blur-sm p-2 rounded-md  border-[1px]  '><a href="/">Movie<span className='text-[#f40000]'>Flix</span></a> </h2>
                    <ul className='flex space-x-4'>
                        <li className='cursor-pointer hover:text-[#f40000]'><a href="/explore/movie">Movies</a></li>
                        <li className='cursor-pointer hover:text-[#f40000]'><a href="/explore/tv">Web Shows</a></li>
                        {/* <li className='cursor-pointer hover:text-[#f40000]'><a href="/explore/movie">Popular</a></li> */}
                    </ul>
                </div>
                <button className='bg-[#f40000] abg-[#c10000] text-white px-4 py-2 rounded-md ' onClick={() => setShowSearch(!showSearch)}>
                    Search
                </button>
            </div>
            {showSearch &&
                <div className='relative top-[60px] z-50 mx-2 rounded-full'>
                    <input className='opacity-70 rounded-full w-full text-[18px] outline-none p-4 ' placeholder='Find any movie...' type="text" onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} />
                    <button className='absolute right-0 top-[12px] mr-6' onClick={() => setShowSearch(false)}>
                        <CloseOutlined className="text-2xl cursor-pointer" />
                    </button>
                </div>}
        </div>
    )
}

export default Header
