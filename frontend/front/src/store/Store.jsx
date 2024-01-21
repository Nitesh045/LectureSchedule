import {configureStore, createSlice} from '@reduxjs/toolkit';
const authslice=createSlice({
    name:"auth",
    initialState:{isLoggedIn:false},
    reducers:{
        login(state){
            state.isLoggedIn=true
        },
        logout(state){
            state.isLoggedIn=false;
        }
    }
});

export  const authAction=authslice.actions;
export const store=configureStore({
  reducer:authslice.reducer
})