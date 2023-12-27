import React from 'react'

const SkillCard = ({ title, icon, isActive, onClick}) => {
  return (
    <div onClick={onClick}>
        <div className={`flex flex-col items-center p-5 md:p-10 m-[0.675rem] md:m-[20px] cursor-pointer
        w-[105px] md:w-[210px] h-[90px] md:h-[180px]
        ${isActive ? "bg-gradient-to-r from-[#aa94fe] via-putple-500 to-[#7c5fe6]" : "bg-[#151146]"}
        hover:bg-gradient-to-r from-[#aa94fe] via-putple-500 to-[#7c5fe6] 
        rounded-[0.65rem] border-solid border-[3px] border-[#704cf2] bg-[#151146] duration-1000 text-white`} /*className={`flex flex-col items-center w-1/5 cursor-pointer rounded-[0.65rem] border-[3px] border-solid border-[#704cf2] p-10 ${isActive ? "bg-gradient-to-r from-[#aa94fe] via-putple-500 to-[#7c5fe6]" : "bg-[#151146]"} hover:bg-gradient-to-r from-[#aa94fe] via-putple-500 to-[#7c5fe6] duration-1000 text-white`}*/>
            <img className='w-8 md:w-16' src={icon} alt={title}/>
            <span className='text-[0.65rem] md:text-[1.3rem] font-[500]'>{title}</span>
        </div>
        
    </div>
  )
}

export default SkillCard