import {
  Box,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import DashboardLayout from "../../components/FranchiseDashboardLayout";
import { franchisedashboardData } from "./components/data";
import Notification from "./components/Notification";
import { FaChartLine } from "react-icons/fa";
import DashboardCard from "../../../components/dashboardCard/DashboardCard";
import DashboardBigCard from "../../../components/dashboardCard/DashboardBigCard";

const FranchiseDashboard = () => {
  return (
    <DashboardLayout title="Dashboard">
      <Stack w="80%" mx="auto">
        <Box w="100%" mt={5}>
          <Grid
            gridTemplateColumns={{
              base: "repeat(1, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap="6"
          >
            <GridItem
              colSpan={{
                base: 1,
                xl: 4,
              }}
            >
              <SimpleGrid
                columns={{ base: 1, md: 4 }}
                // px={7}
                columnGap={4}
                rowGap={5}
              >
                {franchisedashboardData.map((card) => (
                  <DashboardCard
                    key={card.name}
                    name={card.name}
                    info={card.info}
                    icon={card.icon}
                  />
                ))}
              </SimpleGrid>
            </GridItem>
          </Grid>
        </Box>
        <DashboardBigCard
          title="Revenue"
          value="₹3,50,000"
          icon={FaChartLine}
          gradient="linear(to-r, white, gray.50, white)"
        />

        <HStack w="100%" mx="auto" mt={8} gap={10} flexWrap="wrap">
          <Notification />
          <Notification />
        </HStack>
      </Stack>
    </DashboardLayout>
  );
};

export default FranchiseDashboard;
