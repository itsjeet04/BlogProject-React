// Think of the store like a big notebook 📒. Right now it's empty. You need to add pages (slices) where you write stuff — like scores, names, or whatever your app tracks.

import { configureStore} from "@reduxjs/toolkit";

// A reducer is like a state machine — it decides how the state should change based on what just happened.
// In Redux, a reducer is a pure function that takes the previous state and an action as arguments and returns the next state.
// Reducers are the logic brains of Redux.
// They decide what happens to your app’s state when actions are dispatched.
const store = configureStore({
    reducer : {
        auth : authSlice,
    }
})

export default store;