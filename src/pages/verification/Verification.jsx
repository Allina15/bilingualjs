import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Box, Typography, styled } from '@mui/material'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/buttons/Button'
import { ExitIcon, WarningIcon } from '../../assets/icons'
import { AUTH_THUNKS } from '../../store/slices/auth/authThunk'
import { showErrorVerification } from '../../utils/helpers'
import { VALIDATION_VERIFICATION } from '../../utils/helpers/validation'

const Verification = () => {
   const { isLoading } = useSelector((state) => state.auth)

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const onSubmit = (values, { resetForm }) => {
      const trimmedValues = Object.fromEntries(
         Object.entries(values).map(([key, value]) => {
            const trimmedValue =
               typeof value === 'string' ? value.trim() : value
            return [key, trimmedValue]
         })
      )

      dispatch(
         AUTH_THUNKS.verificationCode({
            values: trimmedValues,
            resetForm,
            navigate,
         })
      )
   }

   const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
      useFormik({
         initialValues: {
            uniqueIdentifier: '',
         },

         validateOnChange: false,
         validateOnBlur: false,
         validationSchema: VALIDATION_VERIFICATION,
         onSubmit,
      })

   return (
      <StyledContainer>
         <form className="form" autoComplete="off" onSubmit={handleSubmit}>
            <Box className="exit">
               <Link to={-1}>
                  <ExitIcon />
               </Link>
            </Box>

            <Box className="content">
               <Box className="title-box">
                  <Typography className="title" variant="h2">
                     Verify the code you received.
                  </Typography>
               </Box>

               <Input
                  type="text"
                  label="Enter the code"
                  name="uniqueIdentifier"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.uniqueIdentifier}
                  error={touched.uniqueIdentifier && errors.uniqueIdentifier}
               />

               {showErrorVerification(errors) ? (
                  <Typography className="validate">
                     {showErrorVerification(errors)} <WarningIcon />
                  </Typography>
               ) : (
                  <Typography> </Typography>
               )}

               <Button isLoading={isLoading} loadingColor="secondary">
                  Verify
               </Button>
            </Box>
         </form>
      </StyledContainer>
   )
}

export default Verification

const StyledContainer = styled(Box)(({ theme }) => ({
   background: 'linear-gradient(180deg, #833fac, #3b10e5d8)',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   height: '100vh',
   fontFamily: 'Poppins',

   '& > .form': {
      backgroundColor: theme.palette.primary.white,
      boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
      margin: '2.5rem',
      borderRadius: '0.625rem',
      padding: '1rem',
      overflow: 'auto',

      '& > .exit': {
         display: 'flex',
         justifyContent: 'flex-end',

         '& > svg': {
            cursor: 'pointer',
         },
      },

      '& > .content': {
         display: 'flex',
         flexDirection: 'column',
         gap: '1.6rem',
         margin: 'auto',
         padding: '1rem 3rem',

         '@media screen and (max-width: 1300px)': {
            gap: '1rem',
         },

         '& > .title-box': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',

            '& > .title': {
               color: '#4C4859',
               fontSize: '1.5rem',
               fontWeight: '500',
               marginBottom: '2rem',
            },
         },

         '& .MuiOutlinedInput-root': {
            width: '31.25rem',
            height: '3.25rem',

            '& > .adornment': {
               cursor: 'pointer',
               paddingTop: '0.3rem',
            },
         },

         '& .MuiOutlinedInput-root.Mui-error:hover .MuiOutlinedInput-notchedOutline':
            {
               borderColor: 'red',
            },

         '& > .validate': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'Poppins',
            fontWeight: '400',
            color: 'red',
            margin: '-0.699rem 0rem',
            fontSize: '0.9rem',

            '@media screen and (max-width: 1400px)': {
               fontSize: '0.8rem',
               margin: '-0.2rem 0 -0.9rem 0',
            },

            '@media screen and (max-width: 1300px)': {
               fontSize: '0.7rem',
               margin: '-0.3rem 0 -0.9rem 0',
            },
         },
      },
   },

   '& > .form::-webkit-scrollbar': {
      width: '0.3rem',
      height: '0.3rem',
   },

   '& > .form::-webkit-scrollbar-thumb': {
      borderRadius: '1rem',
      backgroundColor: '   #3b10e5d8',
   },
}))
