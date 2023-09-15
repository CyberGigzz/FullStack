const Header = ({ name }) => <h2>{name}</h2>;

// const Total = ({ sum }) => <p>Number of exercises {sum}</p>;
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <strong>Number of exercises {totalExercises} </strong>
    </p>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total
        // sum={
        //   course.parts[0].exercises +
        //   course.parts[1].exercises +
        //   course.parts[2].exercises
        // }
        parts={course.parts}
      />
    </div>
  );
};

export default Course;
