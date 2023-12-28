import { React, useState } from 'react'

const CourseCard = ({ title, courseNum, grade, desc }) => {
    const [descOpen, setdescOpen] = useState(false);
    const toggleDesc = () => setdescOpen(!descOpen)

    return (
        <div className='flex flex-col'>
            <div className='flex border-t-2 border-b-2 items-center border-gray-300 hover:bg-gray-700 hover:text-white duration-300 py-3'>
                <p className='pl-4 w-[136px]'>{courseNum}</p>
                <p className='w-[250px]'>{title}</p>
                <p className='w-[110px]'>{grade}</p>
                <p className='cursor-pointer border-2 border-black rounded-full p-2' onClick={toggleDesc}>Description</p>
            </div>
            <div className={`${descOpen ? "flex" : "hidden"} p-4`}>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default CourseCard