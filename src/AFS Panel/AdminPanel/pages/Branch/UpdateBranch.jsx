import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Field, Form, Formik } from "formik";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import data from "../../../../components/state-wise-cities-data/data";
import { fireDB } from "../../../firebase/FirebaseConfig";
import { PersonalInformation, UserCradesial } from "./components/data";
import TitleBox from "../../../components/components/TitleBox";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateBranch,
  updateExistingBranch,
} from "../../../redux/admin/branchSlice";

const UpdateBranch = () => {
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [branchData, setBranchData] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const franchiseId = location.state ? location.state.franchiseId : null;
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch branch data based on branchId
    const fetchBranchData = async () => {
      const branchDocRef = doc(fireDB, "franchiseData", franchiseId);
      const branchDocSnapshot = await getDoc(branchDocRef);
      if (branchDocSnapshot.exists()) {
        setBranchData(branchDocSnapshot.data());
      }
    };
    fetchBranchData();
  }, [franchiseId]);

  useEffect(() => {
    if (branchData && branchData.district) {
      setSelectedState(branchData.state);
      setCities([branchData.district]);
    }
  }, [branchData]);

  useEffect(() => {
    setCities(data.cities[selectedState] || []);
    setSelectedCity("");
  }, [selectedState, selectedCity]);

  function handleStateChange(event) {
    const newState = event.target.value;
    setSelectedState(newState);
    setSelectedCity("");
    console.log("Selected State:", newState);
  }

  function handleCityChange(event) {
    const newCity = event.target.value;
    setSelectedCity(newCity);
    console.log("Selected City:", newCity);
  }

  const CenterInformation = [
    {
      label: "Center Name",
      name: "centerName",
      type: "text",
    },
    {
      label: "Office Phone",
      name: "officePhone",
      type: "text",
    },
    {
      label: "Select State",
      name: "state",
      type: "select",
      options: data.states,
      onChange: handleStateChange,
    },
    {
      label: "Select City",
      name: "district",
      type: "select",
      options: cities,
      onChange: handleCityChange,
    },
    {
      label: "Police Station",
      name: "policeStation",
      type: "text",
    },
    {
      label: "Pin Code",
      name: "pinCode",
      type: "text",
    },
    {
      label: "Center Place",
      name: "centerPlace",
      type: "text",
    },
    {
      label: "Wathsapp No.",
      name: "wathsappPhone",
      type: "text",
    },
  ];

  const onSubmit = async (values) => {
    try {
      const branchDocRef = doc(fireDB, "franchiseData", franchiseId);
      const branchDocSnapshot = await getDoc(branchDocRef);

      if (branchDocSnapshot.exists()) {
        const existingBranchData = branchDocSnapshot.data();
        const updatedBranchData = {
          ...existingBranchData, // Keep existing data like centerId and createdAt
          ...values, // Overwrite with new values
          id: franchiseId, // Ensure the id is included
          centerId: existingBranchData.centerId,
          createdAt: existingBranchData.createdAt,
          logoUrl: existingBranchData.logoUrl,
          signUrl: existingBranchData.signUrl,
        };

        await updateDoc(branchDocRef, updatedBranchData);

        // Update local storage
        const cachedBranches =
          JSON.parse(localStorage.getItem("branches")) || [];

        console.log("Cached Branches:", cachedBranches);

        const updatedBranches = cachedBranches.map((branch) =>
          branch.id === updatedBranchData.id ? updatedBranchData : branch
        );

        console.log("Updated Branches:", updatedBranches);

        localStorage.setItem("branches", JSON.stringify(updatedBranches));
        console.log("LocalStorage updated successfully");

        dispatch(updateBranch(updatedBranchData));
        toast.success("Center Updated Successfully");
        navigate("/branch");
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap');
      </style>

      <DashboardLayout title="Update Center">
        <Center>
          <Card
            my={6}
            py={6}
            borderRadius="16px"
            minW={{
              base: "90vw",
              md: "100vw",
              lg: "1000px",
            }}
            fontFamily="Philosopher"
          >
            <Box
              bgColor="green"
              w="400px"
              p="12px 16px"
              borderRadius="0 50px 50px 0"
            >
              <Text color="white" textStyle="h1">
                Center Update Form
              </Text>
            </Box>

            <Formik
              initialValues={{
                centerName: branchData?.centerName || "",
                directorName: branchData?.directorName || "",
                gender: branchData?.gender || "",
                primaryPhone: branchData?.primaryPhone || "",
                wathsappPhone: branchData?.wathsappPhone || "",
                officePhone: branchData?.officePhone || "",
                email: branchData?.email || "",
                documentType: branchData?.documentType || "",
                documentNumber: branchData?.documentNumber || "",
                state: branchData?.state || "",
                district: branchData?.district || "",
                policeStation: branchData?.policeStation || "",
                pinCode: branchData?.pinCode || "",
                centerPlace: branchData?.centerPlace || "",
                userName: branchData?.userName || "",
                password: branchData?.password || "",
              }}
              onSubmit={onSubmit}
              enableReinitialize={true}
            >
              {(formikProps) => (
                <Form>
                  <Stack mt={10} spacing={6}>
                    <TitleBox title=" Centre Head Information" />

                    <SimpleGrid columns={2} px={7} columnGap={4} rowGap={4}>
                      {PersonalInformation.map((list, index) => (
                        <Field name={list.name} key={index}>
                          {({ field, meta }) => (
                            <FormControl isInvalid={meta.error && meta.touched}>
                              <FormLabel htmlFor={list.name}>
                                {list.label}
                              </FormLabel>
                              {list.type === "select" ? (
                                <Select
                                  bgColor="black.5"
                                  name={list.name}
                                  value={formikProps.values[list.name]}
                                  onChange={(e) => {
                                    formikProps.setFieldValue(
                                      list.name,
                                      e.target.value
                                    );
                                    if (list.onChange) {
                                      list.onChange(e);
                                    }
                                  }}
                                  placeholder={` ${list.label}`}
                                >
                                  {list.options.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Select>
                              ) : (
                                <Input
                                  bgColor="black.5"
                                  name={list.name}
                                  value={formikProps.values[list.name]}
                                  onChange={(e) => {
                                    formikProps.setFieldValue(
                                      list.name,
                                      e.target.value
                                    );
                                  }}
                                  type={list.type}
                                  {...field}
                                />
                              )}
                              <FormErrorMessage>{meta.error}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      ))}
                    </SimpleGrid>

                    <TitleBox title=" Center Information" />

                    <SimpleGrid columns={2} px={7} columnGap={4} rowGap={4}>
                      {CenterInformation.map((list, index) => (
                        <Field name={list.name} key={index}>
                          {({ field, meta }) => (
                            <FormControl isInvalid={meta.error && meta.touched}>
                              <FormLabel htmlFor={list.name}>
                                {list.label}
                              </FormLabel>
                              {list.type === "select" ? (
                                <Select
                                  bgColor="black.5"
                                  name={list.name}
                                  value={formikProps.values[list.name]}
                                  onChange={(e) => {
                                    formikProps.setFieldValue(
                                      list.name,
                                      e.target.value
                                    );
                                    if (list.onChange) {
                                      list.onChange(e);
                                    }
                                  }}
                                  placeholder={` ${list.label}`}
                                >
                                  {list.options.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Select>
                              ) : (
                                <Input
                                  bgColor="black.5"
                                  readOnly={list.readOnly}
                                  name={list.name}
                                  value={formikProps.values[list.name]}
                                  onChange={(e) => {
                                    formikProps.setFieldValue(
                                      list.name,
                                      e.target.value
                                    );
                                  }}
                                  type={list.type}
                                  {...field}
                                />
                              )}
                              <FormErrorMessage>{meta.error}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      ))}
                    </SimpleGrid>

                    <TitleBox title=" User Credentials" />

                    <SimpleGrid columns={2} px={7} columnGap={4} rowGap={4}>
                      {UserCradesial.map((list, index) => (
                        <Field name={list.name} key={index}>
                          {({ field, meta }) => (
                            <FormControl isInvalid={meta.error && meta.touched}>
                              <FormLabel htmlFor={list.name}>
                                {list.label}
                              </FormLabel>
                              <Input
                                readOnly={list.readOnly}
                                bgColor="black.5"
                                name={list.name}
                                value={formikProps.values[list.name]}
                                onChange={(e) => {
                                  formikProps.setFieldValue(
                                    list.name,
                                    e.target.value
                                  );
                                }}
                                type={list.type}
                                {...field}
                              />
                              <FormErrorMessage>{meta.error}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      ))}
                    </SimpleGrid>

                    <Field name="active">
                      {({ field, meta }) => (
                        <FormControl
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Checkbox
                            name="active"
                            value={formikProps.values["active"]}
                            colorScheme="green"
                            size="lg"
                            onChange={(e) => {
                              formikProps.setFieldValue(
                                "active",
                                e.target.checked
                              );
                            }}
                            {...field}
                          />
                          <FormLabel
                            htmlFor="active"
                            mb="0"
                            ml="10px"
                            fontSize="2xl"
                            fontWeight="bold"
                          >
                            Active
                          </FormLabel>
                        </FormControl>
                      )}
                    </Field>

                    <Button
                      rightIcon={<MdKeyboardDoubleArrowRight />}
                      colorScheme="green"
                      type="submit"
                      width="200px"
                      alignSelf="center"
                    >
                      Update Center
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Card>
        </Center>
      </DashboardLayout>
    </>
  );
};

export default UpdateBranch;
