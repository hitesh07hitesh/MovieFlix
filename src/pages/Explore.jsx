import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../utils/api'
import { BlinkBlur } from "react-loading-indicators";
import MovieCard from '../components/MovieCard';
import Select from 'react-select'
import useFetch from '../hooks/useFetch'
// import './style.css'

let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
    const [data, setData] = useState()
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(false)
    const [sortby, setSortby] = useState(null)
    const [genre, setGenre] = useState(null)

    const { mediaType } = useParams()

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);



    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(
            `/discover/${mediaType}?page=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);


    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        fetchInitialData();
    };

    return (
        <div className='p-4 pt-16 mx-auto w-full flex justify-center item-center'>
            {loading && <BlinkBlur className="" color='white' size='medium' text='' textColor='' />}
            {!loading && (
                <div className='mx-auto w-full'>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className='flex justify-between'>
                                <div className='text-white text-[25px] m-2 '>
                                    {mediaType === "tv" ? "Explore TV Shows"
                                        : "Explore Movies"}
                                </div>
                                <div className='flex gap-2'>
                                    <Select
                                        isMulti
                                        name="genres"
                                        value={genre}
                                        closeMenuOnSelect={false}
                                        options={genresData?.genres}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.id}
                                        onChange={onChange}
                                        placeholder="Select genres"
                                        className="react-select-container min-w-[10rem]"
                                        classNamePrefix="react-select"
                                    />
                                    <Select
                                        name="sortby"
                                        value={sortby}
                                        options={sortbyData}
                                        onChange={onChange}
                                        isClearable={true}
                                        placeholder="Sort by"
                                        className="react-select-container w-[10rem] rounded-full"
                                        classNamePrefix="react-select"
                                    />
                                </div>
                            </div>

                            <InfiniteScroll
                                className='grid grid-cols-5 mx-auto w-full'
                                dataLength={data?.results?.length || 0}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<BlinkBlur color='white' size='medium' text='' textColor='' />}
                            >
                                {data?.results.map((item, index) => {
                                    if (item.media_type === 'person') return null;
                                    return <MovieCard key={index} data={item} fromSearch={true} mediaType={mediaType} />;
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span>No results found</span>
                    )}
                </div>
            )}
        </div>
    )
}


export default Explore