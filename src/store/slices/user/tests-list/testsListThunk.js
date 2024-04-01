import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'
import { showNotification } from '../../../../utils/helpers/notification'

const getTests = createAsyncThunk(
   'testsList/getTests',

   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/test/getAll')

         return data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: error.response.data,
            type: 'error',
         })

         return rejectWithValue({ message: error.message })
      }
   }
)

const getTest = createAsyncThunk(
   'testsList/getTest',

   async (testId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/api/test?testId=${testId}`)

         return data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: error.response.data,
            type: 'error',
         })

         return rejectWithValue({ message: error.message })
      }
   }
)

export const TESTS_LIST_THUNKS = { getTests, getTest }
