import React from 'react'

// m-[0.675rem] md:mb-[2.5rem]

const SkillsInfoCard = ({ skills }) => {
    return (
        <div className='grid grid-cols-3 gap-10 mt-[1.25rem]'>
            {
                skills.map((skill, index) => {
                    return (
                        <div className='group'>
                            <div className="flex flex-col relative items-center justify-center 
                        z-10 group-hover:translate-y-[-35px]
                        w-[105px] md:w-[210px] h-[90px] md:h-[180px]
                        rounded-[0.65rem] border-[3px] border-solid border-[#704cf2] bg-white text-gray-600 duration-500"
                        /*'flex flex-col justify-center items-center py-7  md:mx-[-40px] w-[140px] md:w-[220px] rounded-[0.65rem] border-[3px] border-solid border-[#704cf2] bg-gradient-to-r from-[#aa94fe] via-putple-500 to-[#7c5fe6] text-white'*/>
                                <img src={skill.icon} alt="react" className='w-8 md:w-16' />
                                <p className='text-[0.65rem] md:text-[1.3rem] font-[500]'>{skill.name}</p>
                            </div>
                            <div className='flex items-end py-4
                            h-[120px] w-[105px] md:w-[210px] mx-auto mt-[-120px] group-hover:translate-y-[30px]
                            rounded-bl-[0.65rem] rounded-br-[0.65rem] bg-[#151146] duration-500'>
                                <div className='flex flex-col w-full items-center'>
                                    <p className='text-[0.65rem] md:text-[1.3rem] font-[500] text-[#dd8cfa] mb-2'>{skill.percentage}%</p>
                                    <div className='w-[90%] mx-auto bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
                                        <div className="bg-[#7c5fe6] h-2.5 rounded-full duration-500" style={{ width: `${skill.percentage}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SkillsInfoCard