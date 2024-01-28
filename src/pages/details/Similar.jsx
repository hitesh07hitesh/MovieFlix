import Carousel from "../../components/Carousel";
import useFetch from "../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
    // console.log(mediaType)

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endPoint={mediaType} 
        />
    );
};

export default Similar
