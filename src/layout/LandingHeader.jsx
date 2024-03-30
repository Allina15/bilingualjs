import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import Modal from '../components/UI/modals/Modal'
import Button from '../components/UI/buttons/Button'
import { LogoImage } from '../assets/images'
import { ROUTES } from '../routes/routes'
import { AUTH_ACTIONS } from '../store/slices/auth/authSlice'

const LandingHeader = () => {
   const { role } = useSelector((state) => state.auth)

   const [isVisibleModal, setIsVisibleModal] = useState(false)
   const [isScrolled, setIsScrolled] = useState(false)

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const handlelogOut = () => dispatch(AUTH_ACTIONS.logOut({ navigate }))

   const handleModal = () => setIsVisibleModal((prev) => !prev)

   useEffect(() => {
      const handleScroll = () => {
         const scrollTop = window.scrollY

         setIsScrolled(scrollTop > 0)
      }

      window.addEventListener('scroll', handleScroll)

      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      })
   }

   return (
      <StyledContainer isscrolled={isScrolled.toString()}>
         <Box className="box">
            <Box onClick={scrollToTop} className="logo">
               <img src={LogoImage} alt="logo" />
            </Box>

            <Box className="buttons">
               {role === 'GUEST' ? (
                  <>
                     <Link to={ROUTES.SIGN_IN}>
                        <Button>TO COME IN</Button>
                     </Link>

                     <Link to={ROUTES.SIGN_UP}>
                        <Button variant="secondary" className="register-button">
                           REGISTER
                        </Button>
                     </Link>
                  </>
               ) : (
                  <>
                     <Link to={ROUTES.USER.INDEX}>
                        <Button>TESTS</Button>
                     </Link>

                     <Button
                        variant="secondary"
                        className="register-button"
                        onClick={handleModal}
                     >
                        LOG OUT
                     </Button>

                     <Modal
                        isVisible={isVisibleModal}
                        handleIsVisible={handleModal}
                     >
                        <Box className="log-out">
                           <Typography className="text">
                              Are you sure you want to log out?
                           </Typography>

                           <Box className="buttons">
                              <Button
                                 variant="secondary"
                                 onClick={handleModal}
                                 className="button"
                              >
                                 CANCEL
                              </Button>

                              <Button onClick={handlelogOut}>YES</Button>
                           </Box>
                        </Box>
                     </Modal>
                  </>
               )}
            </Box>
         </Box>
      </StyledContainer>
   )
}

export default LandingHeader

const StyledContainer = styled(Box)(({ isscrolled, theme }) => ({
   backgroundColor: isscrolled === 'true' ? 'white' : '#FCD200',
   position: 'sticky',
   top: 0,
   zIndex: 1000,
   transition: 'background-color 0.5s ease-in-out',

   '& > .box': {
      margin: 'auto',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingLeft: '5rem',
      paddingRight: '5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      position: 'sticky',
      top: 0,
      maxWidth: '1600px',
      width: '100%',

      '& > .logo': {
         '& > img': {
            width: '14.67925rem',
            height: '3rem',
            cursor: 'pointer',
         },
      },

      '& > .buttons': {
         display: 'flex',

         '& .MuiButton-root': {
            fontFamily: 'Gilroy',
            marginLeft: '1rem',
         },

         '& .register-button': {
            color: '#4C4C4C',
            borderColor: 'white',

            '&:hover': {
               borderColor: theme.palette.primary.main,
               background: theme.palette.primary.main,
               color: theme.palette.primary.white,
            },
         },
      },
   },
}))
