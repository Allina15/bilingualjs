import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import { Box, keyframes, styled, Typography } from '@mui/material'
import {
   AiroplaneIcon,
   BorderAiroplaneIcon,
   CoinsIcon,
   EarthIcon,
   LinesIcon,
   PiggyBankIcon,
} from '../../assets/icons'

const ANIMATE_ICONS = keyframes`
        to  {
          stroke-dashoffset: 0;
        } from {
          stroke-dashoffset: 300;
        }
      `

const Statistics = () => {
   const [isVisible, setIsVisible] = useState(false)
   const [isVisibleCount, setIsVisibleCount] = useState(false)

   useEffect(() => {
      const handleScroll = () => {
         const element = document.getElementById('statistics-count')

         if (element) {
            const { top, bottom } = element.getBoundingClientRect()
            const { innerHeight } = window

            if (top < innerHeight && bottom >= 0) {
               setIsVisibleCount(true)
               setIsVisible(true)
            }
         }
      }

      handleScroll()

      window.addEventListener('scroll', handleScroll)

      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   return (
      <StyledContainer>
         <Box className="box">
            <Box className="card">
               <Box className="image">
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{
                        x: 47.03,
                        y: -14.96,
                        opacity: isVisible ? 1 : 0,
                     }}
                     transition={{ repeat: Infinity, duration: 3 }}
                  >
                     <StyledAiroplaneFirst />
                     <StyledAiroplaneSecond />
                     <StyledAiroplaneThird />
                     <StyledAiroplaneFourth />
                     <StyledAiroplaneFifth />
                     <StyledAiroplaneSixth />
                     <StyledAiroplaneSeventh />
                     <StyledAiroplaneEighth />
                     <StyledAiroplaneNinth />
                     <StyledAiroplaneTenth />
                     <StyledAiroplaneEleventh />
                     <StyledAiroplaneTwelfth />
                     <StyledAiroplaneThirteenth />
                     <StyledAiroplaneFourteenth />
                     <StyledAiroplaneFifteenth />
                  </motion.div>

                  <StyledBorderAiroplane />
               </Box>

               <StyledCount>
                  <Box id="statistics-count">
                     {isVisibleCount && (
                        <Box>
                           <CountUp duration={1} end={10000} />

                           <Typography variant="span">+</Typography>
                        </Box>
                     )}
                  </Box>
               </StyledCount>

               <StyledText>
                  Over 10,000 fee waivers for the
                  <br />
                  Bilingual English Test are offered annually.
               </StyledText>
            </Box>

            <Box className="card">
               <Box className="image">
                  <StyledLines />

                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{
                        scale: [0.98, 1, 0.98, 1],
                        opacity: isVisible ? 1 : 0,
                     }}
                     transition={{ duration: 3, repeat: Infinity }}
                  >
                     <StyledEarth />
                  </motion.div>
               </Box>

               <StyledCount>
                  <Box id="statistics-container">
                     {isVisibleCount && (
                        <Box>
                           <CountUp duration={1} end={200} />

                           <Typography variant="span">+</Typography>
                        </Box>
                     )}
                  </Box>
               </StyledCount>

               <StyledText>
                  Students from over 200 countries and territories have
                  benefitted.
               </StyledText>
            </Box>

            <Box className="card">
               <Box className="image">
                  <StyledPiggyBank />

                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ y: 20.96, opacity: isVisible ? 1 : 0 }}
                     transition={{ duration: 4, repeat: Infinity }}
                  >
                     <StyledCoins />
                  </motion.div>
               </Box>

               <StyledCount>
                  <Typography variant="span">$0</Typography>
               </StyledCount>

               <StyledText>
                  Eligible students can take the test with absolutely zero cost
                  to them.
               </StyledText>
            </Box>
         </Box>
      </StyledContainer>
   )
}

export default Statistics

const StyledContainer = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.secondary.main,

   '& > .box': {
      padding: '120px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1600px',
      margin: '0 auto',
   },

   '& > .box > .card': {
      '& > .image': {
         width: '18.81rem',
         height: '11rem',
      },
   },
}))

const StyledText = styled(Typography)(({ theme }) => ({
   color: theme.palette.primary.blackGrey,
   textAlign: 'center',
   fontWeight: '400',
   lineHeight: 'normal',
   width: '20.9375rem',
   height: '3rem',
   marginTop: '-4.5rem',
}))

const StyledCount = styled(Box)(({ theme }) => ({
   border: '1px solid #3785D7',
   borderRadius: '0.6rem',
   boxShadow: '0px 21px 10px -4px rgba(34, 60, 80, 0.09)',
   width: '12.4rem',
   textAlign: 'center',
   fontSize: '3rem',
   position: 'relative',
   bottom: '8.4rem',
   left: '4.6rem',
   padding: '0.9rem 0.5rem',
   backgroundColor: theme.palette.primary.white,

   '& span': {
      fontFamily: 'Gilroy',
   },
}))

