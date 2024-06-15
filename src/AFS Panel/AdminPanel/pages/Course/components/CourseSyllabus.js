import { Text } from "@chakra-ui/react";

function CourseSyllabus({ syllabus }) {
    if (Array.isArray(syllabus) && typeof syllabus[0] === 'string') {
      return <Text>{syllabus.join(", ")}</Text>;
    } else {
      return (
        <div>
          {syllabus.map((module, index) => (
            <div key={index}>
              <Text>Module {module.module}: {module.topics.join(", ")}</Text>
            </div>
          ))}
        </div>
      );
    }
  }

export default CourseSyllabus