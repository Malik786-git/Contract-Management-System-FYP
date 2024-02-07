import { createSlice } from "@reduxjs/toolkit";

export interface contractState{
    data : object | null | any;
}

export const contractSlice = createSlice({
    name: "contract",
    initialState: {
        data: null,
    } as contractState,
    reducers:{
        addContract: (state, action)=>{
            state.data = action.payload;
        }
    }   
})
export const {addContract} = contractSlice.actions;
export default contractSlice.reducer;