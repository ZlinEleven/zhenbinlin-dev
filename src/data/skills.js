import languagesIcon from '../assets/images/languages-icon.png';
import technologiesIcon from '../assets/images/technologies-icon.png';
import toolsIcon from '../assets/images/tools-icon.png';
import reactIcon from '../assets/images/react-icon.svg';
import gitIcon from '../assets/images/git-icon.svg';
import expressIcon from '../assets/images/express-icon.svg';
import pythonIcon from '../assets/images/python-icon.svg';
import flutterIcon from '../assets/images/flutter-icon.svg';
import javaIcon from '../assets/images/java-icon.svg'
import cIcon from '../assets/images/c-icon.svg';
import cppIcon from '../assets/images/cpp-icon.svg';
import javascriptIcon from '../assets/images/javascript-icon.svg';
import typescriptIcon from '../assets/images/typescript-icon.svg'
import nextIcon from '../assets/images/next-icon.svg';
import nodejsIcon from '../assets/images/nodejs-icon.svg';
import tailwindIcon from '../assets/images/tailwindcss-icon.svg';
import androidStudioIcon from '../assets/images/android-studio-icon.svg'
import firebaseIcon from '../assets/images/firebase-icon.svg';
import googleCloudIcon from '../assets/images/google-cloud-icon.svg';
import postmanIcon from '../assets/images/postman-icon.svg';

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
                percentage: 60,
            },
            {
                name: "Java",
                icon: javaIcon,
                percentage: 60,
            },

            {
                name: "C++",
                icon: cppIcon,
                percentage: 40,
            },
            {
                name: "Javascript",
                icon: javascriptIcon,
                percentage: 40,
            },
            {
                name: "Typescript",
                icon: typescriptIcon,
                percentage: 30,
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
                percentage: 60,
            },
            {
                name: "Tailwindcss",
                icon: tailwindIcon,
                percentage: 60,
            },
            {
                name: "Express",
                icon: expressIcon,
                percentage: 30,
            }, 
            {
                name: "Next",
                icon: nextIcon,
                percentage: 30,
            }, 
            {
                name: "Node.js",
                icon: nodejsIcon,
                percentage: 30,
            },
        ]
    },
    {
        title: "Tools",
        icon: toolsIcon,
        skills: [
            {
                name: "Git",
                icon: gitIcon,
                percentage: 70,
            },
            {
                name: "Firebase",
                icon: firebaseIcon,
                percentage: 70,
            },
            {
                name: "GCP",
                icon: googleCloudIcon,
                percentage: 60,
            },
            {
                name: "Android Studio",
                icon: androidStudioIcon,
                percentage: 50,
            },
            {
                name: "Postman",
                icon: postmanIcon,
                percentage: 40,
            },
        ]
    },
]

export default skills;