import React from 'react'
import Slider from './home/slider/Slider'
import Popular from './home/popular/Popular'
import TopRated from './home/topRated/TopRated'
import Trending from './home/trending/Trending'

const Home = () => {
    return (
        <div className='text-blue-500'>
            <Slider />
            <Popular />
            <TopRated />
            <Trending />


        </div>
    )
}

export default Home
