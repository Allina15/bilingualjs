import Cookies from 'js-cookie'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { showNotification } from '../../../utils/helpers/notification'
import { axiosInstance } from '../../../configs/axiosInstance'
import { ROUTES } from '../../../routes/routes'

const signUp = createAsyncThunk(
   'auth/signUp',

   async ({ values, resetForm, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('/api/auth/signUp', values)

         showNotification({
            title: 'You are registered!',
            message: 'We wish you great results!',
         })

         const { email, role, token } = data

         if (email && role && token) {
            resetForm()

            navigate(ROUTES.USER.INDEX)
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

const signIn = createAsyncThunk(
   'auth/signIn',

   async ({ values, resetForm, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('/api/auth/signIn', values)

         showNotification({
            title: 'You are logged in!',
            message: 'With welcome back!',
         })

         if (data) {
            const { email, role, token } = data

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

            if (values.rememberMe !== false) {
               Cookies.set('BILINGUAL', JSON.stringify(values))

               navigate(ROUTES[data.role].index)
            }
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

const authWithGoogle = createAsyncThunk(
   'auth/authWithGoogle',

   async ({ tokenId, navigate, isSignUp }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/auth/authenticate/google?tokenId=${tokenId}`
         )

         showNotification({
            title: 'You came in!',
            message: isSignUp ? 'Signed in!' : 'Signed up!',
         })

         navigate(ROUTES.USER.INDEX)

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

const forgotPassword = createAsyncThunk(
   'auth/forgotPassword',
   async ({ values, resetForm, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('/api/auth/initiate', values)

         showNotification({ message: `${data}` })

         navigate(
            `${ROUTES.FORGOT_PASSWORD.INDEX}/${ROUTES.FORGOT_PASSWORD.VERIFICATION}`
         )

         resetForm()

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

const verificationCode = createAsyncThunk(
   'auth/verificationCode',
   async ({ values, resetForm, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('/api/auth/verify', values)

         showNotification({ message: 'Valid code entered!' })

         navigate(
            `${ROUTES.FORGOT_PASSWORD.INDEX}/${ROUTES.FORGOT_PASSWORD.VERIFICATION}/${ROUTES.FORGOT_PASSWORD.PASSWORD_CHANGE}`
         )

         resetForm()

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

const changePassword = createAsyncThunk(
   'auth/changePassword',
   async (
      { values, passwordToken, resetForm, navigate },
      { rejectWithValue }
   ) => {
      try {
         const { data } = await axiosInstance.post(
            `/api/auth/setPassword?uniqueIdentifier=${passwordToken}`,
            values
         )

         showNotification({
            message: 'You have successfully changed the password!',
         })

         navigate(ROUTES.SIGN_IN)

         resetForm()

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

export const AUTH_THUNKS = {
   signIn,
   signUp,
   authWithGoogle,
   forgotPassword,
   verificationCode,
   changePassword,
}
