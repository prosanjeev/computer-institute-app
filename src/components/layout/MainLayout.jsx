import TopHeader from "../Header/TopHeader";
import { Outlet } from "react-router-dom";
import DownFooter from "../Footer/DownFooter";
import NAvBarNew from "../Header/NavBar/NAvBarNew";
import {  Flex } from "@chakra-ui/react";

const MainLayout = () => {
  return (
    <Flex
      direction="column"
      fontFamily="Google Sans, sans-serif" // Set Google Sans as the font family
    >
      <TopHeader />
      <NAvBarNew />
      <Outlet />
      <DownFooter />
    </Flex>
  );
};

export default MainLayout;
