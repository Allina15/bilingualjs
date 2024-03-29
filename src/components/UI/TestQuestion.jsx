import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import TestContainer from './TestContainer'
import Loading from '../Loading'
import Input from './Input'
import { ANSWERS_THUNKS } from '../../store/slices/admin/answers/answersThunk'
import { ADMIN_QUESTION_COMPONENTS } from '../../utils/constants/AdminQuestionComponents'
import { QUESTION_TITLES } from '../../utils/constants'
import { questionTypeHandler } from '../../utils/helpers'
import { showNotification } from '../../utils/helpers/notification'

const TestQuestion = () => {
   const { answers, isLoading } = useSelector((state) => state.answersSlice)

   const { answerId } = useParams()

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const [scoreValue, setScoreValue] = useState('')

   const {
      score,
      fullName,
      duration,
      testTitle,
      statement,
      questionType,
      questionTitle,
      questionAttempts,
   } = answers

   const changeScoreValueHandler = (e) => setScoreValue(e.target.value)

   useEffect(() => {
      dispatch(ANSWERS_THUNKS.getAnswers({ answerId }))
   }, [dispatch])

   const saveHandler = () => {
      if (answers.status !== 'EVALUATED') {
         dispatch(ANSWERS_THUNKS.postResult({ answerId, scoreValue, navigate }))
      } else {
         showNotification({
            type: 'error',
            message: 'This test has already been evaluated.',
         })
      }
   }

   const QuestionComponent = ADMIN_QUESTION_COMPONENTS[questionType]

   const changeValueHandler = (e) => {
      const value = parseInt(e.target.value, 10)

      if (value > 10) {
         e.target.value = 10
      }
   }

   const hours = Math.floor(duration / 60)

   const minutes = duration % 60

   const formattedDuration = ` ${hours}:${minutes < 10 ? '0' : ''}${minutes}`

   const isDisabled = !scoreValue

   return (
      <TestContainer>
         <StyledContainer>
            {isLoading && <Loading />}

            <Box>
               <Box className="title-box">
                  <Box className="titles">
                     <Typography className="title">User:</Typography>
                     <Typography>{fullName}</Typography>
                  </Box>

                  <Box className="titles">
                     <Typography className="title">Test:</Typography>
                     <Typography>{testTitle}</Typography>
                  </Box>
               </Box>

               <Typography className="test-question">Test Question</Typography>

               <Box>
                  <Box className="test-questions">
                     <Typography className="title">Question Title:</Typography>
                     <Typography>{questionTitle}</Typography>
                  </Box>

                  <Box className="test-questions">
                     <Typography className="title">
                        Duration (in minutes):
                     </Typography>

                     <Typography>{formattedDuration}</Typography>
                  </Box>

                  <Box className="test-questions">
                     <Typography className="title">Question Type:</Typography>

                     <Typography>
                        {questionTypeHandler(questionType)}
                     </Typography>
                  </Box>

                  {questionType === QUESTION_TITLES.TYPE_WHAT_YOU_HEAR && (
                     <Box className="test-questions">
                        <Typography className="title">
                           Mimimum number of words:
                        </Typography>

                        <Typography>{questionAttempts}</Typography>
                     </Box>
                  )}

                  {questionType === QUESTION_TITLES.RECORD_SAYING && (
                     <Box className="test-questions">
                        <Typography className="title">Statement:</Typography>
                        <Typography>{statement}</Typography>
                     </Box>
                  )}

                  {questionType ===
                     QUESTION_TITLES.RESPOND_IN_AT_LEAST_N_WORDS && (
                     <Box className="test-questions">
                        <Typography className="title">
                           Question Statement:
                        </Typography>

                        <Typography>{statement}</Typography>
                     </Box>
                  )}
               </Box>
            </Box>

            <Box className="evaluation">
               <Typography className="test-question">Evaluation</Typography>

               <Box className="score-box">
                  <Typography className="score">Score:</Typography>

                  {questionType === QUESTION_TITLES.SELECT_MAIN_IDEA ||
                  questionType === QUESTION_TITLES.SELECT_THE_BEST_TITLE ||
                  questionType === QUESTION_TITLES.SELECT_REAL_ENGLISH_WORD ||
                  questionType === QUESTION_TITLES.LISTEN_AND_SELECT_WORD ? (
                     <Typography className="number">{score}</Typography>
                  ) : (
                     <Typography className="score">(1-10)</Typography>
                  )}
               </Box>

               {questionType === QUESTION_TITLES.SELECT_MAIN_IDEA ||
               questionType === QUESTION_TITLES.SELECT_THE_BEST_TITLE ||
               questionType === QUESTION_TITLES.SELECT_REAL_ENGLISH_WORD ||
               questionType ===
                  QUESTION_TITLES.LISTEN_AND_SELECT_WORD ? null : (
                  <Input
                     className="input"
                     type="number"
                     inputProps={{ min: 1, max: 10 }}
                     autoComplete="off"
                     onInput={changeValueHandler}
                     value={scoreValue}
                     onChange={changeScoreValueHandler}
                  />
               )}
            </Box>
         </StyledContainer>

         {QuestionComponent && (
            <QuestionComponent
               answers={answers[answerId]}
               isDisabled={isDisabled}
               answerId={answerId}
               saveHandler={saveHandler}
            />
         )}
      </TestContainer>
   )
}

export default TestQuestion

const StyledContainer = styled(Box)(({ theme }) => ({
   color: '#4C4859',
   fontFamily: 'Poppins',
   display: 'flex',
   justifyContent: 'space-between',

   '& .skeleton-box': {
      backgroundColor: '#e5e5e567',
      marginBottom: '6px',
   },

   '& > div > .title-box': {
      display: 'flex',
      flexDirection: 'column',
      margin: '0 0 3rem 0 ',

      '& > .titles': {
         display: 'flex',
         gap: '0.5rem',
      },
   },

   '& > div > .test-question': {
      fontWeight: 500,
      fontSize: '18px',
      marginBottom: '0.6rem',
   },

   '& > div > div > div > .title': {
      fontWeight: 500,
      color: '#3752B4',
   },

   '& > div > div > .test-questions': {
      display: 'flex',
      gap: '0.5rem',
   },

   '& > .evaluation': {
      marginTop: '5.9rem',

      '& > .score-box': {
         display: 'flex',

         '& > .score': {
            fontWeight: 500,
            color: '#3752B4',
            marginTop: '-0.7rem',
         },

         '& > .number': {
            marginTop: '-0.7rem',
            marginLeft: '0.2rem',
            color: '#2AB930',
            fontWeight: 'bold',
         },
      },

      '& > .input': {
         width: '5.875rem',
         currentColor: theme.palette.primary.main,
         marginTop: '0.3rem',

         '& > .MuiOutlinedInput-root': {
            height: '46px',
         },

         '& div > .MuiOutlinedInput-input[type="number"]::-webkit-inner-spin-button':
            {
               display: 'none',
            },
      },
   },
}))
