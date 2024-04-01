import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'
import { showNotification } from '../../../../utils/helpers/notification'
import { ROUTES } from '../../../../routes/routes'

const getQuestions = createAsyncThunk(
   'practiceTest/getQuestions',

   async ({ testId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/question?testId=${testId}`
         )

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

const addAnswer = createAsyncThunk(
   'practiceTest/addAnswer',

   async (
      { correctAnswer, navigate, clearAnswer },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const { data } = await axiosInstance.post('/api/answer', correctAnswer)

         navigate(`${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}`)

         showNotification({ message: data.message })

         dispatch(clearAnswer.clearCorrectAnswer())

         sessionStorage.removeItem('question-durations')

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

export const PRACTICE_TEST_THUNKS = {
   getQuestions,
   addAnswer,
}
