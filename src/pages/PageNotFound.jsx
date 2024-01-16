import React from 'react'

const PageNotFound = () => {
    return (
        <div className='flex text-white h-[100vh] w-full flex-col  justify-center items-center px-auto left-10 z-50'>
            <h2 className='text-[3rem]'>Error 404</h2>
            <h2 className='text-[3rem]'>Page Not Found</h2>
            <button className='w-fit bg-green-500 text-[5rem] text-white px-4 py-2 rounded-md '><a href="/">Go to Home</a> </button>
        </div>
    )
}

export default PageNotFound