const StyledBorderAiroplane = styled(BorderAiroplaneIcon)(() => ({
   position: 'relative',
   top: '0.2rem',
   left: '1.4rem',

   '& path': {
      strokeDasharray: '18.56 18.56',
      animation: `${ANIMATE_ICONS} 3.5s infinite linear forwards`,
   },
}))

const StyledLines = styled(LinesIcon)(() => ({
   position: 'relative',
   left: '3rem',
   top: '0.3rem',

   '& path': {
      strokeDasharray: '18.56 18.56',
      animation: `${ANIMATE_ICONS} 3.5s infinite linear forwards`,
   },
}))

const StyledEarth = styled(EarthIcon)(() => ({
   position: 'absolute',
   left: '5.3rem',
   bottom: '-0.2rem',
}))

const StyledPiggyBank = styled(PiggyBankIcon)(() => ({
   position: 'relative',
   left: '2.6rem',
   top: '0.2rem',

   '& path': {
      strokeDasharray: '18.56 18.56',
      animation: `${ANIMATE_ICONS} 3.5s infinite linear forwards`,
   },
}))

const StyledCoins = styled(CoinsIcon)(() => ({
   position: 'absolute',
   bottom: '0.8rem',
   left: '3.5rem',
}))

const StyledAiroplaneFirst = styled(AiroplaneIcon)(() => ({
   position: 'absolute',
   left: '1rem',
   top: '8.3rem',
}))

const StyledAiroplaneSecond = styled(AiroplaneIcon)(() => ({
   width: '1.323rem',
   height: '1.128rem',
   position: 'absolute',
   left: '0rem',
   top: '7rem',
}))

const StyledAiroplaneThird = styled(AiroplaneIcon)(() => ({
   width: '0.941rem',
   height: '0.803rem',
   position: 'absolute',
   left: '1rem',
   top: '1.9rem',
}))

const StyledAiroplaneFourth = styled(AiroplaneIcon)(() => ({
   width: '2.145rem',
   height: '1.829rem',
   position: 'absolute',
   left: '3rem',
   top: '2rem',
}))

const StyledAiroplaneFifth = styled(AiroplaneIcon)(() => ({
   width: '0.941rem',
   height: '0.803rem',
   position: 'absolute',
   left: '6.3rem',
   top: '2.3rem',
}))

const StyledAiroplaneSixth = styled(AiroplaneIcon)(() => ({
   width: '0.941rem',
   height: '0.803rem',
   position: 'absolute',
   left: '8.6rem',
   top: '3.3rem',
}))

const StyledAiroplaneSeventh = styled(AiroplaneIcon)(() => ({
   width: '1.195rem',
   height: '1.008rem',
   position: 'absolute',
   left: '9rem',
   top: '1.5rem',
}))

const StyledAiroplaneEighth = styled(AiroplaneIcon)(() => ({
   width: '1.745rem',
   height: '1.488rem',
   position: 'absolute',
   left: '12.2rem',
   top: '2rem',
}))

const StyledAiroplaneNinth = styled(AiroplaneIcon)(() => ({
   width: '0.718rem',
   height: '0.613rem',
   position: 'absolute',
   left: '4.3rem',
   top: '11rem',
}))

const StyledAiroplaneTenth = styled(AiroplaneIcon)(() => ({
   width: '1.323rem',
   height: '1.128rem',
   position: 'absolute',
   left: '9.7rem',
   top: '10.2rem',
}))

const StyledAiroplaneEleventh = styled(AiroplaneIcon)(() => ({
   width: '1.745rem',
   height: '1.488rem',
   position: 'absolute',
   left: '12.7rem',
   top: '9.4rem',
}))

const StyledAiroplaneTwelfth = styled(AiroplaneIcon)(() => ({
   width: '0.941rem',
   height: '0.803rem',
   position: 'absolute',
   left: '0.2rem',
   top: '4rem',
}))

const StyledAiroplaneThirteenth = styled(AiroplaneIcon)(() => ({
   width: '0.718rem',
   height: '0.613rem',
   position: 'absolute',
   right: '3.7rem',
   top: '4rem',
}))

const StyledAiroplaneFourteenth = styled(AiroplaneIcon)(() => ({
   width: '0.941rem',
   height: '0.803rem',
   position: 'absolute',
   right: '3.8rem',
   top: '7rem',
}))

const StyledAiroplaneFifteenth = styled(AiroplaneIcon)(() => ({
   width: '1.745rem',
   height: '0.961rem',
   position: 'absolute',
   left: '7rem',
   top: '9.2rem',
}))
