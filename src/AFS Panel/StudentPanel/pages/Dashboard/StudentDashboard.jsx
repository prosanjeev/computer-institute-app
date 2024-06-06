import { Box, Grid, GridItem, SimpleGrid, Stack } from "@chakra-ui/react";
import DashboardLayout from "../../components/StudentDashboardLayout";
import { stDashboardData } from "./components/stDashboardData";
import StDashboardCard from "./components/StDashboardCard";

const StudentDashboard = () => {
  return (
    <DashboardLayout title="Dashboard">
      <Stack w="90%" mx="auto">
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
                {stDashboardData.map((card) => (
                  <StDashboardCard
                    key={card.name}
                    name={card.name}
                    icon={card.icon}
                  />
                ))}
              </SimpleGrid>
            </GridItem>
          </Grid>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default StudentDashboard;
