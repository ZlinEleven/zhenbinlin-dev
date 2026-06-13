import gtLogo from '../../assets/images/gt-logo.svg';
import sbuLogo from '../../assets/images/sbu-logo.png';
import { Section, SectionHeading } from '../layout';
import CourseworkSection from './CourseworkSection';
import SchoolCard from './SchoolCard';
import { schoolBulletClass } from './schoolThemes';

const honors = [
  'Magna Cum Laude',
  'Drs. Stange and Trillo Scholar',
  'Spectrum Scholar',
];

const Education = () => {
  return (
    <Section id="education">
      <SectionHeading
        eyebrow="Background"
        title="Education"
        subtitle="Undergraduate at Stony Brook, graduate study at Georgia Tech."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <SchoolCard theme="sbu">
          <div className="flex gap-4">
            <img
              src={sbuLogo}
              alt="Stony Brook University logo"
              className="size-16 shrink-0 rounded-full object-contain"
            />
            <div>
              <p className="font-semibold text-foreground">Stony Brook University</p>
              <p className="mt-1 text-muted">B.S., Computer Science</p>
              <p className="mt-3 text-sm text-muted">May 2026 · GPA 3.8/4.0</p>
            </div>
          </div>
          <ul className="mt-4 flex flex-col gap-1.5 text-sm text-muted">
            {honors.map((honor) => (
              <li key={honor} className="flex gap-2">
                <span className={schoolBulletClass.sbu} aria-hidden="true">
                  ·
                </span>
                {honor}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            TA: CSE 220 (Systems Fundamentals), CSE 316 (Software Engineering)
          </p>
        </SchoolCard>

        <SchoolCard theme="gt">
          <div className="flex gap-4">
            <img
              src={gtLogo}
              alt="Georgia Institute of Technology logo"
              className="size-16 shrink-0 rounded-full object-contain"
            />
            <div>
              <p className="font-semibold text-foreground">Georgia Institute of Technology</p>
              <p className="mt-1 text-muted">M.S., Computer Science</p>
              <p className="mt-3 text-sm text-muted">Starting Fall 2026 · Atlanta, GA</p>
            </div>
          </div>
        </SchoolCard>
      </div>

      <CourseworkSection />
    </Section>
  );
};

export default Education;
