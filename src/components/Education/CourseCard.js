import { React, useState } from 'react'

const CourseCard = ({ title, courseNum, grade, desc }) => {
    const [descOpen, setdescOpen] = useState(false);
    const toggleDesc = () => setdescOpen(!descOpen)

    return (
        <div className='flex flex-col'>
            <div className={`flex border-t-2 border-b-2 border-gray-300 items-center ${grade === "In progress..." ? "text-yellow-700" : "text-green-700"} hover:bg-gray-700 hover:text-white duration-300 py-3`}>
                <p className='pl-4 w-[95px] md:w-[136px]'>{courseNum}</p>
                <p className='w-[200px] md:w-[250px] text-ellipsis'>{title}</p>
                <p className='w-[110px] text-ellipsis'>{grade}</p>
                <p className='cursor-pointer border-2 border-black rounded-full p-2' onClick={toggleDesc}>Description</p>
            </div>
            <div className={`${descOpen ? "flex" : "hidden"} p-4`}>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default CourseCard