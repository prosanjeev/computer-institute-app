import React from "react";
import { ChakraProvider, Box, Button } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import { fireDB } from "./AFS Panel/firebase/FirebaseConfig";

const FetchCourses = () => {
    const fetchCourses = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(fireDB, "courses")));

            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            });
        } catch (error) {
            console.error("Error fetching courses: ", error);
        }
    };

    return (
        <ChakraProvider>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Button colorScheme="teal" onClick={fetchCourses}>
                    Fetch Courses
                </Button>
            </Box>
        </ChakraProvider>
    );
};

export default FetchCourses;
