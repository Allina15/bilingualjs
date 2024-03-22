import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { CompleteIcon, LogoIcon } from '../../assets/icons'
import ConfettiAnimation from '../../components/ConfettiAnimation'
import TestContainer from '../../components/UI/TestContainer'
import Button from '../../components/UI/buttons/Button'
import { PRACTICE_TEST_THUNKS } from '../../store/slices/user/practiceTestThunk'
import { PRACTICE_TEST_ACTIONS } from '../../store/slices/user/practiceTestSlice'
import { ROUTES } from '../../routes/routes'

const TestComplete = () => {
   const { correctAnswer } = useSelector((state) => state.practiceTest)

   const [showConfetti, setShowConfetti] = useState(false)

   const { testId } = useParams()

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const doneButtonClickHandler = () => setShowConfetti(true)

   useEffect(() => {
      doneButtonClickHandler()

      const timeout = setTimeout(() => {
         setShowConfetti(false)
      }, 6000)

      return () => clearTimeout(timeout)
   }, [])

   const navigateHandler = () => {
      dispatch(PRACTICE_TEST_ACTIONS.clearCorrectAnswer())

      navigate(`${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/${testId}`)
   }

   const onSubmit = () => {
      dispatch(PRACTICE_TEST_THUNKS.addAnswer({ correctAnswer, navigate }))
      dispatch(PRACTICE_TEST_ACTIONS.clearCorrectAnswer())
   }

   return (
      <TestContainer>
         <StyledContainer active={showConfetti.toString()}>
            <Box className="title-box">
               <Typography className="title">Test is complete!</Typography>

               <CompleteIcon />
            </Box>

            <Box className="content-box">
               <LogoIcon className="icon" />

               <Typography className="message">
                  Your results were sent for evaluation process. <br />
                  After evaluation your results will be sent to your email.
               </Typography>
            </Box>

            <Box className="buttons-box">
               <Button
                  variant="secondary"
                  className="try-again"
                  onClick={navigateHandler}
               >
                  TRY AGAIN
               </Button>

               <Button className="done" onClick={onSubmit}>
                  DONE
               </Button>
            </Box>

            <Box className="confetti-wrapper">
               <ConfettiAnimation active={showConfetti} />
            </Box>
         </StyledContainer>
      </TestContainer>
   )
}

export default TestComplete

const StyledContainer = styled(Box)(({ active }) => ({
   fontFamily: 'Poppins',

   '& > .title-box': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',

      '& > .title': {
         fontWeight: 400,
         fontSize: '28px',
         color: '#4C4859',
      },
   },

   '& > .content-box': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      borderBottom: '1.53px solid #D4D0D0',

      '& > .icon': {
         marginTop: '52px',
         marginBottom: '26px',
         maarginRight: '46%',
         width: '113.66px',
         height: '100px',
      },

      '& > .message': {
         fontStyle: 'normal',
         fontWeight: 400,
         fontSize: '18px',
         lineHeight: '130%',
         textAlign: 'center',
         color: '#4C4859',
         paddingBottom: '60px',
      },
   },

   '& > .buttons-box': {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2rem',

      '& > .done, .try-again': {
         width: '9.25rem',
      },
   },

   '& .confetti-wrapper': {
      opacity: active === 'true' ? 0 : 1,
      transition: 'opacity 7s ease-in-out',
   },
}))
