import { createSlice } from '@reduxjs/toolkit'
import { TESTS_THUNKS } from './testsThunk'
import { QUESTION_THUNKS } from '../question/questionThunk'

const initialState = {
   tests: [],
   test: {},
   isLoading: false,
}

const testsSlice = createSlice({
   name: 'tests',
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(TESTS_THUNKS.getTests.pending, (state) => {
            state.isLoading = true
         })

         .addCase(TESTS_THUNKS.getTests.fulfilled, (state, { payload }) => {
            state.tests = payload
            state.isLoading = false
         })

         .addCase(TESTS_THUNKS.getTests.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(TESTS_THUNKS.getTest.pending, (state) => {
            state.isLoading = true
         })

         .addCase(TESTS_THUNKS.getTest.fulfilled, (state, { payload }) => {
            state.test = payload
            state.isLoading = false
         })

         .addCase(TESTS_THUNKS.getTest.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(TESTS_THUNKS.addTest.pending, (state) => {
            state.isLoading = true
         })

         .addCase(TESTS_THUNKS.addTest.fulfilled, (state) => {
            state.isLoading = false
         })

         .addCase(TESTS_THUNKS.addTest.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(TESTS_THUNKS.deleteTest.pending, (state) => {
            state.isLoading = true
         })

         .addCase(TESTS_THUNKS.deleteTest.fulfilled, (state, action) => {
            state.isLoading = false

            state.tests = state.tests?.filter(
               (test) => test.id !== action?.meta?.arg
            )
         })

         .addCase(TESTS_THUNKS.deleteTest.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(TESTS_THUNKS.updateTest.pending, (state) => {
            state.isLoading = true
         })

         .addCase(TESTS_THUNKS.updateTest.fulfilled, (state) => {
            state.isLoading = false
         })

         .addCase(TESTS_THUNKS.updateTest.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(TESTS_THUNKS.updateTestByEnable.pending, (state) => {
            state.isLoading = false
         })

         .addCase(TESTS_THUNKS.updateTestByEnable.fulfilled, (state) => {
            state.isLoading = false
         })

         .addCase(TESTS_THUNKS.updateTestByEnable.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(
            QUESTION_THUNKS.updateQuestionByEnable.fulfilled,
            (state, { payload }) => {
               state.test.duration = payload.duration
            }
         )

         .addCase(
            QUESTION_THUNKS.deleteQuestion.fulfilled,
            (state, { payload }) => {
               state.isLoading = false
               state.test = payload
            }
         )
   },
})

const TESTS_ACTIONS = testsSlice.actions

export { testsSlice, TESTS_ACTIONS }
