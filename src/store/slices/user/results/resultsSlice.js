import { createSlice } from '@reduxjs/toolkit'
import { MY_RESULTS_THUNKS } from './resultsThunk'

const initialState = {
   results: [],
   isLoading: false,
}

const resultsSlice = createSlice({
   name: 'results',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(MY_RESULTS_THUNKS.getResult.pending, (state) => {
            state.isLoading = true
         })

         .addCase(
            MY_RESULTS_THUNKS.getResult.fulfilled,
            (state, { payload }) => {
               state.results = payload
               state.isLoading = false
            }
         )

         .addCase(MY_RESULTS_THUNKS.getResult.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(MY_RESULTS_THUNKS.deleteResult.pending, (state) => {
            state.isLoading = true
         })

         .addCase(MY_RESULTS_THUNKS.deleteResult.fulfilled, (state, action) => {
            state.isLoading = false

            state.results = state.results.filter(
               (result) => result.id !== action?.meta?.arg
            )
         })

         .addCase(MY_RESULTS_THUNKS.deleteResult.rejected, (state) => {
            state.isLoading = false
         })
   },
})

const RESULTS_ACTIONS = resultsSlice.actions

export { resultsSlice, RESULTS_ACTIONS }
