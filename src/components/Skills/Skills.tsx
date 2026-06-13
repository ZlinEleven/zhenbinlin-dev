import { useState } from 'react';
import skills from '../../data/skills';
import type { SkillCategory } from '../../types';
import SkillCard from './SkillCard';
import SkillsInfoCard from './SkillsInfoCard';

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillCategory>(skills[0]);

  const handleSelectSkill = (skill: SkillCategory) => {
    setSelectedSkill(skill);
  };

  return (
    <div id="skills" className="flex flex-col items-center my-8">
      <h1 className=" text-4xl font-bold text-gray-700 mb-[1.75rem] md:mb-[2rem]">My Skills</h1>
      <div className="md:flex">
        <div className="flex md:flex-col">
          {skills.map((skill) => (
            <SkillCard
              key={skill.title}
              icon={skill.icon}
              title={skill.title}
              isActive={selectedSkill.title === skill.title}
              onClick={() => handleSelectSkill(skill)}
            />
          ))}
        </div>
        <div>
          <SkillsInfoCard skills={selectedSkill.skills} />
        </div>
      </div>
    </div>
  );
};

export default Skills;
