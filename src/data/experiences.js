import { MdOutlineWork } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";

let experiences = [
    {
        date: "(Incoming) Jun 2024",
        title: "Software Engineering Intern",
        role: "Angi - Internship",
        desc: "",
        icon: <MdOutlineWork />
    },
    {
        date: "Jan 2024 - Present",
        title: "Teaching Assistant",
        role: "Stony Brook University - Externship",
        desc: "Facilitated comprehension of systems-level programming concepts by conducting weekly office hours, offering personalized assistance to over 160 students. Assisted in the development of course materials by reviewing and providing feedback on homework assignments, recitation materials, and exams. Collaborated with course instructors to address student inquiries and concerns promptly, effectively conveying technical concepts and troubleshooting programming challenges.",
        icon: <FaChalkboardTeacher />
    },
    {
        date: "Jan 2024 - Present",
        title: "Academic Technology Services Intern",
        role: "SBU Division of Information Technology - Internship",
        desc: "Provided technical support to over 50,000 courses offered at Stony Brook University through phone calls, emails, and chat bot conversations to resolve academic technology issues. Designed and presented instructional workshops to 500+ faculty, staff, and students on various academic technologies tools and services under the DoIT management system. Created promotional materials for print, web, and social media on services funded and managed by the DoIT department.",
        icon: <MdOutlineWork />
    },
    {
        date: "Aug 2023 - Present",
        title: "Fullstack Engineer",
        role: "Loqi - Self-employed",
        desc: "Worked in a team of 6 to develop and implement an AI-leveraged learning tool for students. Designed and built backend microservice using Express, Postman and Firebase Cloud Functions. Built out initial frontend with Next and Tailwind CSS consisting of user login, sessions and flashcards screen.",
        icon: <FaLightbulb />
    },
    {
        date: "Jun 2023 - Aug 2023",
        title: "Software Engineering Intern",
        role: "Palapa - Internship",
        desc: "Fullstack software engineer intern for a no-code computer vision startup. Implemented robust dataset importer utility with concurrent image processing and optimized image upload process for diverse file formats. Resolved critical bugs in the AI deletion process, ensuring seamless cleanup in Firebase Storage and Firestore Database upon AI deletion.",
        icon: <MdOutlineWork />

    },
    {
        date: "Oct 2022 - Jun 2023",
        title: "Teacher",
        role: "KG Computech - Part-time",
        desc: "Introduced robotics and programming principles for a class of aspiring engineers in high school and middle school. Taught weekly, 2.5-hour classes with a focus on motion algorithms and sensor implementations in competitive VEX robotics. Programs ramped up from Block-based programming with scratch to C++ with VEXcode.",
        icon: < FaChalkboardTeacher />
    },
    {
        date: "Sep 2019 - May 2022",
        title: "Chief Executive Programmer, Vice Captain",
        role: "Overclock Robotics - Extracurricular",
        desc: "Designed, built, and programmed VEX competition robots. Oversaw the programming development of all teams in the organization as the Chief Executive for programming. Arranged inter-organizational practice matches. 2019-2020 and 2021-2022 New York State Champion. 2022 VEX Worlds Division Champion.",
        icon: <FaRobot />
    },
    {
        date: "Feb 2021 - Aug 2021",
        title: "Data Science Intern",
        role: "MIT BeaverWorks Summer Institute - Internship",
        desc: "Gained hands-on experience applying data science techniques and algorithms to build prognostic models for analysis of medical diseases. Developed a Capstone Project that uses a neural network using cough audio inputs to detect COVID-19. Achieved 98.5% accuracy. Awarded the Dr. Bob Disruptive Engineering Award.",
        icon: < MdOutlineWork />
    }
]

export default experiences;