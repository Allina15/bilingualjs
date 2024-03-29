import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'
import { showNotification } from '../../../../utils/helpers/notification'

const getAllResults = createAsyncThunk(
   'submitedResultsSlice/getAllResults',

   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/api/result/getAll')

         return response.data
      } catch (error) {
         return rejectWithValue.message
      }
   }
)

const getResults = createAsyncThunk(
   'submitedResultsSlice/getResults',

   async ({ resultId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/result?resultId=${resultId}`
         )

         return response.data
      } catch (error) {
         return rejectWithValue.message
      }
   }
)

const postResults = createAsyncThunk(
   'submitedResultsSlice/postResults',

   async ({ resultId, navigate }, { rejectWithValue, dispatch }) => {
      try {
         const link = `http://localhost:3001/user/results`

         const response = await axiosInstance.post(
            `/api/result/${resultId}?link=${link}`
         )

         showNotification({
            message: response.data.message,
         })

         navigate(-1)

         return response.data
      } catch (error) {
         dispatch(getResults({ resultId }))

         showNotification({
            title: 'Error',
            message: 'Failed to post results',
            type: 'error',
         })

         return rejectWithValue.message
      }
   }
)

const deleteResults = createAsyncThunk(
   'submitedResultsSlice/deleteResults',

   async ({ resultId }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(
            `/api/result?resultId=${resultId}`
         )

         showNotification({
            title: 'Success',
            message: 'Test successfully deleted',
            type: 'success',
         })

         dispatch(getAllResults())

         return response.data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: 'Failed to delete test',
            type: 'error',
         })

         return rejectWithValue.message
      }
   }
)

export const SUBMITTED_RESULTS_THUNKS = {
   getAllResults,
   getResults,
   postResults,
   deleteResults,
}
