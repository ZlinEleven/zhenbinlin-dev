import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { ImProfile } from "react-icons/im";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import SocialsEntry from './SocialsEntry';
import navbarTabs from '../data/navbarTabs';


const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);

    const tabsRef = useRef([]);
    const [activeTabIndex, setActiveTabIndex] = useState(null);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

    useEffect(() => {
        if (activeTabIndex === null) {
            return;
        }

        const setTabPosition = () => {
            const currentTab = tabsRef.current[activeTabIndex];
            setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
            setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
        }

        setTabPosition();
    }, [activeTabIndex]);

    return (
        <div className="fixed bg-[#0a192f] md:bg-transparent  w-full z-10 flex justify-center items-center px-4 text-white">
            {/* Desktop menu */}
            <div className='hidden md:flex w-[550px] py-4 rounded-b-3xl bg-[#0a192f] mt-[-50px] hover:mt-[0px] duration-500'>
                <div className="hidden md:flex md:w-[500px] mx-auto justify-between h-12 bg-[#cfd1d4] px-4 text-gray-500 rounded-3xl backdrop-blur-sm">
                    <span
                        className='absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300'
                        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
                    >
                        <span className='h-full w-full rounded-3xl bg-[#f3f4f6]' />
                    </span>
                    {navbarTabs.map((tab, index) => {
                        const isActive = activeTabIndex === index;

                        return (
                            <button
                                key={index}
                                ref={(el) => (tabsRef.current[index] = el)}
                                className={`${isActive ? "text-black" : "hover:text-black "} cursor-pointer py-2 my-auto rounded-full px-4 hover:scale-110 duration-100`}
                            >
                                <Link onClick={() => setActiveTabIndex(index)} to={tab.id} spy={true} smooth={true} offset={tab.offset} duration={500}>{tab.name}</Link>
                            </button>
                        )
                    })
                    }
                </div>
            </div>


            {/* Hamburger */}
            <div onClick={handleClick} className='md:hidden z-10 py-8 cursor-pointer'>
                {!nav ? <FaBars /> : <FaTimes />}
            </div>

            {/* Mobile menu */}
            <ul className={!nav ? 'hidden' : 'md:hidden absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center'}>
                {
                    navbarTabs.map((tab, index) => {
                        return <li className="my-6 text-4xl cursor-pointer"><Link onClick={handleClick} to={tab.id} spy={true} smooth={true} offset={tab.offset} duration={500}> {tab.name} </Link></li>
                    })
                }
                {/* <li className='py-6 text-4xl'><Link onClick={handleClick} to="about" spy={true} smooth={true} offset={-100} duration={500}>About</Link><{/li>
                <li className='py-6 text-4xl'>Education</li>
                <li className='py-6 text-4xl'><Link onClick={handleClick} to="experience" spy={true} smooth={true} offset={-100} duration={500}>Experience</Link></li>
                <li className='py-6 text-4xl'>Contact</li>} */}
            </ul>

            {/* Socials */}
            <div className='hidden md:flex fixed flex-col top-[35%] left-0 z-10'>
                <ul>
                    <SocialsEntry background="bg-[#146bc0]" link='https://www.linkedin.com/in/zhenbin-lin/' text='LinkedIn' icon={<FaLinkedin size='30' />} />
                    <SocialsEntry background="bg-[#333333]" link='https://github.com/ZlinEleven' text='GitHub' icon={<FaGithub size='30' />} />
                    <SocialsEntry background="bg-[#6fc2b0]" link='https://drive.google.com/file/d/1JbtAwQlNt0Xo2QTBeJjw2I7yPyZuMwVt/view?usp=sharing' text='Resume' icon={<ImProfile size='30' />} />
                </ul>
            </div>
        </div>
    );
}

export default Navbar;