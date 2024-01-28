import { useState } from "react"
import Carousel from "../../../components/Carousel"
import useFetch from "../../../hooks/useFetch"
import SwitchTabs from "../../../components/SwitchTabs"

const popular = () => {
    const [endPoint, setEndPoint] = useState("movie")
    const { data, loading } = useFetch(`/${endPoint}/popular`)
    // console.log(data)

    const onTabChange = (tab) => {
        setEndPoint(tab === "Movies" ? "movie" : "tv");
    };
    return (
        <div className="mt-[3rem] h-[25rem] text-green">
            <div className="flex justify-between mx-8">
                <span className="captilize text-[30px] text-white ">Popular</span>
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </div>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default popular
