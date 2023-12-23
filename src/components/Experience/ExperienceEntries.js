import { VerticalTimelineElement } from "react-vertical-timeline-component";


const ExperienceEntries = ({ date, title, role, desc, icon }) => {
    return (
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: '#f2f2f2', color: '#000000' }}
            contentArrowStyle={{ borderRight: '7px solid  #92a0a0' }}
            iconStyle={{ background: '#ffffff'}}
            date={date}
            icon={icon}>
            <h3 className="text-l font-bold"> {title} </h3>
            <h3 className="text-l font-semibold"> {role} </h3>
            <h3 className="text-l "> {desc} </h3>
        </VerticalTimelineElement>
    );
}

export default ExperienceEntries;