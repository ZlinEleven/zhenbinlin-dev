import languagesIcon from '../assets/images/languages-icon.png';
import technologiesIcon from '../assets/images/technologies-icon.png';
import toolsIcon from '../assets/images/tools-icon.png';
import reactIcon from '../assets/images/react-icon.svg';
import gitIcon from '../assets/images/git-icon.svg';
import expressIcon from '../assets/images/express-icon.svg';
import pythonIcon from '../assets/images/python-icon.svg';
import flutterIcon from '../assets/images/flutter-icon.svg';
import javaIcon from '../assets/images/java-icon.svg'
import cIcon from '../assets/images/c-icon.svg'

let skills = [
    {
        title: "Languages",
        icon: languagesIcon,
        skills: [
            {
                name: "Python",
                icon: pythonIcon,
                percentage: 100,
            },
            {
                name: "Flutter & Dart",
                icon: flutterIcon,
                percentage: 40,
            },
            {
                name: "Java",
                icon: javaIcon,
                percentage: 40,
            },
            {
                name: "C",
                icon: cIcon,
                percentage: 40,
            }
        ]
    },
    {
        title: "Technologies",
        icon: technologiesIcon,
        skills: [
            {
                name: "React",
                icon: reactIcon,
                percentage: 20,
            },
            {
                name: "Express",
                icon: expressIcon,
                percentage: 20,
            }
        ]
    },
    {
        title: "Tools",
        icon: toolsIcon,
        skills: [
            {
                name: "Git",
                icon: gitIcon,
                percentage: 60,
            }
        ]
    },
]

export default skills;