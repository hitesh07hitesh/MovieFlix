import React, { useState } from 'react';

const SwitchTabs = ({ data, onTabChange }) => {
    const [left, setLeft] = useState(0);
    const [selectedTab, setSelectedTab] = useState(0);

    const activeTab = (tab, index) => {
        setLeft(index * 50);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(tab, index);
    };

    return (
        <div className='h-[30px] w-[200px]  rounded-2xl abg-white border-[1px]'>
            <div className='flex h-full relative'>
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`z-20 flex items-center justify-center w-[100px] text-black text-[14px] cursor-pointer transition duration-300 ease-in-out ${selectedTab === index ? 'text-white' : 'text-white'
                            }`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span
                    className='absolute h-full w-[100px] bg-[#f40000] rounded-2xl'
                    style={{
                        left: `${left}%`,
                        transition: 'left 0.3s cubic-bezier(0.88,-0.35,0.565,1.35)',
                    }}
                ></span>
            </div>
        </div>
    );
};

export default SwitchTabs;
