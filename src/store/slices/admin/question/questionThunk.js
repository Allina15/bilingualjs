import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstanceFile } from '../../../../configs/axiosInstanceFile'
import { axiosInstance } from '../../../../configs/axiosInstance'
import { showNotification } from '../../../../utils/helpers/notification'
import { TESTS_THUNKS } from '../tests/testsThunk'
import { ROUTES } from '../../../../routes/routes'

const addTest = createAsyncThunk(
   'question/addTest',

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
         const { data } = await axiosInstance.post(
            `/api/question?testId=${testId}&questionType=${questionType}`,
            requestData
         )

         showNotification({
            message: data.message,
         })

         navigate(
            `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/${testId}`
         )

         if (clearOptions) {
            dispatch(clearOptions.clearOptions())
         }

         return data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
         })

         setSelectType()
         setTitle()
         setDuration()

         return rejectWithValue({ message: error.message })
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
            message: error.message,
            type: 'error',
         })

         return rejectWithValue({ message: error.message })
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
         const { data } = await axiosInstance.get(
            `/api/question/getById?id=${id}`
         )

         if (addUpdateOption) {
            dispatch(
               addUpdateOption.addUpdateOption({
                  optionResponses: data,
                  optionName,
               })
            )
         }

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

const addQuestion = createAsyncThunk(
   'question/addQuestion',

   async ({ testId, questionType, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/question?testId=${testId}&questionType=${questionType}`
         )
         showNotification({
            message: data.message,
         })

         navigate(
            `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/:${ROUTES.ADMIN.TEST_ID}`
         )

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

const deleteQuestion = createAsyncThunk(
   'question/deleteQuestion',

   async ({ questionId, testId }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/api/question?questionId=${questionId}`
         )

         dispatch(TESTS_THUNKS.getTest({ id: testId }))

         showNotification({
            title: 'Success',
            message: data.message,
            type: 'success',
         })

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

const deleteOption = createAsyncThunk(
   'question/deleteOption',

   async (
      { optionId, id, optionName, addUpdateOption },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const { data } = await axiosInstance.delete(
            `/api/option?optionId=${optionId}`
         )

         dispatch(
            getQuestion({
               id,
               addUpdateOption,
               optionName,
            })
         )

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

const updateQuestion = createAsyncThunk(
   'question/updateQuestion',

   async (
      { id, requestData, navigate, clearOptions, testId },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const { data } = await axiosInstance.patch(
            `api/question?id=${id}`,
            requestData
         )

         showNotification({
            title: 'Success',
            message: data.message,
            type: 'success',
         })

         navigate(
            `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/${testId}`
         )

         if (clearOptions) {
            dispatch(clearOptions.clearOptions())
         }

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

const updateQuestionByEnable = createAsyncThunk(
   'question/updateQuestionByEnable',

   async ({ testId, questionId, isEnable }, { dispatch, rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.patch(
            `/api/question/IsEnable?questionId=${questionId}&isEnable=${isEnable}`
         )

         return data
      } catch (error) {
         dispatch(TESTS_THUNKS.getTest({ id: testId }))

         showNotification({
            title: 'Error',
            message: error.message,
            type: 'error',
         })

         return rejectWithValue({ message: error.message })
      }
   }
)

export const QUESTION_THUNKS = {
   addFile,
   addTest,
   getQuestion,
   addQuestion,
   deleteQuestion,
   deleteOption,
   updateQuestion,
   updateQuestionByEnable,
}
