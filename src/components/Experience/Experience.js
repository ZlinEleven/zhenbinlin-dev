import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ExperienceEntries from "./ExperienceEntries";
import experiences from "../../data/experiences";

const Experience = () => {
    return (
        <div name="experience">
            <h1 className="w-full flex justify-center text-4xl font-bold text-gray-700 mt-8">My Experience</h1>
            <VerticalTimeline lineColor="#8c8c8c" >
                {/* {renderExp()} */}
                {
                    experiences.map((experience) => {
                        return <ExperienceEntries 
                                key={experience.title}
                                date={experience.date}
                                title={experience.title}
                                role={experience.role}
                                desc={experience.desc}
                                icon={experience.icon}/>    
                    })
                }
            </VerticalTimeline>
        </div>
    );
}

export default Experience;
