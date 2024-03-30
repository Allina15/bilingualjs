import { createSlice } from '@reduxjs/toolkit'
import { OPTIONS_THUNKS } from './optionsThunk'

const initialState = {
   options: [],
}

const optionsSlice = createSlice({
   name: 'option',
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(OPTIONS_THUNKS.postOptions.pending, (state) => {
            state.isLoading = true
         })

         .addCase(OPTIONS_THUNKS.postOptions.fulfilled, (state) => {
            state.isLoading = false
         })

         .addCase(OPTIONS_THUNKS.postOptions.rejected, (state) => {
            state.isLoading = false
         })

         .addCase(OPTIONS_THUNKS.deleteOption.pending, (state) => {
            state.isLoading = true
         })

         .addCase(OPTIONS_THUNKS.deleteOption.fulfilled, (state) => {
            state.isLoading = false
         })

         .addCase(OPTIONS_THUNKS.deleteOption.rejected, (state) => {
            state.isLoading = false
         })
   },
})

const OPTIONS_ACTIONS = optionsSlice.actions

export { optionsSlice, OPTIONS_ACTIONS }
