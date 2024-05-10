import React from "react";
import ImageBox from "./components/ImageBox";
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
      details: "A solid overview of HTML for developers, from novice to expert level HTML.",
      url: "https://web.dev/static/learn/css/card_480.png",
    },
    {
      id: 3,
      name: "Learn JavaScript",
      details: "A solid overview of HTML for developers, from novice to expert level HTML.",
      url: "https://web.dev/static/learn/javascript/card_480.png",
    },
    {
      id: 4,
      name: "Learn React",
      details: "A solid overview of HTML for developers, from novice to expert level HTML.",
      url: "https://web.dev/static/learn/performance/card_480.png",
    },
    {
      id: 5,
      name: "Learn Design",
      details: "A solid overview of HTML for developers, from novice to expert level HTML.",
      url: "https://web.dev/static/learn/design/card_480.png",
    },
    {
      id: 6,
      name: "Learn Nodejs",
      details: "A solid overview of HTML for developers, from novice to expert level HTML.",
      url: "https://successerp.co.in/assets/img/training/web-nodejs-b.png",
    },
  ];

  return (
    <Flex flexWrap="wrap" w="80%" mx="auto" gap={12} justify='center'>
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
