// branchSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, query, orderBy } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';

const initialState = {
  branches: [],
};

export const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setBranches: (state, action) => {
      state.branches = action.payload;
    },
    addBranch: (state, action) => {
      state.branches.push(action.payload);
    },
    updateBranch: (state, action) => {
      const index = state.branches.findIndex(branch => branch.id === action.payload.id);
      if (index !== -1) {
        state.branches[index] = action.payload;
      }
    },
    deleteBranch: (state, action) => {
      state.branches = state.branches.filter(branch => branch.id !== action.payload);
    },
  },
});

export const { setBranches, addBranch, updateBranch, deleteBranch } = branchSlice.actions;

export const selectBranches = state => state.branch.branches;

export const fetchBranches = () => async dispatch => {
  try {
    // Check local storage for cached branches
    const cachedBranches = localStorage.getItem('branches');
    if (cachedBranches) {
      // Parse the cached branches and dispatch the action
      let branches = JSON.parse(cachedBranches);
      branches.sort((a, b) => b.createdAt - a.createdAt);
      dispatch(setBranches(branches));
      return;
    }

    // Fetch branches from Firestore if not found in local storage
    const branchCollection = collection(fireDB, 'franchiseData');
    const branchQuery = query(branchCollection, orderBy('createdAt', 'desc')); // Order by 'createdAt' in descending order
    const querySnapshot = await getDocs(branchQuery);
    const branches = [];
    querySnapshot.forEach(doc => {
      branches.push({ id: doc.id, ...doc.data() });
    });

    // Store the fetched branches in local storage
    localStorage.setItem('branches', JSON.stringify(branches));

    // Dispatch the action with the fetched branches
    dispatch(setBranches(branches));
  } catch (error) {
    console.error('Error fetching branches: ', error);
  }
};

export const fetchLatestBranches = () => async dispatch => {
  try {
    const branchCollection = collection(fireDB, 'franchiseData');
    const querySnapshot = await getDocs(branchCollection);
    const branches = [];
    querySnapshot.forEach(doc => {
      branches.push({ id: doc.id, ...doc.data() });
    });
    const latestBranches = branches.slice(0, 10); // Get the latest 10 entries
    dispatch(setBranches(latestBranches));
  } catch (error) {
    console.error('Error fetching latest branches: ', error);
  }
};

export const addNewBranch = (branchData) => async dispatch => {
  try {
    const docRef = await addDoc(collection(fireDB, 'franchiseData'), branchData);
    const newBranch = { id: docRef.id, ...branchData };

    // Update local storage
    let  cachedBranches = JSON.parse(localStorage.getItem('branches') || '[]');
    // cachedBranches.push(newBranch);
    cachedBranches = [newBranch, ...cachedBranches]; // Add new branch to the beginning

    localStorage.setItem('branches', JSON.stringify(cachedBranches));

    dispatch(addBranch(newBranch));
  } catch (error) {
    console.error('Error adding branch: ', error);
  }
};

export const updateExistingBranch = (branchData) => async (dispatch) => {
  try {
    const branchDocRef = doc(fireDB, 'franchiseData', branchData.id);
    await updateDoc(branchDocRef, branchData);

    // Update local storage
    const cachedBranches = JSON.parse(localStorage.getItem('branches') || '[]');
    const updatedBranches = cachedBranches.map(branch =>
      branch.id === branchData.id ? branchData : branch
    );
    localStorage.setItem('branches', JSON.stringify(updatedBranches));

    dispatch(updateBranch(branchData));
  } catch (error) {
    console.error('Error updating branch: ', error);
  }
};

export const deleteExistingBranch = (branchId) => async dispatch => {
  try {
    const branchDocRef = doc(fireDB, 'franchiseData', branchId);
    await deleteDoc(branchDocRef);

    // Update local storage
    const cachedBranches = JSON.parse(localStorage.getItem('branches') || '[]');
    const updatedBranches = cachedBranches.filter(branch => branch.id !== branchId);
    localStorage.setItem('branches', JSON.stringify(updatedBranches));

    dispatch(deleteBranch(branchId));
  } catch (error) {
    console.error('Error deleting branch: ', error);
  }
};

export default branchSlice.reducer;
