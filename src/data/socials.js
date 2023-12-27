import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ImProfile } from "react-icons/im";

let socials = [
    {
        name: "Linkedin",
        background: "bg-[#146bc0]",
        link: 'https://www.linkedin.com/in/zhenbin-lin/',
        icon: <FaLinkedin size='30'/>
    },
    {
        name: "Github",
        background: "bg-[#333333]",
        link: 'https://github.com/ZlinEleven',
        icon: <FaGithub size='30'/>
    },
    {
        name: "Resume",
        background: "bg-[#6fc2b0]",
        link: 'https://drive.google.com/file/d/1JbtAwQlNt0Xo2QTBeJjw2I7yPyZuMwVt/view?usp=sharing',
        icon: <ImProfile size='30'/>
    },
];

export default socials;