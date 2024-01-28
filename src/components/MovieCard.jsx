import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import "./style.scss";
// import Img from "../lazyLoadImage/Img";
import CircleRating from "./CircleRating";
import Genres from "./Genres";
import PosterFallback from "../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    return (
        <div
            className='min-w-[200px]  cursor-pointer overflow-hidden gap-1 m-2'

            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="'min-w-[200px]  cursor-pointer overflow-hidden gap-1 ">
                <img className='w-full hh-[64] object-cover rounded-xl' src={posterUrl} alt='' />
                {!fromSearch && (
                    <React.Fragment>
                        <div className='relative flex justify-between top-[-30px] mx-1'>
                            <div className="w-[50px] relative bg-white rounded-full text-balck text-[12px]" ><CircleRating rating={data.vote_average.toFixed(1)} /></div>
                            <div className="relative  " >  <Genres data={data.genre_ids.slice(0, 2)} />
                            </div>

                        </div>
                    </React.Fragment>
                )}
            </div>
            <div className=' text-white relavtive flex flex-col top-[-52px]'>
                <span className='title text-[20px]'>{data.title || data.name}</span>
                <span className='date'>
                    {dayjs(data.release_date || data.first_air_date).format('MMM D, YYYY')}
                </span>
            </div>
        </div>
    );
};

export default MovieCard


// < div className = 'flex gap-4 overflow-x-scroll mx-[-20px] px-4 no-scrollbar' >
//     { data &&
//     data.map((item) => {
//         const posterURL = data.poster_path ? url.poster + data.poster_path : PosterFallBack;
//         return (
//             <div
//                 key={data.id}
//                 className='min-w-[200px]  cursor-pointer overflow-hidden gap-1'
//                 onClick={() => navigate(`/${data.media_type || endPoint}/${data.id}`)}
//             >
//                 <div className='relative '>
//                     <img className='w-full ah-64 object-cover rounded-xl' src={posterURL} alt='' />
//                     <div className='relative flex justify-between top-[-30px] mx-1'>
//                         <div className="w-[50px] relative bg-white rounded-full text-balck text-[12px]" ><CircleRating rating={data.vote_average.toFixed(1)} /></div>
//                         <div className="relative  " >  <Genres data={data.genre_ids.slice(0, 2)} />
//                         </div>

//                     </div>


//                 </div>
//                 <div className=' text-white relavtive flex flex-col top-[-52px]'>
//                     <span className='title text-[20px]'>{data.title || data.name}</span>
//                     <span className='date'>
//                         {dayjs(data.release_date || data.first_air_date).format('MMM D, YYYY')}
//                     </span>
//                 </div>
//             </div>
//         );
//     })}
//             </ >