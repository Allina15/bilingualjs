import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from '../../../../utils/helpers/notification'
import { PRACTICE_TEST_THUNKS } from './practiceTestThunk'

const correctAnswer = JSON.parse(sessionStorage.getItem('correctAnswer')) || []

const initialState = {
   questions: [],
   correctOptions: [],
   correctAnswer,
   isDisabled: false,
   isLoading: false,
}

const practiceTestSlice = createSlice({
   name: 'practiceTest',
   initialState,
   reducers: {
      addCorrectOption: (state, { payload }) => {
         state.correctOptions?.push(payload)
      },

      deleteCorrectOption: (state, { payload }) => {
         state.correctOptions = state.correctOptions?.filter(
            (correctOption) => correctOption.id !== payload
         )
      },

      clearCorrectOption: (state) => {
         state.correctOptions = []
      },

      addCorrectAnswer: (state, { payload }) => {
         state.correctAnswer.push(payload)

         sessionStorage.setItem(
            'correctAnswer',
            JSON.stringify(state.correctAnswer)
         )
      },

      clearCorrectAnswer: (state) => {
         state.correctAnswer = []

         sessionStorage.removeItem('correctAnswer')
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(PRACTICE_TEST_THUNKS.getQuestions.pending, (state) => {
            state.isLoading = true
         })

         .addCase(
            PRACTICE_TEST_THUNKS.getQuestions.fulfilled,
            (state, { payload }) => {
               if (typeof payload !== 'string') {
                  state.questions = payload
                  state.isDisabled = false
               } else {
                  state.isDisabled = true
               }

               state.isLoading = false
            }
         )

         .addCase(PRACTICE_TEST_THUNKS.getQuestions.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(PRACTICE_TEST_THUNKS.addAnswer.fulfilled, (state) => {
            state.isLoading = false
         })

         .addCase(PRACTICE_TEST_THUNKS.addAnswer.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(PRACTICE_TEST_THUNKS.addAnswer.pending, (state) => {
            state.isLoading = true

            showNotification({
               title: 'Pending',
               message: false,
               type: 'warning',
            })
         })
   },
})

const PRACTICE_TEST_ACTIONS = practiceTestSlice.actions

export { practiceTestSlice, PRACTICE_TEST_ACTIONS }
