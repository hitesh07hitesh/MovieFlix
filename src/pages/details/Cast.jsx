import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../../assets/avatar.png'

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home)
    // console.log(url)
    return (
        <div className='relative mb-[50px] text-white mx-4'>
            <h2 className='m-2 text-[2rem]'>Top Cast</h2>
            <div className='flex'>
                {!loading ? (
                    <div className='overflow-y-scroll flex gap-4'>
                        {data && data.map((item) => {
                            let imgUrl = item.profile_path
                                ? url.profile + item.profile_path : avatar;
                            return (
                                <div key={item.id} className='text-[15px]  pb-2 text-center'>
                                    <div className='min-w-[12rem] '>
                                        <img className='rounded-full w-full h-[12rem] object-cover' src={imgUrl} alt="zxczxczxczxcz" />
                                    </div>
                                    <div className='font-[800] mt-2'>{item.name}</div>
                                    <div>{item.character}</div>
                                </div>
                            )
                        })}

                    </div>
                ) : <div>Loading...</div>}
            </div>
        </div>
    )
}

export default Cast
