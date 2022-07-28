import { createSlice } from '@reduxjs/toolkit'

export const priceSlice = createSlice({
    name:'totalPrice',
    initialState:{
        value:0,
        children:0
    },
    reducers:{
        updatePrice: (state:any,action:any) => {
            state.value = action.payload;
        },
        addChild: (state:any) => {
            state.children += 1;
            state.value += state.children*500;
        }
    }
    
})

export const {updatePrice,addChild} = priceSlice.actions;

export default priceSlice.reducer;