import { React, useState } from 'react'
import sbuLogo from '../../assets/images/sbu-logo.png';
import courses from '../../data/courses';
import CourseCard from './CourseCard';

const Education = () => {
    const [coursework, setCoursework] = useState(false);
    const handleCoursework = () => setCoursework(!coursework);

    return (
        <div name="education" className='flex flex-col items-center my-8'>
            <h1 className=' text-4xl font-bold text-gray-700 mb-[1.75rem] md:mb-[2rem]'>My Education</h1>
            <div className='flex flex-col w-[40rem] bg-gray-100 rounded-xl border-gray-300 border-[2px]'>
                <div className='flex px-16 py-4 justify-center'>
                    <img src={sbuLogo} alt='sbu-logo' className='w-28 mr-4'></img>
                    <div className='flex flex-col justify-between font-bold'>
                        <p className='text-xl'>Stony Brook University</p>
                        <p className='text-lg'>B.S, Computer Science</p>
                        <p>Expected Graduation: May 2026</p>
                        <p>GPA: 3.87/4.0</p>
                    </div>
                </div>
                <button
                    onClick={handleCoursework}
                    className={`border-2 px-6 py-3 mb-4 mx-auto flex justify-center rounded-xl ${coursework ? "bg-gray-300" : "bg-gray-100"} hover:bg-gray-300 duration-500`}
                >
                    Relevant Courseworks
                </button>
                <div className={`${coursework ? "flex flex-col" : "hidden"} border-t-[2px] border-gray-300`}>
                    {/* Headers */}
                    <div className='flex font-bold text-sm py-2 pl-4 bg-gray-400'>
                        <p className='w-[120px]'>Course Code</p>
                        <p className='w-[250px]'>Course Name</p>
                        <p>Status</p>
                    </div>
                    {
                        courses.map((course) => {
                            return <CourseCard key={course.title} title={course.title} courseNum={course.courseNum} grade={course.grade} desc={course.desc} />
                        })
                    }

                    {/* <table className='w-full table-auto text-left'>
                        <thead>
                            <tr>
                                <th className='pl-4'>
                                    Course Name
                                </th>
                                <th>
                                    Course Number
                                </th>
                                <th>
                                    Status
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                courses.map((course) => {
                                    return <CourseCard key={course.title} title={course.title} courseNum={course.courseNum} grade={course.grade} desc={course.desc} toggleDesc={toggleDesc} />
                                })
                            }
                        </tbody>
                    </table> */}
                </div>
            </div>
        </div>
    )
}

export default Education