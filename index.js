const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

let courses = [
  {
    id: 1,
    name: "Course name 1"
  },
  {
    id: 2,
    name: "Course name 2"
  },
  {
    id: 3,
    name: "Course name 2"
  }
];

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.get("/api/courses", (req, res) => {
  const sortBy = req.query.sortBy;
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const courseId = req.params.id;
  const course = courses.find(course => course.id === parseInt(courseId));
  if (!course) return res.status(404).send("Course not found.");
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const courseId = req.params.id;
  const course = courses.find(course => course.id === parseInt(courseId));
  if (!course) return res.status(404).send("Course with the id not found.");

  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  course.name = req.body.name;
  res.send(course);
});

// Deleting a course
app.delete("/api/courses/:id", (req, res) => {});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`Listening… port ${PORT}`));
