import BoxLayout from "./components/BoxLayout";
import { Box, Center, HStack } from "@chakra-ui/react";
import RecentlyJoinStudent from "./components/RecentlyJoinStudent";
import RecentlyJoinCenter from "./components/RecentlyJoinCenter";
import NewsAndEvents from "./components/NewsAndEvents";

function EventBox({ branchData, studentData, notifications }) { 

  return (
    <Box as="div" borderY='2px solid #DADCE0' bg='#F5F6F7' p="60px 0" w="100vw">
      <Center >
      <HStack w={{base:"90%", md:'80%'}}  flexWrap="wrap" gap={10}  >
        <BoxLayout title='Recently Join Centres'  component={ <RecentlyJoinCenter branchData={ branchData } />}/> 
        <BoxLayout title='Recently Join Student' component={ <RecentlyJoinStudent studentData={studentData} />} />
        <BoxLayout title='News & Events' component={ <NewsAndEvents  notifications={notifications} />} />
      </HStack>  
      </Center>
    </Box>
  );
}

export default EventBox;
