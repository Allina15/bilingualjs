import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'
import { showNotification } from '../../../../utils/helpers/notification'

const getResults = createAsyncThunk(
   'results/getResults',

   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/result/getResult')

         return data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: error.response.data.message,
            type: 'error',
         })

         return rejectWithValue({ message: error.message })
      }
   }
)

const deleteResults = createAsyncThunk(
   'results/deleteResults',

   async ({ resultId }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/api/result?resultId=${resultId}`
         )

         showNotification({
            message: data.message,
         })

         dispatch(getResults())

         return data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: error.response.data.message,
            type: 'error',
         })

         return rejectWithValue({ message: error.message })
      }
   }
)

export const RESULTS_THUNKS = { getResults, deleteResults }
