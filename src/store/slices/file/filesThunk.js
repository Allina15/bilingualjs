import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstanceFile } from '../../../configs/axiosInstanceFile'
import { showNotification } from '../../../utils/helpers/notification'

const addFile = createAsyncThunk(
   'question/addFile',

   async (file, { rejectWithValue }) => {
      try {
         const formData = new FormData()

         formData.append('multipartFile', file)

         const { data } = await axiosInstanceFile.post('/api/awsFile', formData)

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
            message: error.response.data.message,
            type: 'error',
         })

         return rejectWithValue({ message: error.message })
      }
   }
)

export const FILES_THUNK = { addFile, addAnswerFile }
