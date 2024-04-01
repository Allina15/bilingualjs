import { createSlice } from '@reduxjs/toolkit'
import { RESULTS_THUNKS } from './resultsThunk'

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
         .addCase(RESULTS_THUNKS.getResults.pending, (state) => {
            state.isLoading = true
         })

         .addCase(RESULTS_THUNKS.getResults.fulfilled, (state, { payload }) => {
            state.results = payload
            state.isLoading = false
         })

         .addCase(RESULTS_THUNKS.getResults.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(RESULTS_THUNKS.deleteResults.pending, (state) => {
            state.isLoading = true
         })

         .addCase(RESULTS_THUNKS.deleteResults.fulfilled, (state, action) => {
            state.isLoading = false

            state.results = state.results?.filter(
               (result) => result.id !== action?.meta?.arg
            )
         })

         .addCase(RESULTS_THUNKS.deleteResults.rejected, (state) => {
            state.isLoading = false
         })
   },
})

const RESULTS_ACTIONS = resultsSlice.actions

export { resultsSlice, RESULTS_ACTIONS }
