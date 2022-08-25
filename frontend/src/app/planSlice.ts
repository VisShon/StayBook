import { createSlice } from '@reduxjs/toolkit'


export const planSlice = createSlice({
    name:'selectedPlans',
    initialState:{
        selectedPlans:[{
            "title":"Monthly Rate", 
            "info":"Monthy Rate Plan",
            "price": 3419.10,
            "roomType":"Deluxe Suite"
        }]
    },
    reducers:{
        addPlan: (state:any,action:any) =>{
            state.selectedPlans.push(action.payload);
        },
        removePlan: (state:any,action:any) =>{
           state.selectedPlans=state.selectedPlans.filter((item:any) => item.title !== action.payload.title || item.roomType !== action.payload.roomType)
        }
    }
    
})

export const {addPlan,removePlan} = planSlice.actions;

export default planSlice.reducer;