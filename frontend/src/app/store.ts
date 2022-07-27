import { configureStore } from '@reduxjs/toolkit'
import planReducer from './planSlice'
import priceReducer from './priceSlice'

export const store = configureStore({
    reducer: {
      plans:planReducer,
      price:priceReducer
    }
  })

export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch