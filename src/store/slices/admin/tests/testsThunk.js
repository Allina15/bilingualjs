import { createAsyncThunk } from '@reduxjs/toolkit'
import { showNotification } from '../../../../utils/helpers/notification'
import { axiosInstance } from '../../../../configs/axiosInstance'

const getTests = createAsyncThunk(
   'tests/getTests',

   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/api/test/getAll')

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

const getTest = createAsyncThunk(
   'tests/getTest',

   async ({ id }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/api/test?testId=${id}`)

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

const addTest = createAsyncThunk(
   'tests/addTest',

   async ({ testData, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('/api/test', testData)

         showNotification({ message: data.message })

         navigate('/')

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

const deleteTest = createAsyncThunk(
   'tests/deleteTest',

   async (testId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/api/test?testId=${testId}`
         )

         showNotification({ message: data.message })

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

const updateTest = createAsyncThunk(
   'tests/updateTest',

   async ({ id, updatedTest, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.patch(
            `/api/test?id=${id}`,
            updatedTest
         )

         showNotification({ message: data.message })

         navigate('/')

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

const updateTestByEnable = createAsyncThunk(
   'tests/updateTestByEnable',

   async ({ testId, enable }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.patch(
            `/api/test/update?tesId=${testId}&enable=${enable}`
         )

         return data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
         })

         dispatch(getTests())

         return rejectWithValue({ message: error.message })
      }
   }
)

export const TESTS_THUNKS = {
   getTests,
   getTest,
   deleteTest,
   addTest,
   updateTest,
   updateTestByEnable,
}
