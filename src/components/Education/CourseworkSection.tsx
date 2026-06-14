import { useState } from 'react';
import { gtCourses, sbuCourses } from '../../data/courses';
import { Collapse } from '../layout';
import CourseworkTable from './CourseworkTable';
import type { SchoolTheme } from './schoolThemes';

const schools: { id: SchoolTheme; label: string }[] = [
  { id: 'sbu', label: 'Stony Brook' },
  { id: 'gt', label: 'Georgia Tech' },
];

const courseworkBySchool = {
  sbu: sbuCourses,
  gt: gtCourses,
} as const;

const gtPlaceholder = 'Coursework TBD — starting Fall 2026';

const tabActiveClass: Record<SchoolTheme, string> = {
  sbu: 'school-tab-active-sbu',
  gt: 'school-tab-active-gt',
};

const tabInactiveClass: Record<SchoolTheme, string> = {
  sbu: 'school-tab-inactive-sbu hover:text-foreground',
  gt: 'school-tab-inactive-gt hover:text-foreground',
};

const panelClass: Record<SchoolTheme, string> = {
  sbu: 'coursework-panel coursework-panel-sbu',
  gt: 'coursework-panel coursework-panel-gt',
};

const placeholderClass: Record<SchoolTheme, string> = {
  sbu: 'coursework-placeholder coursework-placeholder-sbu',
  gt: 'coursework-placeholder coursework-placeholder-gt',
};

const CourseworkSection = () => {
  const [open, setOpen] = useState(false);
  const [school, setSchool] = useState<SchoolTheme>('sbu');

  const courses = courseworkBySchool[school];
  const hasCourses = Object.keys(courses).length > 0;

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {open ? 'Hide relevant coursework' : 'View relevant coursework'}
        <span
          className={`text-muted transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      <Collapse open={open}>
        <div className="mt-4">
          <div
            className="mb-4 inline-flex rounded-lg border border-border bg-background p-1"
            role="tablist"
            aria-label="Select school coursework"
          >
            {schools.map(({ id, label }) => {
              const isActive = school === id;

              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSchool(id)}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive ? tabActiveClass[id] : tabInactiveClass[id]
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {!hasCourses && school === 'gt' ? (
            <div className={placeholderClass[school]}>
              <p className="text-sm text-muted">{gtPlaceholder}</p>
            </div>
          ) : (
            <div className={panelClass[school]}>
              <CourseworkTable courses={courses} school={school} />
            </div>
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default CourseworkSection;
