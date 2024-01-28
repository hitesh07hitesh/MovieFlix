import React from 'react'
import { useSelector } from 'react-redux'


const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home)
    const names = (a) => {
        if (a === "Science Fiction") {
            return "Sci - Fi";
        } else {
            return a;  // Add a return statement for the else block
        }
    };
    return (
        <div className='flex gap-2'>
            {data?.map((g) => {
                if (!genres[g]?.name) return;
                return (
                    <div key={g} className='flex  w-fit bg-[#f40000] px-2 py-[2px] text-[12px] text-white rounded-md'>

                        {names(genres[g]?.name)}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres