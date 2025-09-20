import { createSlice } from '@reduxjs/toolkit'

const authSLice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false, role: "user" },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
        changeRole(state, action) {
            const role = action.payload;
            state.role = role;
        },
    },
}); 
export const authActions = authSLice.actions;
export default authSLice.reducer;