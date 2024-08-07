import { Flex } from "@chakra-ui/react";
import PageTitle from "../../components/PagesComponents/PageTitleSection/PageTitle";
import VerifivaticationForm from "../../components/PagesComponents/VerifivaticationForm";
import StudentVerifiedCard from "./components/StudentVerifiedCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentData,
  selectStudentData,
  selectUserIdStudent,
} from "../../AFS Panel/redux/student/slice/studentSlice";
import DataNotFoundCard from "./components/DataNotFoundCard";
import { clearStudentData } from "../../AFS Panel/redux/student/action/clearStudentData";

const StudentVerification = () => {
  const dispatch = useDispatch();
  const studentData = useSelector(selectStudentData);
  console.log("studentData:", studentData);

  const userId = useSelector(selectUserIdStudent);
  console.log("studentId:", userId);

  const handleSubmit = (formData, resetForm) => {
    const regNumber = formData.user;
    if (regNumber) {
      dispatch(clearStudentData()); // Clear previous data
      dispatch(fetchStudentData(regNumber)); // Fetch new data
      resetForm(); // Clear the input field
    } else {
      console.log("Invalid registration number");
    }
  };

  return (
    <>
      <PageTitle pagetitle="STUDENT VERIFICATION" />
      <Flex
        py={10}
        mx="auto"
        w={{ md: "60vw", base: "90vw" }}
        flexWrap="wrap"
        gap={{ base: "2" }}
      >
        <VerifivaticationForm
          title="STUDENT VERIFICATION"
          label="Registration No"
          onSubmitCallback={handleSubmit}
        />
        {studentData ? (
          <StudentVerifiedCard studentData={studentData} />
        ) : (
          <DataNotFoundCard />
        )}
      </Flex>
    </>
  );
};

export default StudentVerification;
