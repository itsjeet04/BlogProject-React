import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false ,
    userData : null,  
}

// Each slice is a notebook 📓 in that bag (like one for math, one for science).
// Has its own notes (state)
// Knows how to update them (reducers)
// And can shout out what happened (actions)
// Slices are like mini-reducers that manage a specific part of the state.


const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state, action) => {
            state.status = true ;
            state.userData = action.payload;
        }, 
        logout : (state) => {
            state.status = false ;
            state.userData = null;
        }
    }

})

export const { login, logout } = authSlice.actions;
// helps in directly accessing the actions in the component 

export default authSlice.reducer;