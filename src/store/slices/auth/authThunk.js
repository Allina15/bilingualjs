import { createAsyncThunk } from '@reduxjs/toolkit'
import { showNotification } from '../../../utils/helpers/notification'
import { axiosInstance } from '../../../configs/axiosInstance'
import { ROUTES } from '../../../routes/routes'

const signUp = createAsyncThunk(
   'auth/signUp',

   async ({ values, resetForm, navigate }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('/api/auth/signUp', values)

         showNotification({
            title: 'You are registered!',
            message: 'We wish you great results!',
         })

         const { email, role, token } = response.data
         if (email && role && token) {
            resetForm()

            navigate(ROUTES.USER.INDEX)
         }

         return response.data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: error.response.data.message,
            type: 'error',
         })

         return rejectWithValue.message
      }
   }
)

const signIn = createAsyncThunk(
   'auth/signIn',

   async ({ values, resetForm, navigate }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('/api/auth/signIn', values)

         showNotification({
            title: 'You are logged in!',
            message: 'With welcome back!',
         })

         if (response.data) {
            const { email, role, token } = response.data

            if (email && role && token) {
               if (resetForm) {
                  resetForm()
               }

               if (role === 'ADMIN') {
                  navigate(ROUTES.ADMIN.INDEX)
               } else {
                  navigate(ROUTES.USER.INDEX)
               }
            }
         }

         return response.data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: error.response.data,
            type: 'error',
         })

         return rejectWithValue.message
      }
   }
)

const authWithGoogle = createAsyncThunk(
   'auth/authWithGoogle',

   async ({ tokenId, navigate, isSignUp }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            `/api/auth/authenticate/google?tokenId=${tokenId}`
         )

         showNotification({
            title: 'You came in!',
            message: isSignUp ? 'Signed in!' : 'Signed up!',
         })

         navigate(ROUTES.USER.INDEX)

         return response.data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: 'Failed to log in via Google!',
            type: 'error',
         })

         return rejectWithValue.message
      }
   }
)

const forgotPasswordEmail = createAsyncThunk(
   'auth/forgotPassword',
   async ({ values, resetForm, navigate }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('/api/auth/initiate', values)

         showNotification({ message: `${response.data}` })

         navigate(
            `${ROUTES.FORGOT_PASSWORD.INDEX}/${ROUTES.FORGOT_PASSWORD.VERIFICATION}`
         )

         resetForm()

         return response.data
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

const verificationCode = createAsyncThunk(
   'auth/verificationCode',
   async ({ values, resetForm, navigate }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('/api/auth/verify', values)

         showNotification({ message: 'Valid code entered!' })

         navigate(
            `${ROUTES.FORGOT_PASSWORD.INDEX}/${ROUTES.FORGOT_PASSWORD.VERIFICATION}/${ROUTES.FORGOT_PASSWORD.PASSWORD_CHANGE}`
         )

         resetForm()

         return response.data
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

const passwordChange = createAsyncThunk(
   'auth/passwordChange',
   async (
      { values, passwordToken, resetForm, navigate },
      { rejectWithValue }
   ) => {
      try {
         const response = await axiosInstance.post(
            `/api/auth/setPassword?uniqueIdentifier=${passwordToken}`,
            values
         )

         showNotification({
            message: 'You have successfully changed the password!',
         })

         navigate(ROUTES.SIGN_IN)

         resetForm()

         return response.data
      } catch (error) {
         showNotification({
            title: 'Error',
            message: `${error.response.data}`,
            type: 'error',
         })

         return rejectWithValue.message
      }
   }
)

export const AUTH_THUNKS = {
   signIn,
   signUp,
   authWithGoogle,
   forgotPasswordEmail,
   verificationCode,
   passwordChange,
}
