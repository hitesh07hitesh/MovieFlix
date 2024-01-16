import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import PosterFallBack from '../assets/no-poster.png';
import dayjs from 'dayjs';
import CircleRating from './CircleRating';
import Genres from './Genres';
import './style.css'

const Carousel = ({ data, loading, endPoint, title }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount =
            dir === 'left'
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <div className='m-8 relative'>
            {title && <div className='text-4xl text-white font-medium mb-4'>{title}</div>}
            <LeftCircleFilled
                className='text-4xl text-white absolute top-1/2 cursor-pointer opacity-50 left-4 transform -translate-y-1/2 z-50'
                onClick={() => navigation('left')}
            />
            <RightCircleFilled
                className='text-4xl text-white absolute top-1/2 cursor-pointer opacity-50 right-4 transform -translate-y-1/2 z-50'
                onClick={() => navigation('right')}
            />
            {!loading ? (
                <div  ref={carouselContainer} className='flex gap-4 overflow-x-scroll mx-[-20px] px-4 no-scrollbar'>
                    {data &&
                        data.map((item) => {
                            const posterURL = item.poster_path ? url.poster + item.poster_path : PosterFallBack;
                            return (
                                <div
                                    key={item.id}
                                    className='min-w-[200px]  cursor-pointer overflow-hidden gap-1'
                                    onClick={() => navigate(`/${item.media_type || endPoint}/${item.id}`)}
                                >
                                    <div className='relative '>
                                        <img className='w-full ah-64 object-cover rounded-xl' src={posterURL} alt='' />
                                        <div className='relative flex justify-between top-[-30px] mx-1'>
                                            <div className="w-[50px] relative bg-white rounded-full text-balck text-[12px]" ><CircleRating rating={item.vote_average.toFixed(1)} /></div>
                                            <div className="relative  " >  <Genres data={item.genre_ids.slice(0, 2)} />
                                            </div>

                                        </div>


                                    </div>
                                    <div className=' text-white relavtive flex flex-col top-[-52px]'>
                                        <span className='title text-[20px]'>{item.title || item.name}</span>
                                        <span className='date'>
                                            {dayjs(item.release_date || item.first_air_date).format('MMM D, YYYY')}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            ) : (
                <div className='loadingSkeleton'>
                    <div className='skeletonItem'>
                        <div className='posterBlock skeleton'></div>
                        <div className='textBlock'>
                            <div className='title skeleton'></div>
                            <div className='date skeleton'></div>
                        </div>
                    </div>
                    {/* Repeat for more skeleton items */}
                </div>
            )}
        </div>
    );
};

export default Carousel;