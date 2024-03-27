import { createSlice } from '@reduxjs/toolkit'
import { QUESTION_THUNKS } from './questionThunk'
import { showNotification } from '../../../../utils/helpers/notification'

const initialState = {
   title: '',
   duration: 0,
   statement: '',
   passage: '',
   attempts: 0,
   isCreate: false,
   isUpdateDisabled: true,
   inOpen: true,
   correctAnswer: '',
   fileUrl: '',
   question: {},
   options: {
      selectRealEnglishWordsOptions: [],
      listenAndSelectOptions: [],
      selectTheMainIdeaOptions: [],
      selectTheBestTitleOptions: [],
   },
   isLoading: false,
}

const questionSlice = createSlice({
   name: 'question',
   initialState,

   reducers: {
      addOptionCheck: (state, { payload }) => {
         state.options[payload?.optionName].push(payload.option)
      },

      addUpdateOption: (state, { payload }) => {
         if (state.options[payload?.optionName]) {
            state.options[payload?.optionName] =
               payload.optionResponses.questionOptionResponses
         }
      },

      changeIsUpdate: (state, { payload }) => {
         state.isCreate = payload
      },

      changeIsdisabled: (state, { payload }) => {
         state.isUpdateDisabled = payload
      },

      changeInOpen: (state, { payload }) => {
         state.inOpen = payload
      },

      addOptionRadio: (state, { payload }) => {
         if (payload && payload.option) {
            const isFirstOption =
               state.options[payload.optionName]?.length === 0

            const newOption = {
               ...payload.option,
               isCorrectOption: isFirstOption,
            }

            state.options[payload.optionName] = [
               ...state.options[payload.optionName],
               newOption,
            ]

            state.options[payload.optionName] = state.options[
               payload.optionName
            ].map((option) => {
               if (payload.option.isCorrectOption) {
                  if (payload.option.optionId === option.optionId) {
                     return {
                        ...option,
                        isCorrectOption: payload.option.isCorrectOption,
                     }
                  }

                  return {
                     ...option,
                     isCorrectOption: false,
                  }
               }

               return option
            })
         }
      },

      handleIsChecked: (state, { payload }) => {
         state.options[payload?.optionName] = state.options[
            payload?.optionName
         ].map((option) => {
            if (option?.optionId === payload?.optionId) {
               return { ...option, isCorrectOption: !option.isCorrectOption }
            }
            return {
               ...option,
               isCorrectOption: option.isCorrectOption,
            }
         })
      },

      handleIsCorrect: (state, { payload }) => {
         state.options[payload?.optionName] = state.options[
            payload?.optionName
         ].map((option) => {
            if (option?.optionId === payload?.optionId) {
               return {
                  ...option,
                  isCorrectOption: !option.isCorrectOption,
               }
            }
            return {
               ...option,
               isCorrectOption: false,
            }
         })
      },

      deleteOption: (state, { payload }) => {
         return {
            ...state,
            options: {
               ...state.options,
               [payload?.optionName]: state.options[payload?.optionName].filter(
                  (option) => option?.optionId !== payload?.optionId
               ),
            },
         }
      },

      clearOptions(state) {
         state.options = {
            selectRealEnglishWordsOptions: [],
            listenAndSelectOptions: [],
            selectTheMainIdeaOptions: [],
            selectTheBestTitleOptions: [],
         }
      },

      updateOptions: (state, { payload }) => {
         state.options = {
            ...state.options,
            [payload?.optionName]: payload.options,
         }
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(QUESTION_THUNKS.addTest.fulfilled, (state) => {
            state.isLoading = false
            state.error = null
         })

         .addCase(QUESTION_THUNKS.addTest.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
         })

         .addCase(QUESTION_THUNKS.addTest.pending, (state) => {
            state.isLoading = true
            state.error = null

            showNotification({
               title: 'Pending',
               message: false,
               type: 'warning',
               duration: 200,
            })
         })

         .addCase(QUESTION_THUNKS.getQuestion.pending, (state) => {
            state.isLoading = true
         })

         .addCase(
            QUESTION_THUNKS.getQuestion.fulfilled,
            (state, { payload }) => {
               state.question = payload
               state.isLoading = false
            }
         )

         .addCase(QUESTION_THUNKS.getQuestion.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(QUESTION_THUNKS.addFile.pending, (state) => {
            state.isLoading = true
            state.error = null
         })

         .addCase(QUESTION_THUNKS.addFile.fulfilled, (state, action) => {
            state.isLoading = false
            state.fileUrl = action.payload.link
         })

         .addCase(QUESTION_THUNKS.addFile.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = payload
         })

         .addCase(QUESTION_THUNKS.deleteQuestion.pending, (state) => {
            state.isLoading = true
         })

         .addCase(QUESTION_THUNKS.deleteQuestion.fulfilled, (state) => {
            state.isLoading = false
         })

         .addCase(QUESTION_THUNKS.deleteQuestion.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(QUESTION_THUNKS.updateQuestionByEnable.pending, (state) => {
            state.isLoading = true
         })

         .addCase(QUESTION_THUNKS.updateQuestionByEnable.fulfilled, (state) => {
            state.isLoading = false
         })

         .addCase(QUESTION_THUNKS.updateQuestionByEnable.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(QUESTION_THUNKS.updateQuestion.pending, (state) => {
            state.isLoading = true
         })

         .addCase(QUESTION_THUNKS.updateQuestion.fulfilled, (state) => {
            state.isLoading = false
         })

         .addCase(QUESTION_THUNKS.updateQuestion.rejected, (state) => {
            state.isLoading = false
         })
   },
})

const QUESTION_ACTIONS = questionSlice.actions

export { questionSlice, QUESTION_ACTIONS }
