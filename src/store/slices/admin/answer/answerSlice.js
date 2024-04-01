import { createSlice } from '@reduxjs/toolkit'
import { ANSWER_THUNKS } from './answerThunk'

const initialState = {
   answer: [],
   isLoading: false,
}

const answerSlice = createSlice({
   name: 'answer',
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(ANSWER_THUNKS.getAnswer.pending, (state) => {
            state.isLoading = true
         })

         .addCase(ANSWER_THUNKS.getAnswer.fulfilled, (state, { payload }) => {
            state.answer = payload
            state.isLoading = false
         })

         .addCase(ANSWER_THUNKS.getAnswer.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(ANSWER_THUNKS.saveResult.pending, (state) => {
            state.isLoading = true
         })

         .addCase(ANSWER_THUNKS.saveResult.fulfilled, (state, { payload }) => {
            state.answer = payload
            state.isLoading = false
         })

         .addCase(ANSWER_THUNKS.saveResult.rejected, (state) => {
            state.isLoading = false
         })
   },
})

const ANSWER_ACTIONS = answerSlice.actions

export { answerSlice, ANSWER_ACTIONS }
