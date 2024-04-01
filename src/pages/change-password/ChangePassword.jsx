import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Box, InputAdornment, Typography, styled } from '@mui/material'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/buttons/Button'
import { ExitIcon, EyeIcon, EyeOffIcon, WarningIcon } from '../../assets/icons'
import { AUTH_THUNKS } from '../../store/slices/auth/authThunk'
import { ROUTES } from '../../routes/routes'
import { showErrorChangePassword } from '../../utils/helpers'
import { VALIDATION_CHANGE_PASSWORD } from '../../utils/helpers/validation'

const ChangePassword = () => {
   const { passwordToken, isLoading } = useSelector((state) => state.auth)

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const [showNewPassword, setShowNewPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   const [isPasswordFieldActive, setIsPasswordFieldActive] = useState(false)

   const handleShowNewPassword = () => setShowNewPassword((prev) => !prev)

   const handleShowConfirmPassword = () =>
      setShowConfirmPassword((prev) => !prev)

   const handleNewPasswordFieldFocus = () => setIsPasswordFieldActive(true)
   const handleConfirmPasswordFieldFocus = () => setIsPasswordFieldActive(true)

   const onSubmit = (values, { resetForm }) => {
      const trimmedValues = Object.fromEntries(
         Object.entries(values)?.map(([key, value]) => {
            const trimmedValue =
               typeof value === 'string' ? value.trim() : value

            return [key, trimmedValue]
         })
      )

      dispatch(
         AUTH_THUNKS.changePassword({
            values: trimmedValues,
            passwordToken,
            resetForm,
            navigate,
         })
      )
   }

   const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
      useFormik({
         initialValues: {
            newPassword: '',
            confirmPassword: '',
         },

         validateOnChange: false,
         validateOnBlur: false,
         validationSchema: VALIDATION_CHANGE_PASSWORD,
         onSubmit,
      })
   return (
      <StyledContainer>
         <form className="form" autoComplete="off" onSubmit={handleSubmit}>
            <Box className="exit">
               <Link to={ROUTES.FORGOT_PASSWORD}>
                  <ExitIcon />
               </Link>
            </Box>

            <Box className="content">
               <Box className="title-box">
                  <Typography className="title" variant="h2">
                     Change password
                  </Typography>
               </Box>

               <Input
                  label="New password"
                  name="newPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.newPassword}
                  type={showNewPassword ? 'text' : 'password'}
                  error={touched?.newPassword && errors?.newPassword}
                  onFocus={handleNewPasswordFieldFocus}
                  InputProps={{
                     endAdornment: (
                        <InputAdornment className="adornment" position="end">
                           {isPasswordFieldActive && (
                              <Box onClick={handleShowNewPassword}>
                                 {showNewPassword ? (
                                    <EyeIcon />
                                 ) : (
                                    <EyeOffIcon />
                                 )}
                              </Box>
                           )}
                        </InputAdornment>
                     ),
                  }}
               />

               <Input
                  label="Confirm password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.confirmPassword}
                  type={showConfirmPassword ? 'text' : 'password'}
                  error={touched?.confirmPassword && errors?.confirmPassword}
                  onFocus={handleConfirmPasswordFieldFocus}
                  InputProps={{
                     endAdornment: (
                        <InputAdornment className="adornment" position="end">
                           {isPasswordFieldActive && (
                              <Box onClick={handleShowConfirmPassword}>
                                 {showConfirmPassword ? (
                                    <EyeIcon />
                                 ) : (
                                    <EyeOffIcon />
                                 )}
                              </Box>
                           )}
                        </InputAdornment>
                     ),
                  }}
               />

               {showErrorChangePassword(errors) ? (
                  <Typography className="validate">
                     {showErrorChangePassword(errors)} <WarningIcon />
                  </Typography>
               ) : (
                  <Typography> </Typography>
               )}

               <Button isLoading={isLoading} loadingColor="secondary">
                  CHANGE
               </Button>
            </Box>
         </form>
      </StyledContainer>
   )
}

export default ChangePassword

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

         '& .check': {
            marginRight: '9px',
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
