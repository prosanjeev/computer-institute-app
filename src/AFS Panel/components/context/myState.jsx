import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

const MyState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      // Fetch users with order by descending creation timestamp
      const querySnapshot = await getDocs(
        query(collection(fireDB, "users"), orderBy("time", "desc"))
      );

      // Extract user data with a slight improvement
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Include document ID for potential use
        ...doc.data(),
      }));

      setUser(userData);
      console.log(userData); // Log sorted user data
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Ensure loading state updates even on errors
    }
  };

  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        user,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
        // logout,
      }}
      
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
