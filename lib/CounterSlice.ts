import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Brand } from "@/app/types/brands.model";

export interface CounterState {
    counter: number;
    brands: Brand[];
    isLoading: boolean;
}

const initialState: CounterState = {
    counter: 0,
    brands: [],
    isLoading: false
}

export const getBrand = createAsyncThunk(
    "counter/getBrand",
    async function () {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands") // ✅ added await
        return response.data
    }
)

export const CounterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => { state.counter++ },
        decrement: (state) => { state.counter-- },
        incByValue: (state, action) => { state.counter += action.payload }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBrand.pending, (state) => {
                state.isLoading = true // ✅ set loading true when fetching
            })
            .addCase(getBrand.fulfilled, (state, action) => { // ✅ fulfilled not pending
                state.brands = action.payload.data // ✅ save brands data
                state.isLoading = false
            })
            .addCase(getBrand.rejected, (state) => {
                state.isLoading = false // ✅ handle error case
            })
    }
})

export const { increment, decrement, incByValue } = CounterSlice.actions
export default CounterSlice.reducer