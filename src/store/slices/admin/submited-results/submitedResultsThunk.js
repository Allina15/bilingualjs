import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'
import { showNotification } from '../../../../utils/helpers/notification'

const getResults = createAsyncThunk(
   'submitedResults/getResults',

   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/result/getAll')

         return data
      } catch (error) {
         return rejectWithValue({ message: error.message })
      }
   }
)

const getResult = createAsyncThunk(
   'submitedResults/getResult',

   async ({ resultId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/result?resultId=${resultId}`
         )

         return data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
         })

         return rejectWithValue({ message: error.message })
      }
   }
)

const sendResult = createAsyncThunk(
   'submitedResults/postResults',

   async ({ resultId, navigate }, { rejectWithValue, dispatch }) => {
      try {
         const link = 'http://localhost:3000/user/results'

         const { data } = await axiosInstance.post(
            `/api/result/${resultId}?link=${link}`
         )

         showNotification({
            message: data.message,
         })

         navigate(-1, { replace: true })

         return data
      } catch (error) {
         dispatch(getResults({ resultId }))

         showNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
         })

         return rejectWithValue({ message: error.message })
      }
   }
)

const deleteResult = createAsyncThunk(
   'submitedResults/deleteResults',

   async ({ resultId }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/api/result?resultId=${resultId}`
         )

         showNotification({
            title: 'Success',
            message: data.message,
            type: 'success',
         })

         dispatch(getResults())

         return data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
         })

         return rejectWithValue({ message: error.message })
      }
   }
)

export const SUBMITTED_RESULTS_THUNKS = {
   getResults,
   getResult,
   sendResult,
   deleteResult,
}
