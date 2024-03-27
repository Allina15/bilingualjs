import { forwardRef } from 'react'
import { styled, TextField } from '@mui/material'

const TextArea = forwardRef(
   ({ handleChange, value, placeholder, rows, ...props }, ref) => {
      return (
         <TextAreaStyle
            {...props}
            multiline
            minRows={rows}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            ref={ref}
            onPaste={(e) => e.preventDefault()}
         />
      )
   }
)

export default TextArea

const TextAreaStyle = styled(TextField)(({ theme }) => ({
   width: '100%',
   fontStyle: 'normal',
   fontWeight: 400,
   fontSize: '16px',
   lineHeight: '23px',
   letterSpacing: '0.03em',
   textTransform: 'uppercase',

   ' & .MuiInputBase-root': {
      borderRadius: '8px',
      padding: '14px 16px ',
   },
   ' & .MuiInputBase-input': {
      color: theme.palette.primary.fontColor,
      fontFamily: 'Poppins',
   },
}))
