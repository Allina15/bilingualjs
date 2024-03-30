import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import Button from '../../components/UI/buttons/Button'
import ProgressBar from '../../components/UI/ProgressBar'
import TestContainer from '../../components/UI/TestContainer'
import Modal from '../../components/UI/modals/Modal'
import { NoData } from '../../assets/images'
import { ROUTES } from '../../routes/routes'
import { useToggleModal } from '../../hooks/useToogleModal'
import { PRACTICE_TEST_ACTIONS } from '../../store/slices/user/practice-test/practiceTestSlice'
import { PRACTICE_TEST_THUNKS } from '../../store/slices/user/practice-test/practiceTestThunk'
import { QUESTION_COMPONENTS } from '../../utils/constants/QuestionComponents'
import { showNotification } from '../../utils/helpers/notification'

const PracticeTest = () => {
   const { questions } = useSelector((state) => state.practiceTest)

   const [searchParams] = useSearchParams()
   const savedCount = parseInt(searchParams.get('count'), 10) || 0

   const [count, setCount] = useState(savedCount)
   const [warningCount, setWarningCount] = useState(4)

   const { testId } = useParams()

   const dispatch = useDispatch()

   const navigate = useNavigate()

   useEffect(() => {
      dispatch(PRACTICE_TEST_THUNKS.getQuestions({ testId }))
   }, [dispatch, testId])

   useEffect(() => {
      const queryParams = new URLSearchParams()
      queryParams.set('count', count)

      navigate({ search: queryParams.toString() })
   }, [count, navigate])

   const { isOpen, onCloseModal, onOpenModal } =
      useToggleModal('practiceTestModal')

   const quitHandler = () => {
      dispatch(PRACTICE_TEST_ACTIONS.clearCorrectAnswer())
      dispatch(PRACTICE_TEST_ACTIONS.clearCorrectOption())

      navigate(`${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/${testId}`, {
         replace: true,
      })
   }

   const nextHandler = () => setCount((prev) => prev + 1)

   const lastQuestionHandler = () => {
      if (count === questions.length - 1) {
         navigate(
            `${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/${testId}/${ROUTES.USER.PRACTICE_TEST}/${ROUTES.USER.COMPLETE}`,
            { replace: true }
         )
      }
   }

   const timeIsUpHandler = () => {
      const answerDate = {
         attempts: 0,
         input: '',
         audioFile: '',
         optionId: [],
         questionID: questions[count]?.questionId,
      }

      dispatch(PRACTICE_TEST_ACTIONS.addCorrectAnswer(answerDate))

      setCount((prev) => prev + 1)

      lastQuestionHandler()
   }

   useEffect(() => {
      const handleWarning = (e) => {
         if (e.key === 'PrintScreen') {
            e.preventDefault()

            navigator.clipboard.writeText('')

            setWarningCount((prev) => {
               const newCount = prev - 1
               if (newCount >= 0) {
                  showNotification({
                     title: 'Error',
                     message: `You can't take a screenshot! You have ${
                        newCount + 1
                     } tries!`,
                     type: 'error',
                  })
               }

               if (newCount === 0) {
                  dispatch(PRACTICE_TEST_ACTIONS.clearCorrectAnswer())
                  dispatch(PRACTICE_TEST_ACTIONS.clearCorrectOption())

                  navigate(
                     `${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/${testId}`,
                     { replace: true }
                  )
               }
               return newCount
            })
         }
      }

      const handleVisibilityChange = () => {
         if (document.hidden) {
            setWarningCount((prev) => {
               const newCount = prev - 1

               if (newCount >= 0) {
                  showNotification({
                     title: 'Error',
                     message: `You cannot leave the test page. Please complete the test! You have ${newCount} tries!`,
                     type: 'error',
                  })
               }

               if (newCount === 0) {
                  dispatch(PRACTICE_TEST_ACTIONS.clearCorrectAnswer())
                  navigate(
                     `${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/${testId}`,
                     { replace: true }
                  )
               }
               return newCount
            })
         }
      }

      document.addEventListener('keyup', handleWarning)
      document.addEventListener('visibilitychange', handleVisibilityChange)

      return () => {
         document.removeEventListener('keyup', handleWarning)
         document.removeEventListener(
            'visibilitychange',
            handleVisibilityChange
         )
      }
   }, [warningCount, dispatch, navigate, testId])

   useEffect(() => {
      const handleBeforeUnload = (event) => {
         event.preventDefault()
         event.returnValue = ''
      }

      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
         window.removeEventListener('beforeunload', handleBeforeUnload)
      }
   }, [])

   const QuestionComponent = useMemo(() => {
      return questions && questions[count]
         ? QUESTION_COMPONENTS[questions[count].questionType]
         : null
   }, [count, questions])

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
                  nextHandler={
                     count === questions.length - 1
                        ? lastQuestionHandler
                        : nextHandler
                  }
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
   '& > .no-data': {
      width: '30rem',
      margin: '0 0 0 12rem',
   },
}))
