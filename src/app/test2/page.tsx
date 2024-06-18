import { db } from '@/server/db';

export default async function Test() {
  const courses = await db.query.courses.findMany({
    with: {
      modules: {
        with: {
          lessons: true,
        },
      },
    },
  });
  console.log({ courses });

  return (
    <div>
      <h1>Test</h1>
      <pre>
        {courses.map((course) => (
          <div key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <ul>
              {course.modules.map((module) => (
                <li key={module.id}>
                  <h3>{module.title}</h3>
                  <ul>
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <h4>{lesson.title}</h4>
                        <p>{lesson.isPaid}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </pre>
    </div>
  );
}
