import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { signInWithPopup } from 'firebase/auth'
import { Box, Typography, styled, InputAdornment } from '@mui/material'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/buttons/Button'
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
import { SIGN_UP_INPUTS } from '../../utils/constants'
import { showErrorSignUp } from '../../utils/helpers'
import { VALIDATION_SIGN_UP } from '../../utils/helpers/validation'

const SignUp = () => {
   const { isLoading } = useSelector((state) => state.auth)

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const [showPassword, setShowPassword] = useState(false)
   const [focusedInput, setFocusedInput] = useState(null)

   const handlePasswordShow = () => setShowPassword((prev) => !prev)

   const handleInputFocus = (name) => setFocusedInput(name)

   const handleWithGoogle = async () => {
      await signInWithPopup(auth, provider)
         .then((data) => {
            dispatch(
               AUTH_THUNKS.authWithGoogle({
                  tokenId: data.user.accessToken,
                  navigate,
                  isSignUp: false,
               })
            )
         })
         .catch((error) => {
            return error
         })
   }

   const onSubmit = (values, { resetForm }) =>
      dispatch(AUTH_THUNKS.signUp({ values, resetForm, navigate }))

   const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
      useFormik({
         initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
         },

         validateOnChange: false,
         validateOnBlur: false,
         validationSchema: VALIDATION_SIGN_UP,

         onSubmit,
      })

   return (
      <StyledContainer>
         <form className="form" onSubmit={handleSubmit} autoComplete="off">
            <Box className="exit">
               <Link to="/">
                  <ExitIcon />
               </Link>
            </Box>

            <Box className="title-box">
               <LogoIcon />

               <Typography className="title" variant="h2">
                  Create an Account
               </Typography>
            </Box>

            <Box className="content">
               {SIGN_UP_INPUTS.map(({ name, label, type }) => (
                  <Input
                     key={name}
                     label={label}
                     name={name}
                     value={values[name]}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     type={showPassword ? 'text' : type}
                     error={touched[name] && errors[name]}
                     onFocus={() => handleInputFocus(name)}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment
                              className={name === 'password' ? 'adornment' : ''}
                              position="end"
                           >
                              {name === 'password' &&
                                 focusedInput === 'password' && (
                                    <Box onClick={handlePasswordShow}>
                                       {showPassword ? (
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
               ))}

               {showErrorSignUp(errors) ? (
                  <Typography className="validate">
                     {showErrorSignUp(errors)} <WarningIcon />
                  </Typography>
               ) : (
                  <Typography> </Typography>
               )}

               <Button loadingColor="secondary" isLoading={isLoading}>
                  Sign up
               </Button>

               <Button
                  type="button"
                  icon={<GoogleIcon />}
                  className="google-button"
                  onClick={handleWithGoogle}
               >
                  Sign up with google
               </Button>

               <Box className="text-account">
                  <Typography>Already have an account?</Typography>

                  <NavLink to={ROUTES.SIGN_IN} className="navigation">
                     <Typography className="log-in">Log in</Typography>
                  </NavLink>
               </Box>
            </Box>
         </form>
      </StyledContainer>
   )
}

export default SignUp

const StyledContainer = styled(Box)(({ theme }) => ({
   background: 'linear-gradient(180deg, #833fac, #3b10e5d8)',
   display: 'flex',
   justifyContent: 'center',
   width: '100%',
   height: '100vh',
   fontFamily: 'Poppins',

   '& > .form': {
      backgroundColor: theme.palette.primary.white,
      boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
      maxWidth: '45.375rem',
      maxHeight: '43rem',
      margin: '1.4rem',
      borderRadius: '0.625rem',
      padding: '0.5rem',
      overflow: 'auto',

      '& > .exit': {
         display: 'flex',
         justifyContent: 'flex-end',

         '& > svg': {
            cursor: 'pointer',
         },
      },

      '& > .title-box': {
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         gap: '0.75rem',

         '& > .title': {
            color: '#4C4859',
            fontSize: '1.5rem',
            fontWeight: '400',
            marginBottom: '2rem',
         },
      },

      '& > .content': {
         display: 'flex',
         flexDirection: 'column',
         gap: '1.5rem',
         margin: 'auto',
         padding: '0 5rem 1.89rem 5rem',

         '@media screen and (max-width: 1300px)': {
            gap: '1rem',
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

         '& .google-button': {
            '&.MuiButton-root': {
               backgroundColor: theme.palette.primary.white,
               color: '#757575',
               textAlign: 'center',
               fontSize: '0.875rem',
               fontWeight: '500',
               letterSpacing: '0.00875rem',
               gap: '0.5rem',
               alignItems: 'center',
               border: '1px solid #BDBDBD',
               boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.20)',
               maxWidth: '13.85rem',
               margin: 'auto',

               '&:hover': {
                  backgroundColor: '#EFEDED',
               },

               '&:active': {
                  backgroundColor: theme.palette.primary.white,
               },
            },
         },

         '& .text-account': {
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            color: '#757575',
            fontSize: '0.875rem',
            fontWeight: '500',
            letterSpacing: '0.0175rem',
            textTransform: 'uppercase',

            '& > .navigation': {
               textDecoration: 'none',

               '&:active': {
                  color: '#3A10E5',
               },
            },

            '& .log-in': {
               cursor: 'pointer',
               color: theme.palette.primary.main,
            },
         },
      },
   },

   '& > .form::-webkit-scrollbar': {
      width: '0.3rem',
   },

   '& > .form::-webkit-scrollbar-thumb': {
      borderRadius: '1rem',
      backgroundColor: '#3b10e5d8',
   },
}))
