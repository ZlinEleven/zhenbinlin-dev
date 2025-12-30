import React from 'react';
import avatar from '../../assets/images/formal_profile_picture.jpg';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-scroll';
import LifeCarousel from '../About/LifeCarousel';

const About = () => {
    return (
        <div name='about' className="w-full min-h-screen bg-[#0a192f] py-16 cursor-default">
            <div className='max-w-[1000px] mx-auto px-4 mt-4'>
                {/* Profile and Introduction Section */}
                <div className="text-center mb-16">
                    <div className='space-y-6'>
                        <div>
                            <p className='text-xl text-pink-600 hover:scale-105 duration-500'>Hi, my name is</p>
                            <h1 className='text-5xl sm:text-7xl font-bold text-[#ccd6f6] hover:scale-105 duration-500 leading-tight'>
                                Zhenbin Lin
                            </h1>
                        </div>

                        <h2 className='text-xl sm:text-2xl font-bold max-w-[700px] mx-auto text-[#8892b0] hover:scale-105 duration-500 leading-relaxed'>
                            I am a Senior at Stony Brook University and an aspiring software engineer.
                        </h2>

                        {/* Profile Picture */}
                        <div className='flex justify-center mt-8'>
                            <div className='hover:scale-110 duration-500 relative'>
                                <img
                                    className='size-[180px] sm:size-[220px]'
                                    src={avatar}
                                    alt='profile'
                                    style={{
                                        borderRadius: '50%',
                                        border: '4px solid #ffffff',
                                        objectFit: 'cover',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Learn More Button */}
                <div className="mb-20">
                    <Link to="education" spy={true} smooth={true} offset={-85} duration={500}>
                        <div className='flex justify-center'>
                            <button className='group overflow-hidden bg-transparent border-2 border-pink-600 text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-all duration-300'>
                                <span className="relative z-10 flex items-center">
                                    Learn more about my journey
                                    <span className='group-hover:rotate-[90deg] group-hover:translate-y-[-2px] group-hover:translate-x-[2px] duration-700 ml-3 transition-all'>
                                        <FaRegArrowAltCircleRight size={20} />
                                    </span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </button>
                        </div>
                    </Link>
                </div>

                {/* Life Moments Carousel Section */}
                <div className="max-w-[800px] mx-auto">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-[#ccd6f6] mb-2">
                            Life Moments
                        </h3>
                        <p className="text-[#8892b0] text-lg">
                            A glimpse into my journey and experiences
                        </p>
                    </div>
                    <LifeCarousel />
                </div>
            </div>
        </div>
    );
}

export default About;