import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'
import { QUESTION_THUNKS } from '../question/questionThunk'
import { QUESTION_ACTIONS } from '../question/questionSlice'

const postOptions = createAsyncThunk(
   'options/postOptions',

   async (
      { questionId, option, optionName },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const response = await axiosInstance.post(
            `api/option?questionId=${questionId}`,
            option
         )

         dispatch(
            QUESTION_THUNKS.getQuestion({
               id: questionId,
               addUpdateOption: QUESTION_ACTIONS,
               optionName,
            })
         )

         return response.data
      } catch (error) {
         return rejectWithValue.message
      }
   }
)

const deleteOption = createAsyncThunk(
   'options/deleteOption',

   async ({ optionId, id, optionName }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(
            `/api/option?optionId=${optionId}`
         )

         dispatch(
            QUESTION_THUNKS.getQuestion({
               id,
               addUpdateOption: QUESTION_ACTIONS,
               optionName,
            })
         )

         return response.data
      } catch (error) {
         return rejectWithValue.message
      }
   }
)

export const OPTIONS_THUNKS = { deleteOption, postOptions }
