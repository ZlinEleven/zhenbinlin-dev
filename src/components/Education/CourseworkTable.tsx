import type { CoursesBySemester } from '../../types';
import type { SchoolTheme } from './schoolThemes';
import CourseCard from './CourseCard';

interface CourseworkTableProps {
  courses: CoursesBySemester;
  school: SchoolTheme;
}

const headClass: Record<SchoolTheme, string> = {
  sbu: 'coursework-table-head-sbu',
  gt: 'coursework-table-head-gt',
};

const semesterClass: Record<SchoolTheme, string> = {
  sbu: 'coursework-semester-sbu',
  gt: 'coursework-semester-gt',
};

const CourseworkTable = ({ courses, school }: CourseworkTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-sm">
        <thead>
          <tr className={`text-left text-xs font-semibold uppercase tracking-wide ${headClass[school]}`}>
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
                <td colSpan={5} className={`px-4 py-2 text-center text-sm font-semibold ${semesterClass[school]}`}>
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
  );
};

export default CourseworkTable;
