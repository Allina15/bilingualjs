import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'
import { showNotification } from '../../../../utils/helpers/notification'

const getResult = createAsyncThunk(
   'results/getResult',

   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/result/getResult')

         return data
      } catch (error) {
         return rejectWithValue.message
      }
   }
)

const deleteResult = createAsyncThunk(
   'results/deleteResults',

   async ({ resultId }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/api/result?resultId=${resultId}`
         )

         showNotification({
            message: `${data.message}`,
         })

         dispatch(getResult())

         return data
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

export const MY_RESULTS_THUNKS = { getResult, deleteResult }
