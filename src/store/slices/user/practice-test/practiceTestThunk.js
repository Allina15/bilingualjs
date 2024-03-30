import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../configs/axiosInstance'
import { showNotification } from '../../../../utils/helpers/notification'
import { axiosInstanceFile } from '../../../../configs/axiosInstanceFile'
import { ROUTES } from '../../../../routes/routes'

const getQuestions = createAsyncThunk(
   'practiceTest/getQuestions',

   async ({ testId }) => {
      try {
         const { data } = await axiosInstance.get(
            `/api/question?testId=${testId}`
         )

         return data
      } catch (error) {
         if (error.response) {
            showNotification({
               title: 'Error',
               message: `${error.response.data.message}`,
               type: 'error',
            })
         }

         return error.response.data.message
      }
   }
)

const addAnswer = createAsyncThunk(
   'practiceTest/postTest',

   async (
      { correctAnswer, navigate, clearAnswer },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const { data } = await axiosInstance.post('/api/answer', correctAnswer)

         navigate(`${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}`)

         showNotification({ message: `${data.message}` })

         dispatch(clearAnswer.clearCorrectAnswer())

         return data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: `${error.response.data.message}`,
            type: 'error',
         })

         return rejectWithValue.message
      }
   }
)

const addAnswerFile = createAsyncThunk(
   'question/addAnswerFile',
   async ({ recordedAudio }, { rejectWithValue }) => {
      try {
         const formData = new FormData()

         formData.append('multipartFile', recordedAudio, 'recording.mp3')

         const { data } = await axiosInstanceFile.post('/api/awsFile', formData)

         return data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: 'Failed to file!',
            type: 'error',
         })

         return rejectWithValue.message
      }
   }
)

export const PRACTICE_TEST_THUNKS = {
   getQuestions,
   addAnswer,
   addAnswerFile,
}
