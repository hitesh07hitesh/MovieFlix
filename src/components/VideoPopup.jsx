import ReactPlayer from "react-player";
import { CloseOutlined } from '@ant-design/icons'

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false)
        setVideoId(null)
    }

    return (
        <div className={`flex justify-center items-center w-full h-full fixed top-0 left-0 z-10 ${show ? "flex" : "hidden"}`}>
            <div className='opacity-50 absolute top-0 left-0  w-full h-full bg-[rgba(0,0,0,0.25)] backdrop-blur-xl transition-opacity' onClick={hidePopup}></div>
            <div className='relative w-[800px] aspect-video bg-white cursor-pointer'>
                <span className='absolute top-[-35px] right-[-30px] text-white ' onClick={hidePopup}>
                    <CloseOutlined className="text-2xl cursor-pointer"/>
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    )
}

export default VideoPopup