import { forwardRef, useEffect, useState } from 'react'
import { ErrorMessage } from 'formik'
import { FormControlLabel, Switch, styled } from '@mui/material'

const Switcher = forwardRef(({ checked, onChange, disabled, ...rest }, ref) => {
   const [isChecked, setChecked] = useState(checked)
   const [error, setError] = useState(null)

   useEffect(() => {
      setChecked(checked)
   }, [checked])

   const handleChange = async (event) => {
      try {
         setChecked(event.target.checked)
         await onChange(event.target.checked)
      } catch (error) {
         setError(error.message)
      }
   }

   return (
      <>
         <FormControlLabel
            control={
               <StyledSwitch
                  onChange={handleChange}
                  disabled={disabled}
                  ref={ref}
                  checked={isChecked}
                  {...rest}
               />
            }
         />
         {error && <ErrorMessage>{error}</ErrorMessage>}
      </>
   )
})

export default Switcher

const StyledSwitch = styled(Switch)(({ theme }) => ({
   width: '38px',
   height: '22px',
   padding: 0,

   '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',

      '&.Mui-checked': {
         transform: 'translateX(16px)',
         color: theme.palette.primary.white,

         '& + .MuiSwitch-track': {
            backgroundColor: '#2AB930',
            border: 0,
            opacity: 1,
         },
      },

      '&.Mui-focusVisible .MuiSwitch-thumb': {
         color: '#33cf4d',
         border: '6px solid',
         borderColor: theme.palette.primary.white,
      },
   },

   '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 18,
      height: 18,
      boxShadow: 'none',
   },

   '& .MuiSwitch-track': {
      borderRadius: '26px',
      backgroundColor: '#C4C4C4',
      opacity: 1,
   },
}))
