// import React, { useEffect } from "react";
// import DashboardLayout from "../../components/DashboardLayout";
// import {
//   Box,
//   Flex,
//   Icon,
//   Image,
//   Switch,
//   Table,
//   Tag,
//   Tbody,
//   Td,
//   Text,
//   Th,
//   Thead,
//   Tr,
//   useBreakpointValue,
// } from "@chakra-ui/react";
// import { FaRegEdit } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { selectAllCourses } from "../../../redux/course/coursesSelectors";
// import { fetchCourses } from "../../../redux/course/coursesSlice";
// import { useNavigate } from "react-router-dom";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { fireDB, storage } from "../../../firebase/FirebaseConfig";
// import { doc, updateDoc } from "firebase/firestore";
// import { toast } from "react-toastify";
// import CourseSyllabus from "./components/CourseSyllabus";

// const AllCourses = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const courses = useSelector(selectAllCourses);

//   console.log("coree", courses);

//   useEffect(() => {
//     dispatch(fetchCourses());
//   }, [dispatch]);

//   const handleStatusChange = (studentId, newStatus) => {
//     // Implement your logic to update the status of the student with ID studentId to newStatus
//   };
//   const isDesktop = useBreakpointValue({ base: false, md: true });

//   const handleEditClick = (courseId) => {
//     navigate("/update-course", { state: { courseId } }); // Navigate to "/update-branch" with franchiseId
//   };

//   const handlePhotoSubmit = async (courseId, shortName, newPhotoFile) => {
//     try {
//       // Upload new photo file to Firebase Storage
//       const photoRef = ref(storage, `courses/${shortName}/Photo`);
//       await uploadBytes(photoRef, newPhotoFile);

//       // Get download URL of the new photo
//       const newPhotoUrl = await getDownloadURL(photoRef);

//       // Update the photoUrl field in Firestore
//       const studentRef = doc(fireDB, "courses", courseId);
//       await updateDoc(studentRef, { photoUrl: newPhotoUrl });

//       toast.success("Photo updated successfully");
//     } catch (error) {
//       console.error("Error updating photo: ", error);
//       toast.error("Failed to update photo");
//     }
//   };

//   const handlePhotoChange = async (courseId, shortName, e) => {
//     const newPhotoFile = e.target.files[0];

//     // Check if the file size is less than 60kb
//     if (newPhotoFile.size > 60 * 1024) {
//       toast.error("Please select a photo less than 60kb in size.");
//       return;
//     }

//     // Read the file as a data URL
//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       const dataUrl = event.target.result;

//       // Create a new image element to get the dimensions
//       const img = document.createElement("img");
//       img.onload = async () => {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");
//         canvas.width = img.width;
//         canvas.height = img.height;

//         // Resize the image if necessary
//         if (newPhotoFile.size > 60 * 1024) {
//           const scaleFactor = (60 * 1024) / newPhotoFile.size;
//           canvas.width *= scaleFactor;
//           canvas.height *= scaleFactor;
//         }

//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//         const resizedDataUrl = canvas.toDataURL("image/jpeg");

//         // Convert the data URL back to a Blob
//         const byteString = atob(resizedDataUrl.split(",")[1]);
//         const mimeString = resizedDataUrl
//           .split(",")[0]
//           .split(":")[1]
//           .split(";")[0];
//         let ab = new ArrayBuffer(byteString.length);
//         let ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//           ia[i] = byteString.charCodeAt(i);
//         }
//         const resizedFile = new Blob([ab], { type: mimeString });

//         // Upload the resized file to Firebase Storage
//         handlePhotoSubmit(courseId, shortName, resizedFile);
//       };
//       img.src = dataUrl;
//     };
//     reader.readAsDataURL(newPhotoFile);
//   };

//   const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
//     <Box p="1">
//       <Tag ref={ref} {...rest} cursor="pointer">
//         {children}
//       </Tag>
//     </Box>
//   ));

