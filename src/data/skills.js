import languagesIcon from '../assets/images/skills/languages-icon.png';
import technologiesIcon from '../assets/images/skills/technologies-icon.png';
import toolsIcon from '../assets/images/skills/tools-icon.png';
import reactIcon from '../assets/images/skills/react-icon.svg';
import gitIcon from '../assets/images/skills/git-icon.svg';
import expressIcon from '../assets/images/skills/express-icon.svg';
import pythonIcon from '../assets/images/skills/python-icon.svg';
import flutterIcon from '../assets/images/skills/flutter-icon.svg';
import javaIcon from '../assets/images/skills/java-icon.svg'
import cIcon from '../assets/images/skills/c-icon.svg';
import cppIcon from '../assets/images/skills/cpp-icon.svg';
import javascriptIcon from '../assets/images/skills/javascript-icon.svg';
import typescriptIcon from '../assets/images/skills/typescript-icon.svg'
import nextIcon from '../assets/images/skills/next-icon.svg';
import nodejsIcon from '../assets/images/skills/nodejs-icon.svg';
import tailwindIcon from '../assets/images/skills/tailwindcss-icon.svg';
import androidStudioIcon from '../assets/images/skills/android-studio-icon.svg'
import firebaseIcon from '../assets/images/skills/firebase-icon.svg';
import googleCloudIcon from '../assets/images/skills/google-cloud-icon.svg';
import postmanIcon from '../assets/images/skills/postman-icon.svg';
import htmlIcon from '../assets/images/skills/html-icon.svg';
import cssIcon from '../assets/images/skills/css-icon.svg';
import mongoDBIcon from '../assets/images/skills/mongodb-icon.svg';
import githubIcon from '../assets/images/skills/github-icon.svg';

let skills = [
    {
        title: "Languages",
        icon: languagesIcon,
        skills: [
            {
                name: "Python",
                icon: pythonIcon,
                percentage: 80,
            },
            {
                name: "C",
                icon: cIcon,
                percentage: 80,
            },
            {
                name: "Flutter & Dart",
                icon: flutterIcon,
                percentage: 50,
            },
            {
                name: "Java",
                icon: javaIcon,
                percentage: 50,
            },

            {
                name: "C++",
                icon: cppIcon,
                percentage: 40,
            },
            {
                name: "Javascript",
                icon: javascriptIcon,
                percentage: 80,
            },
            {
                name: "Typescript",
                icon: typescriptIcon,
                percentage: 70,
            },
        ]
    },
    {
        title: "Technologies",
        icon: technologiesIcon,
        skills: [
            {
                name: "React",
                icon: reactIcon,
                percentage: 70,
            },
            {
                name: "Tailwindcss",
                icon: tailwindIcon,
                percentage: 70,
            },
            {
                name: "Express",
                icon: expressIcon,
                percentage: 60,
            }, 
            {
                name: "Next",
                icon: nextIcon,
                percentage: 30,
            }, 
            {
                name: "Node.js",
                icon: nodejsIcon,
                percentage: 40,
            },
            {
                name: "HTML",
                icon: htmlIcon,
                percentage: 80,
            },
            {
                name: "CSS",
                icon: cssIcon,
                percentage: 60,
            },
            {
                name: "MongoDB",
                icon: mongoDBIcon,
                percentage: 30,
            },
        ]
    },
    {
        title: "Tools",
        icon: toolsIcon,
        skills: [
            {
                name: "GitHub",
                icon: githubIcon,
                percentage: 65,
            },
            {
                name: "Git",
                icon: gitIcon,
                percentage: 60,
            },
            {
                name: "Firebase",
                icon: firebaseIcon,
                percentage: 50,
            },
            {
                name: "GCP",
                icon: googleCloudIcon,
                percentage: 40,
            },
            {
                name: "Android Studio",
                icon: androidStudioIcon,
                percentage: 40,
            },
            {
                name: "Postman",
                icon: postmanIcon,
                percentage: 40,
            },
        ]
    },
]

skills.forEach((skillCategory) => {
    skillCategory.skills.sort((a, b) => {
        console.log()
        return b.percentage - a.percentage
    })
})

export default skills;