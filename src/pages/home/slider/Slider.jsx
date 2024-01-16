import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';
import useFetch from '../../../hooks/useFetch';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Slider = () => {
    const [heroData, setHeroData] = useState([]);
    const { url } = useSelector((state) => state.home);
    console.log(url)

    const { data, loading } = useFetch("/movie/upcoming");
    console.log(data)


    useEffect(() => {
        const number = Math.floor(Math.random() * 15)
        // console.log(number)
        const newData = data?.results?.slice(number, number + 5) || [];
        console.log(newData);

        setHeroData(newData)
    }, [data]);
    return (
        <>
            <div className='relative'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 9000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper h-[25rem] md:h-[35rem] "
                >
                    {heroData.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div
                                className="vcv text-white asdf"
                                style={{
                                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                                }}
                            >
                                {/* Additional content inside the slide */}


                                <div className='z-40 mt-[15rem] px-[2rem] flex
                                '>
                                    {/* <img className='h-[5px] w-[5rem] border-2' src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt="fssssss" /> */}
                                    <div className='max-w-[50%]'>
                                        <h2 className='font-700'>{movie.title}</h2>
                                        <p>{movie.overview}</p>

                                    </div>
                                </div>
                                <p></p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='w-full h-full bg-[#04152d4b]  z-10 text-[2rem] absolute top-0'>
                </div>
                <div className="w-full h-[200px] bg-gradient-to-b from-transparent to-[#04152d] absolute bottom-0 left-0 z-20 ">
                </div>
            </div>


        </>
    );
};

export default Slider;


// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import './style.css'
// import useFetch from '../../hooks/useFetch';

// // import required modules
// import { Autoplay, Pagination, } from 'swiper/modules';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux'

// const Slider = () => {
//     const [heroData, setHeroData] = useState([])
//     const { url } = useSelector((state) => state.home)

//     const { data, loading } = useFetch("/movie/upcoming");
//     useEffect(() => {
//         const bg =
//             url.backdrop +
//             data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
//         console.log(bg);
//         // heroBannerData =  data.results
//     }, [data])

//     return (
//         <>
//             <Swiper
//                 spaceBetween={30}
//                 centeredSlides={true}
//                 autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false,
//                 }}
//                 pagination={{
//                     clickable: true,
//                 }}

//                 modules={[Autoplay, Pagination,]}
//                 className="mySwiper h-[19rem] md:h-[21rem] "
//             >
//                 <SwiperSlide>
//                     <div className="vcv" style={{ backgroundImage: `url(https://i.imgur.com/E8gkF2f.jpg)` }}>

//                     </div>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <div className="vcv text-black" style={{ backgroundImage: `url(https://i.imgur.com/E8gkF2f.jpg)` }}>
//                         dfgfdg
//                         <img src="https://i.imgur.com/E8gkF2f.jpg" alt="" />
//                     </div>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <div className="vcv" style={{ backgroundImage: `url(https://i.imgur.com/E8gkF2f.jpg)` }}>

//                     </div>
//                 </SwiperSlide>
//             </Swiper>
//         </>
//     );
// };

// export default Slider;
