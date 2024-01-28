import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import DetailsBanner from './details/DetailsBanner'
import Cast from './details/Cast'
import VideosSection from './details/VideosSection'
import Similar from './details/Similar'
import Recommendation from './details/Recommendation'

const Details = () => {
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`)
    // console.log(credits)
    return (
        <div >
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideosSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />

        </div>
    )
}

export default Details
