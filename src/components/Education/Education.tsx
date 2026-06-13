import { useState } from 'react';
import sbuLogo from '../../assets/images/sbu-logo.png';
import courses from '../../data/courses';
import { Section, SectionHeading } from '../layout';
import { Card } from '../ui';
import CourseCard from './CourseCard';

const honors = [
  'Magna Cum Laude',
  'Drs. Stange and Trillo Scholar',
  'Spectrum Scholar',
];

const Education = () => {
  const [showCoursework, setShowCoursework] = useState(false);

  return (
    <Section id="education">
      <SectionHeading
        eyebrow="Background"
        title="Education"
        subtitle="Undergraduate at Stony Brook, graduate study at Georgia Tech."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <p className="font-semibold text-foreground">Georgia Institute of Technology</p>
          <p className="mt-1 text-muted">M.S., Computer Science</p>
          <p className="mt-3 text-sm text-muted">Starting Fall 2026 · Atlanta, GA</p>
        </Card>

        <Card>
          <div className="flex gap-4">
            <img src={sbuLogo} alt="Stony Brook University logo" className="size-16 shrink-0 object-contain" />
            <div>
              <p className="font-semibold text-foreground">Stony Brook University</p>
              <p className="mt-1 text-muted">B.S., Computer Science</p>
              <p className="mt-3 text-sm text-muted">May 2026 · GPA 3.8/4.0</p>
            </div>
          </div>
          <ul className="mt-4 flex flex-col gap-1.5 text-sm text-muted">
            {honors.map((honor) => (
              <li key={honor} className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  ·
                </span>
                {honor}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            TA: CSE 220 (Systems Fundamentals), CSE 316 (Software Engineering)
          </p>
        </Card>
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={() => setShowCoursework(!showCoursework)}
          className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          {showCoursework ? 'Hide relevant coursework' : 'View relevant coursework'}
        </button>
        {showCoursework && (
          <Card className="mt-4 overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-background text-left text-xs font-semibold uppercase tracking-wide text-muted">
                    <th className="w-24 px-4 py-3">Code</th>
                    <th className="px-4 py-3">Course</th>
                    <th className="w-16 px-4 py-3">Grade</th>
                    <th className="hidden w-20 px-4 py-3 sm:table-cell" aria-label="Details" />
                    <th className="w-10 px-4 py-3 sm:hidden" aria-label="Details" />
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(courses)
                    .reverse()
                    .flatMap(([semester, semesterCourses]) => [
                      <tr key={semester}>
                        <td
                          colSpan={5}
                          className="border-b border-border bg-background/60 px-4 py-2 text-center text-sm font-semibold text-accent"
                        >
                          {semester}
                        </td>
                      </tr>,
                      ...semesterCourses.map((course) => (
                        <CourseCard
                          key={`${semester}-${course.courseNum}`}
                          title={course.title}
                          courseNum={course.courseNum}
                          grade={course.grade}
                          desc={course.desc}
                        />
                      )),
                    ])}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </Section>
  );
};

export default Education;
