/* eslint-disable radix */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import TestContainer from '../../components/UI/TestContainer'
import ProgressBar from '../../components/UI/ProgressBar'
import Button from '../../components/UI/buttons/Button'
import Modal from '../../components/UI/modals/Modal'
import { NoData } from '../../assets/images'
import { useToggleModal } from '../../hooks/useToogleModal'
import { ROUTES } from '../../routes/routes'
import { PRACTICE_TEST_ACTIONS } from '../../store/slices/user/practiceTestSlice'
import { PRACTICE_TEST_THUNKS } from '../../store/slices/user/practiceTestThunk'
import { QUESTION_COMPONENTS } from '../../utils/constants/questionComponents'

const PracticeTest = () => {
   const { questions } = useSelector((state) => state.practiceTest)

   const { testId } = useParams()

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const [searchParams] = useSearchParams()

   const savedCount = parseInt(searchParams.get('count')) || 1

   const [count, setCount] = useState(savedCount)

   useEffect(() => {
      dispatch(PRACTICE_TEST_THUNKS.getAllQuestions({ testId }))
   }, [dispatch, testId])

   useEffect(() => {
      const queryParams = new URLSearchParams()

      queryParams.set('count', count)

      navigate({ search: queryParams.toString() })
   }, [count, navigate])

   const { isOpen, onCloseModal, onOpenModal } = useToggleModal('modal')

   const quitHandler = () => {
      dispatch(PRACTICE_TEST_ACTIONS.clearCorrectAnswer())
      navigate(`${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/${testId}`)
   }

   useEffect(() => {
      dispatch(PRACTICE_TEST_THUNKS.getAllQuestions({ testId }))
   }, [dispatch, testId])

   const QuestionComponent = QUESTION_COMPONENTS[questions[count]?.questionType]

   const nextHandler = () => setCount((prevCount) => prevCount + 1)

   const lastQuestion = count === questions.length - 1

   const timeIsUpHandler = () => {
      const answerDate = {
         attempts: 0,
         input: '',
         audioFile: '',
         optionId: [],
         questionID: questions[count]?.questionId,
      }

      dispatch(PRACTICE_TEST_ACTIONS.addCorrectAnswer(answerDate))

      setCount((prevCount) => prevCount + 1)

      if (lastQuestion) {
         navigate(
            `${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/${testId}/${ROUTES.USER.PRACTICE_TEST}/${ROUTES.USER.COMPLETE}`
         )
      }
   }

   const lastQuestionHandler = () => {
      if (lastQuestion) {
         navigate(
            `${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/${testId}/${ROUTES.USER.PRACTICE_TEST}/${ROUTES.USER.COMPLETE}`
         )
      }
   }

   return (
      <StyledContainer>
         <Box className="quit-container">
            <Button variant="secondary" className="quit" onClick={onOpenModal}>
               QUIT TEST
            </Button>
         </Box>

         <TestContainer>
            <ProgressBar
               duration={questions[count]?.duration}
               timeIsUp={timeIsUpHandler}
               count={count}
            />

            {QuestionComponent ? (
               <QuestionComponent
                  questions={questions[count]}
                  nextHandler={lastQuestion ? lastQuestionHandler : nextHandler}
               />
            ) : (
               <img src={NoData} alt="no-data" className="no-data" />
            )}
         </TestContainer>

         <Modal isVisible={isOpen} handleIsVisible={onCloseModal}>
            <Box className="quit-content">
               <Typography className="text">
                  Are you sure you want to leave your practice test?
               </Typography>

               <Box className="buttons">
                  <Button
                     variant="secondary"
                     onClick={quitHandler}
                     className="button"
                  >
                     QUIT TEST
                  </Button>

                  <Button onClick={onCloseModal}>CONTINUE TEST</Button>
               </Box>
            </Box>
         </Modal>
      </StyledContainer>
   )
}

export default PracticeTest

const StyledContainer = styled(Box)(({ theme }) => ({
   '& > .quit-container': {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: '2rem 2rem -3rem 0',

      '& > .quit': {
         color: '#4C4C4C',
         fontWeight: '700',
         border: '0.125rem solid #4C4859',

         '&:hover': {
            borderColor: theme.palette.primary.main,
            background: theme.palette.primary.main,
            color: theme.palette.primary.white,
         },
      },
   },

   '& .no-data': {
      width: '30rem',
      margin: '0 0 0 12rem',
   },
}))
