import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { signInWithPopup } from 'firebase/auth'
import { Box, InputAdornment, Typography, styled } from '@mui/material'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/buttons/Button'
import Checkbox from '../../components/UI/Checkbox'
import {
   ExitIcon,
   EyeIcon,
   EyeOffIcon,
   GoogleIcon,
   LogoIcon,
   WarningIcon,
} from '../../assets/icons'
import { ROUTES } from '../../routes/routes'
import { AUTH_THUNKS } from '../../store/slices/auth/authThunk'
import { auth, provider } from '../../configs/firebase'
import { showErrorSignIn } from '../../utils/helpers'
import { VALIDATION_SIGN_IN } from '../../utils/helpers/validation'

const SignIn = () => {
   const { isLoading } = useSelector((state) => state.auth)

   const [showPassword, setShowPassword] = useState(false)
   const [isPasswordFieldActive, setIsPasswordFieldActive] = useState(false)

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const handleShowPassword = () => setShowPassword((prev) => !prev)

   const handlePasswordFieldFocus = () => setIsPasswordFieldActive(true)

   const handleWithGoogle = async () => {
      await signInWithPopup(auth, provider)
         .then((response) => {
            dispatch(
               AUTH_THUNKS.authWithGoogle({
                  tokenId: response?.user?.accessToken,
                  navigate,
                  isSignUp: true,
               })
            )
         })
         .catch((error) => {
            return error
         })
   }

   const onSubmit = (values, { resetForm }) => {
      const trimmedValues = Object.fromEntries(
         Object.entries(values)?.map(([key, value]) => {
            const trimmedValue =
               typeof value === 'string' ? value.trim() : value

            return [key, trimmedValue]
         })
      )

      dispatch(
         AUTH_THUNKS.signIn({ values: trimmedValues, resetForm, navigate })
      )
   }

   const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
      useFormik({
         initialValues: {
            email: '',
            password: '',
            rememberMe: false,
         },

         validateOnChange: false,
         validateOnBlur: false,
         validationSchema: VALIDATION_SIGN_IN,
         onSubmit,
      })

   return (
      <StyledContainer>
         <form className="form" autoComplete="off" onSubmit={handleSubmit}>
            <Box className="exit">
               <Link to="/">
                  <ExitIcon />
               </Link>
            </Box>

            <Box className="content">
               <Box className="title-box">
                  <LogoIcon />

                  <Typography className="title" variant="h2">
                     Sign in
                  </Typography>
               </Box>

               <Input
                  type="email"
                  label="Email"
                  name="email"
                  value={values?.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched?.email && errors?.email}
               />

               <Input
                  label="Password"
                  name="password"
                  value={values?.password}
                  onChange={handleChange}
                  onFocus={handlePasswordFieldFocus}
                  onBlur={handleBlur}
                  type={showPassword ? 'text' : 'password'}
                  error={touched?.password && errors?.password}
                  InputProps={{
                     endAdornment: (
                        <InputAdornment className="adornment" position="end">
                           {isPasswordFieldActive && (
                              <Box onClick={handleShowPassword}>
                                 {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                              </Box>
                           )}
                        </InputAdornment>
                     ),
                  }}
               />

               <Box>
                  <Checkbox
                     name="rememberMe"
                     checked={values?.rememberMe}
                     onChange={handleChange}
                     className="check"
                  />

                  <Typography variant="span" className="text-checkbox">
                     To remember me
                  </Typography>
               </Box>

               {showErrorSignIn(errors) ? (
                  <Typography className="validate">
                     {showErrorSignIn(errors)} <WarningIcon />
                  </Typography>
               ) : (
                  <Typography> </Typography>
               )}

               <Button loadingColor="secondary" isLoading={isLoading}>
                  Sign in
               </Button>

               <Button
                  type="button"
                  icon={<GoogleIcon />}
                  className="google-button"
                  onClick={handleWithGoogle}
               >
                  Sign in with google
               </Button>

               <Box className="text-account">
                  <Typography>Dont have an account?</Typography>

                  <NavLink to={ROUTES.SIGN_UP} className="navigation">
                     <Typography className="register">Register</Typography>
                  </NavLink>
               </Box>

               <Box className="forgot-account">
                  <NavLink
                     to={ROUTES.FORGOT_PASSWORD.INDEX}
                     className="navigation"
                  >
                     <Typography className="forgot">
                        Forgot your password?
                     </Typography>
                  </NavLink>
               </Box>
            </Box>
         </form>
      </StyledContainer>
   )
}

export default SignIn

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
      maxWidth: '38.5rem',
      maxHeight: '40rem',
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

         '& > div > .check': {
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

         '& > div > .text-checkbox': {
            color: '#757575',
            fontFamily: 'Poppins',
            fontSize: '0.875rem',
            fontWeight: '400',
         },

         '& > .google-button': {
            '&.MuiButton-root': {
               backgroundColor: theme.palette.primary.white,
               color: '#757575',
               textAlign: 'center',
               fontSize: '0.875rem',
               fontWeight: '500',
               padding: '0.875rem 1.25rem',
               gap: '0.5rem',
               border: '1px solid #BDBDBD',
               boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.20)',
               width: '13.85rem',
               margin: 'auto',

               '&:hover': {
                  backgroundColor: '#EFEDED',
               },

               '&:active': {
                  backgroundColor: theme.palette.primary.white,
               },
            },
         },

         '& > .text-account': {
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            color: '#757575',
            fontSize: '0.875rem',
            fontWeight: '500',
            textTransform: 'uppercase',

            '& > .navigation': {
               textDecoration: 'none',

               '&:active': {
                  color: '#3A10E5',
               },
            },

            '& > .register': {
               cursor: 'pointer',
               color: theme.palette.primary.main,
               fontWeight: '500',
            },
         },

         '& > .forgot-account': {
            display: 'flex',
            justifyContent: 'center',
            margin: '-1.5rem 0',

            '& > .navigation': {
               textDecoration: 'none',
               color: '#757575',

               '&:active': {
                  color: '#757575',
               },
            },

            '& > .forgot': {
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
