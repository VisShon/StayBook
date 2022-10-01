import { createSlice } from '@reduxjs/toolkit'

export const priceSlice = createSlice({
    name:'totalPrice',
    initialState:{
        value:0,
        children:0,
        withoutTax:0,
    },
    reducers:{
        updatePrice: (state:any,action:any) => {
            state.value = action.payload;
        },
        updateWithoutTaxPrice: (state:any,action:any) => {
            state.withoutTax = action.payload;
        },
        numberOfChildren: (state:any, action:any) => {
            if(state.children==0 && action.payload =='0' ) {
                state.children = 0;
            }
            else{
                action.payload=='1'?state.children++:state.children--;
            }
        }
    }
    
})

export const {updatePrice,updateWithoutTaxPrice,numberOfChildren} = priceSlice.actions;

export default priceSlice.reducer;