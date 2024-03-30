import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'

const getTests = createAsyncThunk(
   'testsList/getAllTests',

   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/test/getAll')

         return data
      } catch (error) {
         return rejectWithValue.message
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
         return rejectWithValue.message
      }
   }
)

export const TESTS_LIST_THUNKS = { getTests, getTest }
