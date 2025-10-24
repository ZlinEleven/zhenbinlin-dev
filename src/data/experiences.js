import { MdOutlineWork } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";

let experiences = [
    {
        date: "Jun 2025 - Aug 2025",
        title: "Capital One - Internship",
        role: "Software Engineering Intern",
        desc: "Developed a new microservice to automatically validate Federal Acknowledgement files, replacing third-party dependencies and manual validation processes; reduced operational costs by 80% and decreased human errors. Engineered an SQS-Lambda pipeline to process S3 object creation events and asynchronously validate transaction data, fully automating a manual workflow and enabling immediate operational response to anomalies. Integrated private SDP stream to transmit Federal Acknowledgement data to the OnePay UI. Developed OpenSearch queries to retrieve and display real-time transaction data for the operations team. Achieved 100% test coverage utilizing Jest across unit, integration, system, and end-to-end tests with logging",
        icon: <MdOutlineWork />
    },
    {
        date: "Jan 2025 - May 2025",
        title: "CSE316 Teaching Assistant",
        role: "Stony Brook University - Externship",
        desc: "Facilitated comprehension of fundamental web development concepts by conducting weekly office hours, offering personalized assistance to over 160 students. Assisted in the development of course materials by reviewing and providing feedback on homework assignments, recitation materials, and exams. Collaborated with course instructors to address student inquiries and concerns promptly, effectively conveying technical concepts and troubleshooting programming challenges.",
        icon: <FaChalkboardTeacher />
    },
    {
        date: "Jun 2024 - Aug 2024",
        title: "Angi - Internship",
        role: "Software Engineering Intern",
        desc: "Increased Google Search click-through rate by 12% by modifying JSON-LD schema for SEO and Google indexing. Enabled Contentful workflow for 2,800 employees by integrating 3 microservices across distributed architecture. Achieved 2 s updates by building REST API in Spring Boot with Redis caching to fetch from GraphQL data layer. Authored 10+ unit tests with JUnit and deployed 5 production releases to Kubernetes via Jenkins CI/CD pipeline.",
        icon: <MdOutlineWork />
    },
    {
        date: "Jan 2024 - Present",
        title: "Academic Technology Services Technician",
        role: "SBU Division of Information Technology",
        desc: "Provided technical support to over 50,000 courses offered at Stony Brook University through phone calls, emails, and chat bot conversations to resolve academic technology issues. Designed and presented instructional workshops to 500+ faculty, staff, and students on various academic technologies tools and services under the DoIT management system. Created promotional materials for print, web, and social media on services funded and managed by the DoIT department.",
        icon: <MdOutlineWork />
    },
    {
        date: "Jan 2024 - May 2024",
        title: "CSE220 Teaching Assistant",
        role: "Stony Brook University - Externship",
        desc: "Facilitated comprehension of systems-level programming concepts by conducting weekly office hours, offering personalized assistance to over 160 students. Assisted in the development of course materials by reviewing and providing feedback on homework assignments, recitation materials, and exams. Collaborated with course instructors to address student inquiries and concerns promptly, effectively conveying technical concepts and troubleshooting programming challenges.",
        icon: <FaChalkboardTeacher />
    },
    {
        date: "Aug 2023 - Present",
        title: "Fullstack Engineer",
        role: "Loqi - Self-employed",
        desc: "Led 6 engineers to develop an AI-leveraged application using Express, Google Cloud Functions, and OpenAI LLMs. Engineered 3 microservices containerized with Docker, creating 15+ REST API endpoints tested with Postman. Built mobile-responsive website with Next.js, Typescript, and TailwindCSS, hosted on Vercel.",
        icon: <FaLightbulb />
    },
    {
        date: "Jun 2023 - Aug 2023",
        title: "Palapa - Internship",
        role: "Software Engineering Intern",
        desc: "Optimized image upload efficiency by 30% by Implementing a new dataset importer utility to handle 5+ file formats and concurrent image processing. Rectified a critical bug within the AI deletion process, guaranteeing seamless data cleanup across Firebase Storage and Firestore Database upon AI deletion; reduced orphaned data by 99%. Created an admin-facing profile photo picker by leveraging the Firebase API to integrate Authentication for secure access and Storage for image uploads.",
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