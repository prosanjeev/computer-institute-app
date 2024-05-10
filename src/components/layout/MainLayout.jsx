import TopHeader from "../Header/TopHeader";
import { Outlet } from "react-router-dom";
import DownFooter from "../Footer/DownFooter";
import NAvBarNew from "../Header/NavBar/NAvBarNew";
import { Box } from "@chakra-ui/react";

const MainLayout = () => {
  return (
    <Box
      fontFamily="Google Sans, sans-serif" // Set Google Sans as the font family
    >
      <TopHeader />
      <NAvBarNew />
      <Outlet />
      <DownFooter />
    </Box>
  );
};

export default MainLayout;
