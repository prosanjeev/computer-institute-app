import { Box } from "@chakra-ui/react";
import PageTitle from "../../components/PagesComponents/PageTitleSection/PageTitle";
import ImageBoxGrid from "../Home/Components/ImageBoxes/ImageBoxGrid";

const DiplomaCourses = () => {
  return (
    <><PageTitle pagetitle=" COURSES" />
    <Box my={10}>
    <ImageBoxGrid />
    </Box></>
  )
}

export default DiplomaCourses