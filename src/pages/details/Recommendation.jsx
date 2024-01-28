import React from "react";

import Carousel from "../../components/Carousel";
import useFetch from "../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );
    // console.log(data?.results.length)
    // console.log(mediaType)
    return (
        data?.results.length > 0 ? (
            <Carousel
                title="Recommendations"
                data={data?.results}
                loading={loading}
                endpoint={mediaType}
            />) : null
    );
};

export default Recommendation