import { createSlice } from '@reduxjs/toolkit'

export const priceSlice = createSlice({
    name:'totalPrice',
    initialState:{
        value:0
    },
    reducers:{
        updatePrice: (state:any,action:any) => {
            state.value = action.payload;
        },
        increasePrice: (state:any,action:any) => {
            state.value += action.payload;
        }
    }
    
})

export const {updatePrice,increasePrice} = priceSlice.actions;

export default priceSlice.reducer;