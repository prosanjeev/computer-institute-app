import { Box, Flex, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import DashboardLayout from "../../components/DashboardLayout";
// import { dashboardData } from "./data";
import {
  FaCodeBranch,
  FaUserGraduate,
  FaBook,
  FaUserPlus,
  FaUser,
  FaUserTie,
  FaBookOpen,
  FaClipboardList,
  FaChalkboardTeacher,
  FaFileAlt,
  FaFileSignature,
  FaChartLine,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBranches,
  selectBranches,
} from "../../../redux/admin/branchSlice";
import { useEffect } from "react";
import { selectAllCourses } from "../../../redux/course/coursesSelectors";
// import { fetchCourses } from "../../../redux/course/coursesSlice";
import { selectStudents } from "../../../redux/selectors/franchiseStudentsSelectors";
import { fetchStudents } from "../../../redux/actions/franchiseStudentsActions";
import { selectStudentCoursesSize } from "../../../redux/selectors/enrollmentSelectors";
import DashboardChart from "./components/DashboardChart";
import DashboardCard from "../../../components/dashboardCard/DashboardCard";
import DashboardBigCard from "../../../components/dashboardCard/DashboardBigCard";
import { fetchCourses } from "../../../redux/course/coursesActions";

const iconMapping = {
  Branch: FaCodeBranch,
  Student: FaUserGraduate,
  Courses: FaBook,
  Admission: FaUserPlus,
  User: FaUser,
  Staff: FaUserTie,
  Subject: FaBookOpen,
  MARKSHEET: FaClipboardList,
  "VI CLASSES": FaChalkboardTeacher,
  "ST MATERIALS": FaFileAlt,
  "News Notice": FaFileSignature,
  SYLLABUS: FaFileAlt,
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const branches = useSelector(selectBranches);
  const students = useSelector(selectStudents);
  const courses = useSelector(selectAllCourses);
  const studentCoursesSize = useSelector(selectStudentCoursesSize);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchStudents());
    dispatch(fetchCourses());
  }, [dispatch]);

  const dashboardData = [
    {
      name: "Branchs",
      info: branches.length,
      icon: iconMapping["Branch"],
    },
    {
      name: "Students",
      info: students.length,
      icon: iconMapping["Student"],
    },
    {
      name: "Courses",
      info: courses.length,
      icon: iconMapping["Courses"],
    },
    {
      name: "Admission",
      info: studentCoursesSize,
      icon: iconMapping["Admission"],
    },
    // {
    //   name: "User",
    //   info: "43",
    //   icon: iconMapping["User"],
    // },
    // {
    //   name: "Staff",
    //   info: "14",
    //   icon: iconMapping["Staff"],
    // },
    {
      name: "Subject",
      info: "22",
      icon: iconMapping["Subject"],
    },
    {
      name: "MARKSHEET",
      info: "3",
      icon: iconMapping["MARKSHEET"],
    },
    // {
    //   name: "VI CLASSES",
    //   info: "7",
    //   icon: iconMapping["VI CLASSES"],
    // },
    // {
    //   name: "ST MATERIALS",
    //   info: "16",
    //   icon: iconMapping["ST MATERIALS"],
    // },
    {
      name: "News Notice",
      info: "4",
      icon: iconMapping["News Notice"],
    },
    {
      name: "SYLLABUS",
      info: "11",
      icon: iconMapping["SYLLABUS"],
    },
  ];
  return (
    <DashboardLayout title="Dashboard">
      <Box w="80%" mx="auto" mt={5}>
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
              {dashboardData.map((card) => (
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

        <Flex direction="column" gap={6}>
          <DashboardBigCard
            title="Revenue"
            value="₹3,50,000"
            icon={FaChartLine}
            gradient="linear(to-r, white, blue.50, white)"
          />
          {/* <PortfolioSection /> */}
          <DashboardChart />
          {/* <DashboardCard
            title="Users"
            value="1,245"
            icon={FaUsers}
            gradient="linear(to-r, blue.500, purple.500)"
          /> */}
          {/* <DashboardCard
            title="Sales"
            value="$1,200"
            icon={FaDollarSign}
            gradient="linear(to-r, teal.500, green.500)"
          /> */}
          {/* Add more DashboardCard components as needed */}
        </Flex>

        {/* <InvoiceCard/> */}
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
