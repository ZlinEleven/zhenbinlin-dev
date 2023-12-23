import { FaBars, FaTimes, FaGithub, FaLinkedin} from 'react-icons/fa';
import { ImProfile } from "react-icons/im";
import { useState } from 'react';
import { Link } from 'react-scroll';
import SocialsEntry from './SocialsEntry';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);


    return (
        <div className="w-full py-9 flex justify-center items-center px-4 bg-[#08192f] text-white">
            {/* Desktop menu */}
                <ul className='hidden md:flex'>
                    <li>
                        <Link to="/" spy={true} smooth={true} offset={50} duration={500}>About</Link>
                    </li>
                    <li><Link to="education">Education</Link></li>
                    <li><Link to="experience">Experience</Link></li>
                    <li><Link to="contact">Contact</Link></li>
                </ul>


            {/* Hamburger */}
            <div onClick={handleClick} className='md:hidden z-10'>
                {!nav ? <FaBars /> : <FaTimes/>}
            </div>

            {/* Mobile menu */}
            <ul className={!nav ? 'hidden' : 'md:hidden absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center'}>
                <li className='py-6 text-4xl'>About</li>
                <li className='py-6 text-4xl'>Education</li>
                <li className='py-6 text-4xl'>Experience</li>
                <li className='py-6 text-4xl'>Contact</li>
            </ul>

            {/* Socials */}
            <div className='hidden lg:flex fixed flex-col top-[35%] left-0 z-10'>
                <ul>
                    <SocialsEntry background='#146bc0' link='https://www.linkedin.com/in/zhenbin-lin/' text='LinkedIn' icon={<FaLinkedin size='30'/>}/>
                    <SocialsEntry background='#333333' link='https://github.com/ZlinEleven' text='GitHub' icon={<FaGithub size='30'/>}/>
                    <SocialsEntry background='#6fc2b0' link='https://drive.google.com/file/d/1JbtAwQlNt0Xo2QTBeJjw2I7yPyZuMwVt/view?usp=sharing' text='Resume' icon={<ImProfile size='30'/>}/>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;