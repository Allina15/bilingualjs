import { createSlice } from '@reduxjs/toolkit'
import { SUBMITTED_RESULTS_THUNKS } from './submitedResultsThunk'

const initialState = {
   results: [],
   evaluations: {},
   isLoading: false,
   isSendLoading: false,
}

export const submitedResultsSlice = createSlice({
   name: 'submitedResultsSlice',
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(SUBMITTED_RESULTS_THUNKS.getAllResults.pending, (state) => {
            state.isLoading = true
         })

         .addCase(
            SUBMITTED_RESULTS_THUNKS.getAllResults.fulfilled,
            (state, { payload }) => {
               state.results = payload
               state.isLoading = false
            }
         )

         .addCase(SUBMITTED_RESULTS_THUNKS.getAllResults.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(SUBMITTED_RESULTS_THUNKS.getResults.pending, (state) => {
            state.isLoading = true
         })

         .addCase(
            SUBMITTED_RESULTS_THUNKS.getResults.fulfilled,
            (state, { payload }) => {
               state.evaluations = payload
               state.isLoading = false
            }
         )

         .addCase(SUBMITTED_RESULTS_THUNKS.getResults.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(SUBMITTED_RESULTS_THUNKS.deleteResults.pending, (state) => {
            state.isLoading = true
         })

         .addCase(
            SUBMITTED_RESULTS_THUNKS.deleteResults.fulfilled,
            (state, action) => {
               state.isLoading = false

               state.results = state.results.filter(
                  (result) => result.id !== action.meta.arg
               )
            }
         )

         .addCase(SUBMITTED_RESULTS_THUNKS.deleteResults.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(SUBMITTED_RESULTS_THUNKS.postResults.pending, (state) => {
            state.isSendLoading = true
         })

         .addCase(SUBMITTED_RESULTS_THUNKS.postResults.fulfilled, (state) => {
            state.isSendLoading = false
         })

         .addCase(SUBMITTED_RESULTS_THUNKS.postResults.rejected, (state) => {
            state.isSendLoading = false
         })
   },
})

export default submitedResultsSlice.reducer
