import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ExperienceEntries from "./ExperienceEntries";
import experiences from "../../data/experiences";

const Experience = () => {
    const renderExp = () => {
        const expList = [];
        for (let i = 0; i < experiences.length; i++) {
            const exp = experiences[i];
            expList.push(<ExperienceEntries
                date={exp.date}
                title={exp.title}
                role={exp.role}
                desc={exp.desc}
                icon={exp.icon}
            ></ExperienceEntries>);
        }
        return expList;
    }

    return (
        <div name="experience">
            <h1 className="w-full flex justify-center text-4xl font-bold text-gray-700 mt-8">My Experience</h1>
            <VerticalTimeline lineColor="#8c8c8c" >
                {renderExp()}
            </VerticalTimeline>
        </div>
    );
}

export default Experience;
