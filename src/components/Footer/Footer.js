import React from 'react'
import FooterCards from './FooterCards'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { ImProfile } from "react-icons/im";

const Footer = () => {
    return (
        <div className='flex h-60 bg-[#0a192f] text-[#ccd6f6] justify-evenly items-center'>
            <div className='flex flex-col p-8 items-center'>
                <h1 className='text-3xl py-4'>Zhenbin Lin</h1>
                <p>CS @ Stony Brook University</p>
            </div>
            <div className='grid grid-cols-2 gap-6 lg:flex'>
                <FooterCards text="Instagram" icon={<FontAwesomeIcon icon={faInstagram} color='#fae1b2' size='lg' className='py-2 mt-[-10px]' />} link='https://www.instagram.com/zlin_eleven/'/>
                <FooterCards text="LinkedIn" icon={<FontAwesomeIcon icon={faLinkedin} color='#fae1b2' size='lg' className='py-2 mt-[-10px]' />} link='https://www.linkedin.com/in/zhenbin-lin'/>
                <FooterCards text="Github" icon={<FontAwesomeIcon icon={faGithub} color='#fae1b2' size='lg' className='py-2 mt-[-10px]' />} link='https://github.com/ZlinEleven'/>
                <FooterCards text="Resume" icon={<ImProfile color='#fae1b2' size='38' className='py-2 mt-[-10px]' />} link='https://drive.google.com/file/d/1JbtAwQlNt0Xo2QTBeJjw2I7yPyZuMwVt/view?usp=sharing'/>
            </div>
        </div>
    )
}

export default Footer