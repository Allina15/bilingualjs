import { createSlice } from '@reduxjs/toolkit'
import { PRACTICE_TEST_THUNKS } from './practiceTestThunk'
import { showNotification } from '../../../utils/helpers/notification'

const initialState = {
   questions: [],
   correctOptions: [],
   correctAnswer: [],
   isLoading: false,
}

const practiceTestSlice = createSlice({
   name: 'practiceTest',
   initialState,

   reducers: {
      addCorrectOption: (state, { payload }) => {
         state.correctOptions.push(payload)
      },

      deleteCorrectOption: (state, { payload }) => {
         state.correctOptions = state.correctOptions.filter(
            (correctOption) => correctOption.id !== payload
         )
      },

      clearCorrectOption: (state) => {
         state.correctOptions = []
      },

      addCorrectAnswer: (state, { payload }) => {
         state.correctAnswer.push(payload)
      },

      clearCorrectAnswer: (state) => {
         state.correctAnswer = []
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(PRACTICE_TEST_THUNKS.getAllQuestions.pending, (state) => {
            state.isLoading = true
         })

         .addCase(
            PRACTICE_TEST_THUNKS.getAllQuestions.fulfilled,
            (state, { payload }) => {
               state.questions = payload
               state.isLoading = false
            }
         )

         .addCase(PRACTICE_TEST_THUNKS.getAllQuestions.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(PRACTICE_TEST_THUNKS.postTest.fulfilled, (state) => {
            state.isLoading = false
         })

         .addCase(PRACTICE_TEST_THUNKS.postTest.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(PRACTICE_TEST_THUNKS.postTest.pending, (state) => {
            state.isLoading = true

            showNotification({
               title: 'Pending',
               message: false,
               type: 'warning',
               duration: 200,
            })
         })
   },
})

const PRACTICE_TEST_ACTIONS = practiceTestSlice.actions

export { practiceTestSlice, PRACTICE_TEST_ACTIONS }
