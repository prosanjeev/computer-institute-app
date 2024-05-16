import React from "react";
import { Flex } from "@chakra-ui/react";
import CourseCard from "../../../../components/courseCard/CourseCard";

function ImageBoxGrid() {
  let ImageBoxes = [
    {
      id: 1,
      name: "Learn HTML",
      details: "A solid overview of HTML for developers, from novice to expert level HTML.",
      url: "https://web.dev/static/learn/html/card_480.png",
    },
    {
      id: 2,
      name: "Learn CSS",
      details: "A guide to CSS with modules covering everything from accessibility to z-index.",
      url: "https://web.dev/static/learn/css/card_480.png",
    },
    {
      id: 3,
      name: "Learn JavaScript",
      details: "An in-depth course on the basics of JavaScript.",
      url: "https://web.dev/static/learn/javascript/card_480.png",
    },
    {
      id: 4,
      name: "Learn React",
      details: "Build interactive web interfaces with components, state management, routing, and API integration.",
      url: "https://web.dev/static/learn/performance/card_480.png",
    },
    {
      id: 5,
      name: "Learn Design",
      details: "Let's explore all aspects of responsive design, learning how to make sites that look great and work well for everyone.",
      url: "https://web.dev/static/learn/design/card_480.png",
    },
    {
      id: 6,
      name: "Learn Nodejs",
      details: "Learn server-side JavaScript, asynchronous programming, and database integration for scalable web applications.",
      url: "https://successerp.co.in/assets/img/training/web-nodejs-b.png",
    },
  ];

  return (
    <Flex flexWrap="wrap" w="80%" mx="auto" gap={12} justify='center' >
      {ImageBoxes.map((imagebox) => {
        return (
          // <ImageBox name={imagebox.name} url={imagebox.url} key={imagebox.id} />
          <CourseCard title={imagebox.name} url={imagebox.url} details={imagebox.details} key={imagebox.id}/>
        );
      })}
    </Flex>
  );
}

export default ImageBoxGrid;
