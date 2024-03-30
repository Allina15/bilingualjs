import { createSlice } from '@reduxjs/toolkit'
import { SUBMITTED_RESULTS_THUNKS } from './submitedResultsThunk'

const initialState = {
   results: [],
   evaluations: {},
   isLoading: false,
   isSendLoading: false,
}

const submitedResultsSlice = createSlice({
   name: 'submitedResults',
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(SUBMITTED_RESULTS_THUNKS.getResults.pending, (state) => {
            state.isLoading = true
         })

         .addCase(
            SUBMITTED_RESULTS_THUNKS.getResults.fulfilled,
            (state, { payload }) => {
               state.results = payload
               state.isLoading = false
            }
         )

         .addCase(SUBMITTED_RESULTS_THUNKS.getResults.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(SUBMITTED_RESULTS_THUNKS.getResult.pending, (state) => {
            state.isLoading = true
         })

         .addCase(
            SUBMITTED_RESULTS_THUNKS.getResult.fulfilled,
            (state, { payload }) => {
               state.evaluations = payload
               state.isLoading = false
            }
         )

         .addCase(SUBMITTED_RESULTS_THUNKS.getResult.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(SUBMITTED_RESULTS_THUNKS.deleteResult.pending, (state) => {
            state.isLoading = true
         })

         .addCase(
            SUBMITTED_RESULTS_THUNKS.deleteResult.fulfilled,
            (state, action) => {
               state.isLoading = false

               state.results = state.results.filter(
                  (result) => result.id !== action?.meta?.arg
               )
            }
         )

         .addCase(SUBMITTED_RESULTS_THUNKS.deleteResult.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(SUBMITTED_RESULTS_THUNKS.postResult.pending, (state) => {
            state.isSendLoading = true
         })

         .addCase(SUBMITTED_RESULTS_THUNKS.postResult.fulfilled, (state) => {
            state.isSendLoading = false
         })

         .addCase(SUBMITTED_RESULTS_THUNKS.postResult.rejected, (state) => {
            state.isSendLoading = false
         })
   },
})

const SUBMITTED_RESULTS_ACTIONS = submitedResultsSlice.actions

export { submitedResultsSlice, SUBMITTED_RESULTS_ACTIONS }
