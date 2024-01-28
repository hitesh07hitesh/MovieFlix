import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';
import useFetch from '../../../hooks/useFetch';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';

const Slider = () => {
    const [heroData, setHeroData] = useState([]);
    const { url } = useSelector((state) => state.home);
    // console.log(url)

    const navigate = useNavigate();

    const { data, loading } = useFetch("/movie/upcoming");
    // console.log(data)


    useEffect(() => {
        const number = Math.floor(Math.random() * 15)
        // console.log(number)
        const newData = data?.results?.slice(number, number + 5) || [];
        // console.log(newData);

        setHeroData(newData)
    }, [data]);
    return (
        <>
            <div className='relative'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Navigation, Autoplay, Pagination]}
                    className="mySwiper h-[25rem] md:h-[35rem] z-30"
                >
                    {heroData.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div onClick={() => navigate(`/movie/${movie.id}`)}
                                className="vcv text-white asdf cursor-pointer"
                                style={{
                                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                                    
                                }}
                            >
                                {/* Additional content inside the slide */}


                                <div className=' apt-[5rem] h-full apx-[2rem] flex
                                '>
                                    <div className="relative w-[50%] pt-[5%] h-full aoverflow-hidden gap-4 text-white left-0 flex aflex-col items-start clip px-4 pl-[1rem] z-50">
                                        <div className='w-[18rem]'>
                                            <h2 className='w-full flex mb-3  z-40 afont-700 text-[1.2rem] font-extrabold'>{movie.title}{`(${dayjs(movie?.release_date).format("YYYY")})`}</h2>
                                            <img className='aabsolute w-[22rem] max-h-[25rem] object-cover rounded-xl z-50 border-[1px] border-white shadow-2xl' src={`${url.poster}${movie.poster_path}`}
                                                alt={`${url.poster}${movie.poster_path}`} />
                                        </div>
                                        <div className='flex flex-col w-fit '>
                                            {/* <button className='bg-[#f40000]  p-2 rounded-md px-4 border-[1px] cursor-pointer' onClick={() => console.log("Button Clicked")}>Watch</button> */}
                                            {/* <h2 className='  z-40 afont-700 text-[1.8rem] font-extrabold'>{movie.title}{`(${dayjs(movie?.release_date).format("YYYY")})`}</h2> */}
                                            <p></p>
                                            {/* <Genres data={movie.genre_ids} /> */}

                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='w-full h-full bg-[#04152d4b]  z-10 text-[2rem] absolute top-0'>
                </div>
                {/* <div className="clip w-[45%] h-full absolute bottom-0 left-0 z-40"></div> */}
                <div className="w-full h-[200px] bg-gradient-to-b from-transparent to-[#04152d] absolute bottom-0 left-0 z-40 ">
                </div>
            </div>


        </>
    );
};

export default Slider;
