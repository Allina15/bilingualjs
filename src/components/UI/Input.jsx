import { forwardRef } from 'react'
import { styled, TextField } from '@mui/material'

const Input = forwardRef(
   (
      { type, value, onChange, error, label, disabled, placeholder, ...rest },
      ref
   ) => (
      <StyledTextField
         type={type}
         label={label}
         ref={ref}
         disabled={disabled}
         value={value}
         onChange={onChange}
         error={error}
         placeholder={placeholder}
         variant="outlined"
         {...rest}
      />
   )
)

export default Input

const StyledTextField = styled(TextField)(({ error, disabled }) => ({
   width: '100%',
   height: '52px',

   '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      border: '#BDBDBD',
      color: '#757575',
      caretColor: error ? '#F61414' : '#3A10E5',

      '&:hover': {
         '& fieldset': {
            border: `1px solid ${error ? '#151010' : '#3A10E5'}`,
            borderRadius: '8px',
         },
      },

      '&.Mui-focused': {
         '& fieldset': {
            border: `1px solid ${error ? '#F61414' : '#3A10E5'}`,
         },
      },

      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
         border: `1px solid ${error ? '#F61414' : '#3A10E5'}`,
      },

      ...(disabled && {
         backgroundColor: '#F7F7F7',
      }),
   },

   '& label.Mui-focused': {
      color: `${error ? 'gray' : '#3A10E5'}`,
   },
}))
