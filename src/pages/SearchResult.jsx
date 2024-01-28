import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../utils/api'
import { BlinkBlur } from "react-loading-indicators";
import MovieCard from '../components/MovieCard';

const SearchResult = () => {
    const [data, setData] = useState()
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(false)
    const { query } = useParams()

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);


    return (
        <div className='p-4 pt-12 mx-auto w-full flex justify-center item-center'>
            {loading && <BlinkBlur className="" color='white' size='medium' text='' textColor='' />}
            {!loading && (
                <div className='mx-auto w-full'>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className='text-white text-[25px] m-2 '>
                                {`Search ${data?.total_results > 1 ? 'results' : 'result'} of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className='grid grid-cols-5 mx-auto w-full'
                                dataLength={data?.results?.length || 0}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<BlinkBlur color='#32cd32' size='medium' text='' textColor='' />}
                            >
                                {data?.results.map((item, index) => {
                                    if (item.media_type === 'person') return null;
                                    return <MovieCard key={index} data={item} fromSearch={true} />;
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

export default SearchResult
