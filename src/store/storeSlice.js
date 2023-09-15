import { createSlice } from "@reduxjs/toolkit";
const storeSlice=createSlice({
    name:'socket',
    initialState:{
        entities:[]
    },
    reducers:{
        getName(state,action){
            state.data=action.payload
            state._id=action.payload
            state.entities.push(action.payload)
           /* return{
            ...state,
            data:action.payload
           } */
        }
    }
})

export const{getName}=storeSlice.actions;
export const{reducer:socketReducer}=storeSlice