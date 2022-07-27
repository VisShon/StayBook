import { createSlice } from '@reduxjs/toolkit'

export const planSlice = createSlice({
    name:'selectedPlans',
    initialState:{
        selectedPlans:[]
    },
    reducers:{
        addPlan: (state:any,action:any) =>{
            state.selectedPlans.push(action.payload);
        },
        removePlan: (state:any,action:any) =>{
           //remove plan method
        }
    }
    
})

export const {addPlan,removePlan} = planSlice.actions;

export default planSlice.reducer;