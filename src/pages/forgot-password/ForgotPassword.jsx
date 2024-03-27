import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Box, Typography, styled } from '@mui/material'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/buttons/Button'
import { ExitIcon, LockIcon, WarningIcon } from '../../assets/icons'
import { AUTH_THUNKS } from '../../store/slices/auth/authThunk'
import { showErrorForgotPassword } from '../../utils/helpers'
import { VALIDATION_FORGOT_PASSWORD } from '../../utils/helpers/validation'
import { ROUTES } from '../../routes/routes'

const ForgotPassword = () => {
   const { isLoading } = useSelector((state) => state.auth)

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const onSubmit = (values, { resetForm }) =>
      dispatch(
         AUTH_THUNKS.forgotPasswordEmail({
            values,
            resetForm,
            navigate,
         })
      )

   const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
      useFormik({
         initialValues: {
            email: '',
         },

         validateOnChange: false,
         validateOnBlur: false,
         validationSchema: VALIDATION_FORGOT_PASSWORD,
         onSubmit,
      })
   return (
      <StyledContainer>
         <form className="form" autoComplete="off" onSubmit={handleSubmit}>
            <Box className="exit">
               <Link to={ROUTES.SIGN_IN}>
                  <ExitIcon />
               </Link>
            </Box>

            <Box className="content">
               <Box className="title-box">
                  <img src={LockIcon} alt="lock" className="lock" />

                  <Typography className="title" variant="h2">
                     Forgot Password
                  </Typography>

                  <Typography className="description">
                     We will email you a password recovery code.
                  </Typography>
               </Box>

               <Input
                  type="email"
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
               />

               {showErrorForgotPassword(errors) ? (
                  <Typography className="validate">
                     {showErrorForgotPassword(errors)} <WarningIcon />
                  </Typography>
               ) : (
                  <Typography> </Typography>
               )}

               <Button isLoading={isLoading} loadingColor="secondary">
                  SEND
               </Button>

               <Box className="back-container">
                  <NavLink to={ROUTES.SIGN_IN} className="navigation">
                     <Typography className="back">
                        Back to the entrance
                     </Typography>
                  </NavLink>
               </Box>
            </Box>
         </form>
      </StyledContainer>
   )
}

export default ForgotPassword

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

            '& .lock': {
               width: '6rem',
            },

            '& > .title': {
               color: '#4C4859',
               fontSize: '1.5rem',
               fontWeight: '500',
            },

            '& .description': {
               color: '#525059',
               marginBottom: '1.5rem',
            },
         },

         '& .check': {
            marginRight: '9px',
         },

         '& .MuiOutlinedInput-root': {
            width: '31.25rem',
            height: '3.25rem',
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

         '& .back-container': {
            display: 'flex',
            justifyContent: 'center',

            '& > .navigation': {
               textDecoration: 'none',
               color: '#757575',

               '&:active': {
                  color: '#757575',
               },
            },

            '& > .back': {
               cursor: 'pointer',
               fontWeight: '500',
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
