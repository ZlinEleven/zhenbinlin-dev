import { FaBars, FaTimes} from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-scroll'

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
        </div>
    );
}

export default Navbar;