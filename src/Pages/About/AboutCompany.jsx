import { Box } from "@chakra-ui/react";
import PageTitle from "../../components/PagesComponents/PageTitleSection/PageTitle";
import AboutBox from "../Home/Components/AboutBox/AboutBox";

const AboutCompany = () => {
  return (
    <><PageTitle pagetitle="ABOUT COMPANY" />
    <Box >
      <AboutBox/>
      
    </Box></>
  );
}

export default AboutCompany;