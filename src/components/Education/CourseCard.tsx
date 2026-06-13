import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface CourseCardProps {
  title: string;
  courseNum?: string;
  grade?: string;
  desc?: string;
}

const CourseCard = ({ title, courseNum, grade, desc }: CourseCardProps) => {
  const [descOpen, setDescOpen] = useState(false);

  if (courseNum === undefined) {
    return null;
  }

  return (
    <>
      <tr className="border-b border-border">
        <td className="w-24 px-4 py-3 align-middle font-mono text-xs text-muted">{courseNum}</td>
        <td className="px-4 py-3 align-middle text-foreground">{title}</td>
        <td className="w-16 px-4 py-3 align-middle text-muted">{grade}</td>
        <td className="hidden w-20 px-4 py-3 align-middle sm:table-cell">
          {desc && (
            <button
              type="button"
              onClick={() => setDescOpen(!descOpen)}
              className="text-xs font-medium text-accent"
              aria-expanded={descOpen}
            >
              Details
            </button>
          )}
        </td>
        <td className="w-10 px-4 py-3 align-middle sm:hidden">
          {desc && (
            <button
              type="button"
              onClick={() => setDescOpen(!descOpen)}
              className="text-accent"
              aria-label="Toggle description"
            >
              <FaAngleDown className={`transition-transform ${descOpen ? 'rotate-180' : ''}`} />
            </button>
          )}
        </td>
      </tr>
      {descOpen && desc && (
        <tr className="border-b border-border bg-background">
          <td colSpan={5} className="px-4 py-3 text-sm leading-relaxed text-muted">
            {desc}
          </td>
        </tr>
      )}
    </>
  );
};

export default CourseCard;
