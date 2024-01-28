import { useState } from 'react'
import { PlayCircleFilled } from '@ant-design/icons'
import './style.css'
import VideoPopup from '../../components/VideoPopup'

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    return (
        <div className=' text-white mx-4'>
            <h2 className='m-2 text-[2rem]'>Offical Videos</h2>
            {!loading ? (
                <div className='flex overflow-scroll gap-4 stylesc'>
                    {data && data?.results?.map((video) => (
                        <div key={video.id} className=' relative cursor-pointer' onClick={() => { setVideoId(video.key); setShow(true); }}>
                            <div key={video.id} className='w-[20rem] flex flex-col items-center justify-center'>
                                <img className='w-full h-[10rem] object-cover rounded-lg' src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} alt="" />
                                <PlayCircleFilled className='text-[4rem] m-2 text-white cursor-pointer opacity-50 absolute ' />
                            </div>
                            <h2 className='text-[15px] mt-2 '>{video.name}</h2>
                        </div>
                    ))}
                </div>
            ) : <div>Loading</div>}
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    )
}

export default VideosSection