//   return (
//     <DashboardLayout title="Course List">
//       <Flex direction="column" alignItems="center" mx={2}>
//         <Table
//           variant="simple"
//           colorScheme="blue"
//           size={isDesktop ? "md" : "sm"}
//         >
//           <Thead>
//             <Tr bg="blue.200">
//               <Th fontSize="lg" fontWeight="bold">
//                 Sr.
//               </Th>
//               {/* <Th fontSize="lg" fontWeight="bold">
//                 Date
//               </Th> */}
//               <Th fontSize="lg" fontWeight="bold">
//                 Photo
//               </Th>
//               <Th fontSize="lg" fontWeight="bold">
//                 Short Name
//               </Th>
//               <Th fontSize="lg" fontWeight="bold">
//                 Course Name
//               </Th>
//               <Th fontSize="lg" fontWeight="bold">
//                 Type
//               </Th>
//               <Th fontSize="lg" fontWeight="bold">
//                 Duration
//               </Th>
//               <Th fontSize="lg" fontWeight="bold">
//                 Fee
//               </Th>
//               {/* <Th fontSize="lg" fontWeight="bold">
//                 Status
//               </Th> */}
//               <Th fontSize="lg" fontWeight="bold">
//                 Details
//               </Th>
//               {/* <Th fontSize="lg" fontWeight="bold">
//                    Delete
//                  </Th> */}
//             </Tr>
//           </Thead>
//           <Tbody>
//             {courses.map((course, index) => (
//               <Tr key={index}>
//                 <Td borderLeft="1px solid #90CDF4">{index + 1}</Td>

//                 {/* <Td>
//                   {course.createdAt
//                     ? new Date(
//                         course.createdAt.seconds * 1000
//                       ).toLocaleDateString("en-GB")
//                     : ""}
//                 </Td> */}
//                 <Td borderLeft="1px solid #90CDF4">
//                   <Image
//                     src={course.coursePhotoUrl}
//                     alt={course.courseName}
//                     w="40px"
//                     h="40px"
//                     cursor="pointer"
//                     onClick={(e) => {
//                       const fileInput = document.createElement("input");
//                       fileInput.type = "file";
//                       fileInput.accept = "image/*";
//                       fileInput.addEventListener("change", (e) =>
//                         handlePhotoChange(course.id, course.shortName, e)
//                       );
//                       fileInput.click();
//                     }}
//                   />
//                 </Td>
//                 <Td borderLeft="1px solid #90CDF4">{course.shortName}</Td>
//                 <Td borderLeft="1px solid #90CDF4">{course.courseName}</Td>
//                 {/* <Td>{course.shortName}</Td> */}
//                 <Td borderLeft="1px solid #90CDF4">{course.categoryName}</Td>
//                 <Td borderX="1px solid #90CDF4">{course.duration}</Td>
//                 <Td>{course.fee}</Td>
//                 {/* <Td borderLeft="1px solid #90CDF4">
//                   <Switch
//                     isChecked={course.status === "Active"}
//                     onChange={(e) =>
//                       handleStatusChange(
//                         course.id,
//                         e.target.checked ? "Active" : "Inactive"
//                       )
//                     }
//                     colorScheme={course.status === "Active" ? "green" : "red"}
//                   />
//                 </Td> */}
//                 <Td borderX="1px solid #90CDF4">
//                   {/* <Text>{course.syllabus && course.syllabus.join(", ")}</Text> */}

//                   <CourseSyllabus syllabus={course.syllabus} />


//                   {/* <CustomCard
//                    onClick={() => handleEditClick(course.id)}
//                   >
//                     <Icon as={FaRegEdit} size="sm" colorScheme="blue" />
//                   </CustomCard> */}
//                 </Td>
//                 {/* <Td>
//                      <Button size="sm" colorScheme="red">
//                        Delete
//                      </Button>
//                    </Td> */}
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </Flex>
//     </DashboardLayout>
//   );
// };

// export default AllCourses;
