import React from 'react'

const FooterCards = ({ icon, text, link }) => {
    return (
        <a href={link}>
            <div className='group w-20 h-20 lg:w-40 lg:h-40'>
                <div className='flex bg-[#2d415e] w-full h-full rounded-br-xl group-hover:translate-x-[4%] group-hover:translate-y-[4%] duration-500'></div>
                <div className='flex z-10 flex-col w-full h-full mt-[-80px] lg:mt-[-160px] group-hover:translate-x-[-4%] group-hover:translate-y-[-4%] bg-[#0e2546] rounded-tl-xl rounded-br-xl justify-center items-center text-white duration-500'>
                    {icon}
                    <h1 className='font-medium text-xs'>{text}</h1>
                </div>
            </div>
        </a>
    )
}

export default FooterCards