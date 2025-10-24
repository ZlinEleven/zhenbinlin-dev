import { React, useState } from 'react'
import sbuLogo from '../../assets/images/sbu-logo.png';
import courses from '../../data/courses';
import CourseCard from './CourseCard';

const Education = () => {
    const [showCoursework, setShowCoursework] = useState(false);
    const toggleCoursework = () => setShowCoursework(!showCoursework);

    const coursework = [];
    for (const [semester, _courses] of Object.entries(courses).reverse()) {
        coursework.push(<div key={semester} className='flex py-2 justify-center font-bold text-green-700'>{semester}</div>) // Append the semester divider
        _courses.forEach(course => {
            coursework.push(<CourseCard key={course.title} title={course.title} courseNum={course.courseNum} grade={course.grade} desc={course.desc} />)
        })
    }

    return (
        <div name="education" className='flex flex-col items-center my-8'>
            <h1 className=' text-4xl font-bold text-gray-700 mb-[1.75rem] md:mb-[2rem]'>My Education</h1>
            <div className='flex flex-col w-[95vw] md:w-[40rem] bg-gray-100 rounded-xl border-gray-300 border-[2px]'>
                <div className='flex px-16 py-4 justify-center'>
                    <img src={sbuLogo} alt='sbu-logo' className='w-28 h-28 mr-4'></img>
                    <div className='flex flex-col justify-between font-bold'>
                        <p className='text-xl'>Stony Brook University</p>
                        <p className='text-lg'>B.S, Computer Science</p>
                        <p>Expected BS Graduation: May 2026</p>
                        <p>Expected MS Graduation: May 2027</p>
                        <p>GPA: 3.83/4.0</p>
                    </div>
                </div>
                <button
                    onClick={toggleCoursework}
                    className={`border-2 px-6 py-3 mb-4 mx-auto flex justify-center rounded-xl ${showCoursework ? "bg-gray-300" : "bg-gray-100"} hover:bg-gray-300 duration-500`}
                >
                    Relevant Courseworks
                </button>
                <div className={`${showCoursework ? "flex flex-col" : "hidden"} border-t-[2px] border-gray-300`}>
                    {/* Headers */}
                    <div className='flex font-bold text-sm py-3 px-4 bg-gray-400 items-center'>
                        <p className='absolute w-[20%]'> Course Code</p>
                        <p className='ml-[25%] md:ml-[20%] w-[25%] md:w-[235px]'>Course Name</p>
                        <p className='ml-[5%]'>Status</p>
                    </div>
                    {
                        coursework
                    }
                </div>
            </div>
        </div>
    )
}

export default Education