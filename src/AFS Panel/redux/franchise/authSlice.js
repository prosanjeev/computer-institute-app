import { createSlice } from "@reduxjs/toolkit";
import { fireDB } from "../../firebase/FirebaseConfig";
import { getDoc, doc, collection, query, where, getDocs, orderBy } from "firebase/firestore";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  userId: localStorage.getItem("userId") || null,
  branchData: JSON.parse(localStorage.getItem("branchData")) || null,
  wallet: parseFloat(localStorage.getItem("wallet")) || 0,
  requestAmount: parseFloat(localStorage.getItem("requestAmount")) || 0,
  students: JSON.parse(localStorage.getItem("students")) || [],
};

export const fetchFranchiseData = () => async (dispatch, getState) => {
  const state = getState();
  try {
    if (state.auth.userId) {
      // Check if the data is already in localStorage and Redux state
      const { branchData, wallet, requestAmount, students } = state.auth;
      if (branchData && wallet && requestAmount && students.length > 0) {
        console.log("Using cached data from Redux state.");
        return;
      }

      const cachedBranchData = JSON.parse(localStorage.getItem("branchData"));
      const cachedWallet = parseFloat(localStorage.getItem("wallet"));
      const cachedRequestAmount = parseFloat(localStorage.getItem("requestAmount"));
      const cachedStudents = JSON.parse(localStorage.getItem("students"));

      if (cachedBranchData && cachedWallet && cachedRequestAmount && cachedStudents) {
        dispatch(setbranchData(cachedBranchData));
        dispatch(setWallet(cachedWallet));
        dispatch(setRequestAmount(cachedRequestAmount));
        dispatch(setStudents(cachedStudents));
        console.log("Using cached data from localStorage.");
        return;
      }

      const docRef = doc(fireDB, "franchiseData", state.auth.userId);
      const docSnap = await getDoc(docRef);
      const franchiseData = docSnap.data();

      if (docSnap.exists()) {
        dispatch(setbranchData(franchiseData));
        dispatch(setWallet(franchiseData.wallet));
        dispatch(setRequestAmount(franchiseData.requestAmount));

        // Store data in localStorage
        localStorage.setItem("branchData", JSON.stringify(franchiseData));
        localStorage.setItem("wallet", franchiseData.wallet.toString());
        localStorage.setItem("requestAmount", franchiseData.requestAmount.toString());

        // Fetch students for the franchise
        const studentsRef = collection(fireDB, "students");
        const franchiseStudentsQuery = query(
          studentsRef,
          where("franchiseId", "==", state.auth.userId),
          orderBy("createdAt", "desc") // Order by createdAt in descending order
        );
        const snapshot = await getDocs(franchiseStudentsQuery);
        const students = [];

        const studentIds = snapshot.docs.map((doc) => doc.id);

        // Fetch corresponding studentCourses documents in batch
        const studentCoursesRef = collection(fireDB, "studentCourses");
        const studentCoursesQuery = query(
          studentCoursesRef,
          where("studentId", "in", studentIds)
        );
        const studentCoursesSnapshot = await getDocs(studentCoursesQuery);

        const studentCoursesMap = {};
        studentCoursesSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (!studentCoursesMap[data.studentId]) {
            studentCoursesMap[data.studentId] = data.courseId;
          }
        });

        // Fetch all courses documents
        const courseDataRef = collection(fireDB, "courses");
        const courseDataSnapshot = await getDocs(courseDataRef);
        const studentCourseDataMap = {};

        // Store courses documents in a map for easy access
        courseDataSnapshot.forEach((doc) => {
          studentCourseDataMap[doc.id] = doc.data();
        });

        await Promise.all(snapshot.docs.map(async (doc) => {
          const studentData = doc.data();
          const studentId = doc.id;

          // Retrieve courseId from the studentCoursesMap
          const courseId = studentCoursesMap[studentId];

          // Add courseName to the student object
          const courseData = courseId ? studentCourseDataMap[courseId] : null;
          const studentWithCourseName = {
            id: studentId,
            ...studentData,
            courseName: courseData ? courseData.courseName : "Course not Selected"
          };
          students.push(studentWithCourseName);
        }));

        // Store students data in localStorage
        localStorage.setItem("students", JSON.stringify(students));

        dispatch(setStudents(students));
      } else {
        console.log("No franchise data found for user ID:", state.auth.userId);
      }
    } else {
      console.log("User ID not found.");
    }
  } catch (error) {
    console.error("Error fetching franchise data:", error);
  }
};

export const fetchFranchiseDataOnly = (centerId = null) => async (dispatch, getState) => {
  const state = getState();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    console.log("User is not logged in.");
    return;
  }

  try {
    let userId = state.auth.userId;

    // Use centerId if provided
    if (centerId) {
      userId = centerId;
    }

    // Check if the data is already in localStorage and Redux state
    const { branchData, wallet, requestAmount } = state.auth;
    if (branchData && wallet && requestAmount) {
      console.log("Using cached data from Redux state.");
      return;
    }

    const cachedBranchData = JSON.parse(localStorage.getItem("branchData"));
    const cachedWallet = parseFloat(localStorage.getItem("wallet"));
    const cachedRequestAmount = parseFloat(localStorage.getItem("requestAmount"));

    if (cachedBranchData && cachedWallet && cachedRequestAmount) {
      dispatch(setbranchData(cachedBranchData));
      dispatch(setWallet(cachedWallet));
      dispatch(setRequestAmount(cachedRequestAmount));
      console.log("Using cached data from localStorage.");
      return;
    }

    if (userId) {
      const docRef = doc(fireDB, "franchiseData", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const franchiseData = docSnap.data();
        dispatch(setbranchData(franchiseData));
        dispatch(setWallet(franchiseData.wallet));
        dispatch(setRequestAmount(franchiseData.requestAmount));

        // Store data in localStorage
        localStorage.setItem("branchData", JSON.stringify(franchiseData));
        localStorage.setItem("wallet", franchiseData.wallet.toString());
        localStorage.setItem("requestAmount", franchiseData.requestAmount.toString());
      } else {
        console.log("No franchise data found for user ID:", userId);
      }
    } else {
      console.log("User ID not found.");
    }
  } catch (error) {
    console.error("Error fetching franchise data:", error);
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", action.payload.userId); // Store userId in localStorage
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId"); // Remove userId from localStorage
      localStorage.removeItem("branchData");
      localStorage.removeItem("wallet");
      localStorage.removeItem("requestAmount");
      localStorage.removeItem("students");
      state.userId = null;
      state.branchData = null;
      state.students = []; // Clear students data on logout
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setbranchData: (state, action) => {
      state.branchData = action.payload;
    },
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setWallet(state, action) {
      state.wallet = action.payload;
    },
    setRequestAmount(state, action) {
      state.requestAmount = action.payload;
    },
  },
});

export const { login, logout, setLoggedIn, setbranchData, setStudents, setWallet, setRequestAmount } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserId = (state) => state.auth.userId;
export const selectbranchData = (state) => state.auth.branchData;
export const selectStudents = (state) => state.auth.students;

export default authSlice.reducer;
