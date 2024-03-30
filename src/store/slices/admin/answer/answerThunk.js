import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'
import { showNotification } from '../../../../utils/helpers/notification'

const getAnswer = createAsyncThunk(
   'answer/getAnswer',

   async ({ answerId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `api/answer?answerId=${answerId}`
         )

         return data
      } catch (error) {
         return rejectWithValue.message
      }
   }
)

const postResult = createAsyncThunk(
   'answer/postResult',

   async (
      { answerId, scoreValue, navigate },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const { data } = await axiosInstance.post(
            `api/result?answerId=${answerId}`,
            scoreValue
         )

         navigate(-1)

         showNotification({ message: data.message })

         return data
      } catch (error) {
         dispatch(getAnswer({ answerId }))

         return rejectWithValue.message
      }
   }
)

export const ANSWER_THUNKS = { getAnswer, postResult }
