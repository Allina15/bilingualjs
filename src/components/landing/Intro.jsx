import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import { motion } from 'framer-motion'
import LandingButton from '../UI/buttons/LandingButton'
import { BackgroundIntroImage } from '../../assets/images'
import {
   FirstBookIcon,
   FirstPaperIcon,
   FourthPaperIcon,
   MantieIcon,
   NoteIcon,
   SecondBookIcon,
   SecondPaperIcon,
   ShadowBookIcon,
   ThirdBookIcon,
   ThirdPaperIcon,
} from '../../assets/icons'
import { ROUTES } from '../../routes/routes'

const Intro = () => {
   const { isAuth } = useSelector((state) => state.auth)

   const [isVisible, setIsVisible] = useState(false)

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const beginHandler = () => {
      if (isAuth) navigate(ROUTES.USER.INDEX, { replace: true })
      else navigate(ROUTES.SIGN_IN)
   }

   useEffect(() => {
      const timeoutId = setTimeout(() => setIsVisible(true), 100)

      return () => clearTimeout(timeoutId)
   }, [])

   useEffect(() => {
      const checkCookies = () => {
         const email = document.cookie.replace(
            /(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
         )
         const password = document.cookie.replace(
            /(?:(?:^|.*;\s*)password\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
         )
         const rememberMe =
            document.cookie.replace(
               /(?:(?:^|.*;\s*)rememberMe\s*=\s*([^;]*).*$)|^.*$/,
               '$1'
            ) === 'true'

         if (email && password && rememberMe) {
            dispatch()
         }
      }

      checkCookies()
   }, [])

   return (
      <StyledContainer>
         <Box className="box">
            <motion.div
               animate={{ y: 50, opacity: isVisible ? 1 : 0 }}
               initial={{ opacity: 0 }}
               transition={{ ease: 'easeOut', duration: 2 }}
            >
               <StyledMantieImg />
            </motion.div>

            <motion.div
               animate={{ y: 180, opacity: isVisible ? 1 : 0 }}
               initial={{ opacity: 0 }}
               transition={{ ease: 'easeOut', duration: 2 }}
            >
               <StyledFirstPaperIcon />
            </motion.div>

            <motion.div
               animate={{ y: 110, opacity: isVisible ? 1 : 0 }}
               initial={{ opacity: 0 }}
               transition={{ ease: 'easeOut', duration: 2 }}
            >
               <StyledThirdPaperIcon />
            </motion.div>

            <motion.div
               animate={{
                  y: 365,
                  zIndex: isVisible ? 1 : 0,
                  opacity: isVisible ? 1 : 0,
               }}
               initial={{ opacity: 0 }}
               transition={{ ease: 'easeOut', duration: 2 }}
            >
               <StyledSecondPaperIcon />
            </motion.div>

            <motion.div
               animate={{ y: 550, opacity: isVisible ? 1 : 0 }}
               initial={{ opacity: 0 }}
               transition={{ ease: 'easeOut', duration: 2 }}
            >
               <StyledFourthPaperIcon />
            </motion.div>

            <motion.div
               animate={{
                  y: 200,
                  zIndex: isVisible ? 1 : 0,
                  opacity: isVisible ? 1 : 0,
               }}
               initial={{ opacity: 0 }}
               transition={{ ease: 'easeOut', duration: 1.8 }}
            >
               <StyledNoteImg />
            </motion.div>

            <motion.div
               animate={{ y: 386, opacity: isVisible ? 1 : 0 }}
               initial={{ opacity: 0 }}
               transition={{ ease: 'easeOut', duration: 1.2 }}
            >
               <StyledBookOneImg />
            </motion.div>

            <motion.div
               animate={{ y: 475, opacity: isVisible ? 1 : 0 }}
               initial={{ opacity: 0 }}
               transition={{ ease: 'easeOut', duration: 1 }}
            >
               <StyledBookTwoImg />
            </motion.div>

            <motion.div
               animate={{ y: 545, opacity: isVisible ? 1 : 0 }}
               initial={{ opacity: 0 }}
               transition={{ ease: 'easeOut', duration: 0.8 }}
            >
               <StyledBookThreeImg />
            </motion.div>

            <motion.div
               animate={{ opacity: isVisible ? 1 : 0 }}
               initial={{ opacity: 0 }}
               transition={{ ease: 'easeOut', duration: 0.6 }}
            >
               <StyledShadowBookImg />
            </motion.div>

            <StyledTextsBox
               animate={{ x: 50, opacity: isVisible ? 1 : 0 }}
               initial={{ opacity: 0 }}
               transition={{ ease: 'easeOut', duration: 1 }}
            >
               <Typography className="title">
                  Prove your English proficiency today with
               </Typography>

               <Typography className="bilingual">BILINGUAL</Typography>

               <Typography className="description">
                  For nearly 30 years, learners have turned to Rosetta Stone to
                  build the fluency and confidence they need to speak new
                  languages.
               </Typography>
            </StyledTextsBox>

            <motion.div
               className="button"
               animate={{
                  scale: [0.95, 1, 0.95, 1],
               }}
               transition={{
                  ease: 'easeOut',
                  duration: 4,
                  repeat: Infinity,
               }}
            >
               <LandingButton isStart={false} onClick={beginHandler} />
            </motion.div>
         </Box>
      </StyledContainer>
   )
}

export default Intro

const StyledContainer = styled('div')({
   backgroundImage: `url(${BackgroundIntroImage})`,
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat',

   '@media (max-width: 1200px)': {
      maxWidth: '1200px',
      paddingRight: '1rem',
      height: '35rem',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '9rem',
      gap: '10rem',
   },

   '& .box': {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
      justifyContent: 'flex-start',
      paddingRight: '15rem',
      maxWidth: '1600px',
      width: '100%',
      height: '42rem',
      position: 'relative',
   },

   '& .button': {
      width: '33.328rem',
      height: '4.495rem',
      position: 'absolute',
      top: '30.5rem',
      left: '4.6rem',

      '@media (max-width: 1200px)': {
         width: '32.328rem',
         height: '3.495rem',
         top: '21rem',
      },
   },
})

const StyledTextsBox = styled(motion.div)({
   width: '33.328rem',
   height: '4.495rem',
   position: 'absolute',
   top: '7rem',
   left: '1.6rem',

   '@media (max-width: 1200px)': {
      width: '32.328rem',
      height: '3.495rem',
   },

   '& .title': {
      width: '40rem',
      fontSize: '3.75rem',
      fontFamily: 'Gilroy',
      color: '#43404E',
      fontWeight: '900',

      '@media (max-width: 1200px)': {
         maxWidth: '40rem',
         fontSize: '3rem',
         position: 'relative',
         top: '-1.5rem',
      },
   },

   '& .bilingual': {
      color: '#C93D7D',
      fontFamily: 'Gilroy',
      fontSize: '3.75rem',
      paddingTop: '0px',

      '@media (max-width: 1200px)': {
         maxWidth: '40rem',
         fontSize: '3rem',
         position: 'relative',
         top: '-1.5rem',
      },
   },

   '& .description': {
      color: '#47454e',
      width: '48.25rem',
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: '1.25rem',
      paddingTop: '1.813rem',
      paddingBottom: '1.875rem',

      '@media (max-width: 1200px)': {
         maxWidth: '40rem',
         fontSize: '1.1rem',
         position: 'relative',
         top: '-2rem',
      },
   },
})

const StyledMantieImg = styled(MantieIcon)({
   width: '14rem',
   height: '15rem',
   position: 'absolute',
   top: '1rem',
   right: '8.5rem',

   '@media (max-width: 1200px)': {
      width: '12.5rem',
      height: '13.5rem',
      right: '4rem',
      top: '-0.5rem',
   },
})

const StyledFirstPaperIcon = styled(FirstPaperIcon)({
   width: '6rem',
   height: '6rem',
   position: 'absolute',
   top: '0',
   left: '2.8rem',

   '@media (max-width: 1200px)': {
      width: '5.5rem',
      height: '5.5rem',
      top: '0',
      left: '8rem',
   },
})

const StyledSecondPaperIcon = styled(SecondPaperIcon)({
   width: '8rem',
   height: '4rem',
   position: 'absolute',
   left: '-180px',

   '@media (max-width: 1200px)': {
      width: '6.8rem',
      height: '2.8rem',
      top: '-4rem',
      left: '-100px',
   },
})

const StyledThirdPaperIcon = styled(ThirdPaperIcon)({
   width: '9.5rem',
   height: '5rem',
   position: 'absolute',
   top: '8rem',
   right: '6.5rem',

   '@media (max-width: 1200px)': {
      width: '8rem',
      height: '4rem',
      top: '6rem',
      right: '3rem',
   },
})

const StyledFourthPaperIcon = styled(FourthPaperIcon)({
   width: '10rem',
   height: '4.5rem',
   position: 'absolute',
   top: '0',
   left: '-28rem',

   '@media (max-width: 1200px)': {
      width: '9.5rem',
      height: '3.5rem',
      top: '-5.8rem',
      left: '-19rem',
   },
})

const StyledNoteImg = styled(NoteIcon)({
   width: '13.23088rem',
   height: '13.99494rem',
   position: 'absolute',
   top: '1rem',
   left: '-6rem',

   '@media (max-width: 1200px)': {
      width: '11rem',
      height: '11rem',
      top: '-1rem',
      left: '-2.5rem',
   },
})

const StyledBookOneImg = styled(FirstBookIcon)({
   width: '17.273rem',
   height: '5.611rem',
   position: 'absolute',
   top: '0',
   left: '-13rem',

   '@media (max-width: 1200px)': {
      width: '16.5rem',
      height: '4.5rem',
      top: '-4.4rem',
      left: '-9rem',
   },
})

const StyledBookTwoImg = styled(SecondBookIcon)({
   width: '17.688rem',
   height: '4.527rem',
   position: 'absolute',
   top: '0',
   right: '-6rem',

   '@media (max-width: 1200px)': {
      width: '17.5rem',
      height: '3.5rem',
      top: '-5.5rem',
      right: '-9.5rem',
   },
})

const StyledBookThreeImg = styled(ThirdBookIcon)({
   width: '20.809rem',
   height: '4.495rem',
   position: 'absolute',
   top: '0',
   left: '-14rem',

   '@media (max-width: 1200px)': {
      width: '19.5rem',
      height: '3.5rem',
      top: '-6.5rem',
      left: '-9.4rem',
   },
})

const StyledShadowBookImg = styled(ShadowBookIcon)({
   width: '33.328rem',
   height: '4.495rem',
   position: 'absolute',
   top: '37rem',
   right: '4rem',

   '@media (max-width: 1200px)': {
      width: '32.5rem',
      height: '3.5rem',
      top: '29.9rem',
      right: '0rem',
   },
})
