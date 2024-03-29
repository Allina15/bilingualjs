import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstanceFile } from '../../../../configs/axiosInstanceFile'
import { axiosInstance } from '../../../../configs/axiosInstance'
import { showNotification } from '../../../../utils/helpers/notification'
import { ROUTES } from '../../../../routes/routes'
import { TESTS_THUNKS } from '../tests/testsThunk'

const addTest = createAsyncThunk(
   'question/saveTest',

   async (
      {
         requestData,
         data: { testId, questionType, navigate },
         setStates: { setSelectType, setTitle, setDuration },
         clearOptions,
      },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const response = await axiosInstance.post(
            `/api/question?testId=${testId}&questionType=${questionType}`,
            requestData
         )

         showNotification({
            message: `${response.data.message}!`,
         })

         navigate(
            `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/${testId}`
         )

         if (clearOptions) {
            dispatch(clearOptions.clearOptions())
         }

         return response.data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: 'Failed to save question!',
            type: 'error',
         })

         setSelectType()
         setTitle()
         setDuration()

         return rejectWithValue.message
      }
   }
)

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
            message: 'Failed to file!',
            type: 'error',
         })

         return rejectWithValue.message
      }
   }
)

const getQuestion = createAsyncThunk(
   'question/getQuestion',

   async (
      { id, addUpdateOption, optionName },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const response = await axiosInstance.get(
            `/api/question/getById?id=${id}`
         )

         if (addUpdateOption) {
            dispatch(
               addUpdateOption.addUpdateOption({
                  optionResponses: response.data,
                  optionName,
               })
            )
         }

         return response.data
      } catch (error) {
         return rejectWithValue.message
      }
   }
)

const addQuestion = createAsyncThunk(
   'question/addQuestion',

   async ({ testId, questionType, navigate }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/api/question?testId=${testId}&questionType=${questionType}`
         )
         showNotification({
            message: `${response.data.message}`,
         })

         navigate(
            `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/:${ROUTES.ADMIN.TEST_ID}`
         )

         return response.data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: 'Error creating question',
            type: 'error',
         })

         return rejectWithValue.message
      }
   }
)

const deleteQuestion = createAsyncThunk(
   'question/deleteQuestion',

   async ({ questionId, testId }, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.delete(
            `/api/question?questionId=${questionId}`
         )

         dispatch(TESTS_THUNKS.getTest({ id: testId }))

         showNotification({
            title: 'Success',
            message: `${response.data.message}`,
            type: 'success',
         })

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

const updateQuestion = createAsyncThunk(
   'question/updateQuestion',

   async (
      { id, requestData, navigate, clearOptions, testId },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const response = await axiosInstance.patch(
            `api/question?id=${id}`,
            requestData
         )

         showNotification({
            title: 'Success',
            message: `${response.data.message}`,
            type: 'success',
         })

         navigate(
            `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/${testId}`
         )

         if (clearOptions) {
            dispatch(clearOptions.clearOptions())
         }

         return response.data
      } catch (error) {
         return rejectWithValue.message
      }
   }
)

const updateQuestionByEnable = createAsyncThunk(
   'question/updateQuestionByEnable',

   async ({ testId, questionId, isEnable }, { dispatch, rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch(
            `/api/question/IsEnable?questionId=${questionId}&isEnable=${isEnable}`
         )

         dispatch(TESTS_THUNKS.getTest({ id: testId }))

         return response.data
      } catch (error) {
         dispatch(TESTS_THUNKS.getTest({ id: testId }))

         showNotification({
            message: 'Failed to update question',
            type: 'error',
            title: 'Error',
         })

         return rejectWithValue.message
      }
   }
)

export const QUESTION_THUNKS = {
   addFile,
   addTest,
   getQuestion,
   addQuestion,
   deleteQuestion,
   updateQuestion,
   updateQuestionByEnable,
}
