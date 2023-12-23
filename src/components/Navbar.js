import { FaBars, FaTimes} from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);


    return (
        <div className="fixed w-full h-[80px] flex justify-center items-center px-4 bg-[#08192f] text-white">
            {/* Desktop menu */}
                <ul className='hidden md:flex'>
                    <li>About</li>
                    <li>Education</li>
                    <li>Projects</li>
                    <li>Contact</li>
                </ul>


            {/* Hamburger */}
            <div onClick={handleClick} className='md:hidden z-10'>
                {!nav ? <FaBars /> : <FaTimes/>}
            </div>

            {/* Mobile menu */}
            <ul className={!nav ? 'hidden' : 'md:hidden absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center'}>
                <li className='py-6 text-4xl'>About</li>
                <li className='py-6 text-4xl'>Education</li>
                <li className='py-6 text-4xl'>Projects</li>
                <li className='py-6 text-4xl'>Contact</li>
            </ul>
        </div>
    );
}

export default Navbar;