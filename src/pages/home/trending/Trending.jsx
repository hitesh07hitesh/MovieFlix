import { useState } from "react"
import Carousel from "../../../components/Carousel"
import useFetch from "../../../hooks/useFetch"
import SwitchTabs from "../../../components/SwitchTabs"

const Trending = () => {
    const [endPoint, setEndPoint] = useState("day")
    const { data, loading } = useFetch(`/trending/movie/${endPoint}`)
    // console.log(data)

    const onTabChange = (tab) => {
        setEndPoint(tab === "Day" ? "day" : "week");
    };
    return (
        <div className="mt-[7rem] h-[25rem] text-green">
            <div className="flex justify-between mx-8">
                <span className="captilize text-[30px] text-white ">Trending</span>
                <SwitchTabs
                    data={["Day", "Week"]}
                    onTabChange={onTabChange}
                />
            </div>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default Trending
