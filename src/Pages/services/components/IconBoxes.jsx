import { Flex, Grid } from "@chakra-ui/react";
import IconBox from "./IconBox";
import { c_shortName } from "../../../info/Info";

function IconBoxes() {
  let iconBoxes = [
    {
      id: 1,
      name: "SOFTWARE DEVELOPMENT",
      text: `Software Development at ${c_shortName}: Innovate and build cutting-edge solutions. Our skilled developers use the latest technologies, ensuring robust and scalable software tailored to your needs.`,

      url: "/services/software.png",
    },

    {
      id: 1,
      name: "DYNAMIC WEB DEVELOPMENT",
      text: `Dynamic Website Development at ${c_shortName}: Craft interactive and responsive websites. Our team combines creativity and functionality, delivering dynamic web solutions for an engaging user experience.`,

      url: "/services/web1.png",
    },

    {
      id: 1,
      name: "WEB APPLICATION",
      text: `Web Application Development by ${c_shortName}: Elevate user experiences with our innovative web apps. We leverage cutting-edge technologies to build scalable, secure, and feature-rich applications tailored to your needs.`,

      url: "/services/web2.png",
    },

    {
      id: 1,
      name: "MOBILE APPS DEVELOPMENT",
      text: `Mobile Apps Development by ${c_shortName}: Transform your ideas into powerful mobile applications. Our experts create intuitive, high-performance apps for iOS and Android, ensuring a seamless user experience.`,

      url: "/services/app.png",
    },

    {
      id: 1,
      name: "SEARCH ENGINE OPTIMIZATION",
      text: `Boost your online visibility with ${c_shortName}'s Search Engine Optimization (SEO) services. Our strategies enhance your website's ranking, drive organic traffic, and elevate your digital presence, maximizing business success.`,

      url: "/services/seo.png",
    },

    {
      id: 1,
      name: "CONTENT WRITING",
      text: `Elevate your brand's narrative with ${c_shortName}'s exceptional content writing services. Our skilled writers craft engaging, SEO-optimized content tailored to your audience, ensuring impactful communication and effective storytelling.`,

      url: "/services/writing.png",
    },

    {
      id: 1,
      name: "ACADEMIC PROJECTS",
      text: `${c_shortName} delivers cutting-edge academic projects, seamlessly integrating innovative solutions and technologies. Empower your educational journey with our expertise, fostering excellence in research and development.`,

      url: "/services/acadmic.png",
    },

    {
      id: 1,
      name: "TRAINING",
      text: `At ${c_shortName}, our comprehensive training programs empower individuals with practical skills and knowledge. We cultivate talent, fostering growth and expertise to thrive in today's dynamic technological landscape.`,

      url: "/services/training.png",
    },

    {
      id: 1,
      name: "CONSULTING",
      text: `Our consulting services at ${c_shortName} provide strategic guidance to businesses, ensuring optimal technology utilization. We offer tailored solutions for challenges, driving success through informed decision-making.`,

      url: "/services/consulting.png",
    },
  ];

  return (
    <Flex
      justify="center"
      flexWrap="wrap"
      gap={10}
      w={{ base: "100%", md: "80%" }}
      mx="auto"
      my={10}
    >
      {iconBoxes.map((iconbox) => {
        return (
          <IconBox
            name={iconbox.name}
            text={iconbox.text}
            url={iconbox.url}
            key={iconbox.id}
          />
        );
      })}
    </Flex>
  );
}

export default IconBoxes;
