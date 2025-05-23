import React from 'react';
import avatar from '../assets/images/formal_profile_picture.jpg';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-scroll';

const About = () => {
    return (
        <div name='about' className="w-full h-screen bg-[#0a192f] justify-center">
            <div className='max-w-[1000px] mx-auto justify-center'>
                <div className="flex h-full justify-center pt-[200px]">
                    <div className='px-5 sm:px-10 hover:scale-125 duration-500'>
                        <img className='size-[175px] sm:size-[200px]' src={avatar} alt='profile' style={{ borderRadius: '50%', border: '5px solid #ffffff', objectFit: 'cover' }} />
                    </div>
                    <div className='pr-2'>
                        <p className='text-xl text-pink-600 hover:scale-110 duration-500'>Hi, my name is</p>
                        <h1 className='text-4xl sm:text-7xl font-bold text-[#ccd6f6] hover:scale-110 duration-500'>Zhenbin Lin</h1>
                        <h2 className='text-2xl sm:text-3xl py-4 font-bold max-w-[650px] text-[#8892b0] hover:scale-110 duration-500'>I am a Senior at Stony Brook University and an aspiring software engineer.</h2>
                    </div>
                </div>
                <Link to="education" spy={true} smooth={true} offset={-85} duration={500}>
                    <div className='max-w-[1000px] mx-auto flex justify-center'>
                        <button className='w-10/12 hover:w-11/12 text-white group border-2 px-6 py-3 my-6 flex items-center justify-center hover:bg-pink-600 duration-700'>Learn more
                            <span className='group-hover:rotate-[90deg] group-hover:translate-y-[-5px] group-hover:translate-x-[5px] duration-700'><FaRegArrowAltCircleRight className='ml-3' size={30} /></span>
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default About;