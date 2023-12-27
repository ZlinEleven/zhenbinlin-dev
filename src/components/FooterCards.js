import React from 'react'

const FooterCards = ({ icon, text, link }) => {
    return (
        <a href={link}>
            <div className='group  w-20 h-20 '>
                <div className='flex bg-[#2d415e] w-full h-full rounded-br-xl group-hover:translate-x-[3.75px] group-hover:translate-y-[3.75px] duration-500'></div>
                <div className='flex flex-col w-full h-full mt-[-80px] group-hover:translate-x-[-3.75px] group-hover:translate-y-[-3.75px] bg-[#0e2546] rounded-tl-xl rounded-br-xl justify-center items-center text-white duration-500'>
                    {icon}
                    <h1 className='font-medium text-xs'>{text}</h1>
                </div>
            </div>
        </a>
    )
}

export default FooterCards