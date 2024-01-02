import { React, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'; 

const CourseCard = ({ title, courseNum, grade, desc }) => {
    const [descOpen, setdescOpen] = useState(false);
    const toggleDesc = () => setdescOpen(!descOpen)

    return (
        <div className='flex flex-col'>
            <div className={`flex border-t-2 border-b-2 px-4 border-gray-300 items-center ${grade === "In progress..." ? "text-yellow-700" : "text-green-700"} hover:bg-gray-700 hover:text-white duration-300 py-3`}>
                <p className='absolute'>{courseNum}</p>
                <p className='ml-[25%] md:ml-[20%] w-[25%] md:w-[350px] truncate'>{title}</p>
                <p className='ml-[5%] w-[30%]'>{grade}</p>
                <p className='hidden md:flex cursor-pointer border-2 border-black rounded-full p-2' onClick={toggleDesc}>Description</p>
                <p className={`flex md:hidden cursor-pointer border-2 border-black rounded-full p-2 ${descOpen ? "rotate-180" : "rotate-0"} duration-300`} onClick={toggleDesc}><FaAngleDown/></p>
            </div>
            <div className={`${descOpen ? "flex" : "hidden"} p-4`}>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default CourseCard