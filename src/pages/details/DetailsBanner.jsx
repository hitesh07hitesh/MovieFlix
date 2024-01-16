import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import posterFallback from '../../assets/no-poster.png'
import dayjs from 'dayjs'
import Genres from '../../components/Genres'
import CircleRating from '../../components/CircleRating'
import { PlayCircleFilled } from '@ant-design/icons'

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false)
    const [videoId, SetVedioId] = useState(null)

    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const { url } = useSelector((state) => state.home)

    const _genres = data?.genres.map((g) => g.id)

    const directer = crew?.filter((f) => f.job === "Director")
    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer")

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        return `${hours}h ${minutes > 0 && minutes}m`
    }

    return (
        <div className='text-white w-full pt-[100px]  mb-[50px] p-[4rem]'>
            {!loading ? (
                <>
                    {data && (
                        <React.Fragment>
                            <div className='w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden '>
                                <img src={url.backdrop + data.backdrop_path} alt="" />
                            </div>
                            <div className='w-full h-[250px] bg-gradient-to-b from-transparent to-[#04152d] absolute bottom-0 left-0 az-20' ></div>
                            <div className='flex flex-col relative gap-[25px] md:flex-row '>
                                <div className='amax-w-[150px]'>
                                    {data.poster_path ? (
                                        <img className='w-[350px] rounded-xl' src={url.backdrop + data.poster_path} />
                                    ) : (
                                        <img src={posterFallback} />
                                    )}
                                </div>
                                <div className='flex  flex-col '>
                                    <div className='text-[2rem]'>
                                        {`${data.name || data.title}(${dayjs(data?.release_date).format("YYYY")})`}
                                    </div>
                                    <div className='text-gray-300 text-[18px]'>
                                        {data.tagline}
                                    </div>
                                    <div className='mt-2'>
                                        <Genres data={_genres} />
                                    </div>
                                    <div className='flex mt-2'>
                                        <div className=' w-[4rem] bg-white rounded-full m-2'>
                                            <CircleRating rating={data.vote_average.toFixed(1)} />
                                        </div>
                                        <div className='flex items-center cursor-pointer ' onClick={() => { setShow(true); SetVedioId(video.key) }}>
                                            <PlayCircleFilled className='text-[4rem] m-2 text-white  cursor-pointer opacity-50' />
                                            <h2 className='text-[2rem]'>Watch Trailer</h2>
                                        </div>

                                    </div>
                                    <div className='text-[25px]'>
                                        <h2>Overview</h2>
                                        <div className='text-[15px] max-w-[50rem]'>
                                            {data.overview}
                                        </div>
                                    </div>
                                    <div className='flex gap-4 m-2 mt-2 py-2 border-white border-b-[1px] border-opacity-10'>
                                        {data.status && (
                                            <div className='text-[18px]'>
                                                <span className='font-[800] '>
                                                    Status:{" "}
                                                </span>
                                                <span className='text-gray-500'>
                                                    {data.status}
                                                </span>
                                            </div>
                                        )}
                                        {data.release_date && (
                                            <div className='text-[18px]'>
                                                <span className='font-[800] '>
                                                    Release Date :{" "}
                                                </span>
                                                <span className='text-gray-500'>
                                                    {data.status}
                                                </span>
                                            </div>
                                        )}
                                        {data.runtime && (
                                            <div className='text-[15px]'>
                                                <span className='font-[800] '>
                                                    Runtime:{" "}
                                                </span>
                                                <span className='text-gray-500'>
                                                    {toHoursAndMinutes(data.runtime)}
                                                </span>
                                            </div>
                                        )}

                                    </div>
                                    <div className='flex gap-4 m-2 mt-2 py-2 border-white border-b-[1px] border-opacity-10'>
                                        {directer?.length > 0 && (
                                            <div className='text-[18px]'>
                                                <span className='font-[800] '>
                                                    Director:{" "}
                                                </span>
                                                <span className='text-gray-500'>
                                                    {directer.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {directer.length - 1 !== i && ","}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex gap-4 m-2 mt-2 py-2 border-white border-b-[1px] border-opacity-10'>
                                        {writer?.length > 0 && (
                                            <div className='text-[18px]'>
                                                <span className='font-[800] '>
                                                    Writer:{" "}
                                                </span>
                                                <span className='text-gray-500'>
                                                    {writer.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length - 1 !== i && ","}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </>
            ) : (<div>Loading...</div>)}
        </div>
    )
}

export default DetailsBanner
