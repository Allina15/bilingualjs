import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, InputLabel, TextField, Typography, styled } from '@mui/material'
import { QUESTION_THUNKS } from '../../../store/slices/admin/question/questionThunk'
import { QUESTION_TITLES } from '../../../utils/constants'
import { ROUTES } from '../../../routes/routes'
import Loading from '../../Loading'
import Button from '../../UI/buttons/Button'
import Input from '../../UI/Input'

const HighlightTheAnswer = ({
   title,
   setTitle,
   duration,
   selectType,
   setDuration,
   setSelectType,
}) => {
   const { question, isLoading } = useSelector((state) => state.question)

   const { state } = useLocation()

   const [text, setText] = useState('')
   const [statement, setStatement] = useState('')
   const [answerValue, setAnswerValue] = useState('')

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const { testId } = useParams()

   const mouseUpHandler = () => setAnswerValue(window.getSelection().toString())

   const changeTextHandler = (e) => {
      const { value } = e.target

      setText(value || '')
   }

   const changeQuestionHandler = (e) => {
      const { value } = e.target

      setStatement(value || '')
   }

   const navigateGoBackHandler = () =>
      navigate(
         `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/${testId}`
      )

   useEffect(() => {
      if (state !== null) {
         dispatch(QUESTION_THUNKS.getQuestion({ id: state?.id }))
      }
   }, [dispatch, state])

   useEffect(() => {
      if (state !== null && question) {
         setAnswerValue(question?.correctAnswer)
         setText(question?.passage)
         setStatement(question?.statement)
      }
   }, [state, question])

   const isDisabled =
      isLoading ||
      (!state &&
         (!selectType ||
            !duration ||
            duration < 1 ||
            !title?.trim() ||
            !answerValue?.trim() ||
            !statement?.trim())) ||
      (title?.trim() === question?.title &&
         duration === question?.duration &&
         answerValue === question?.correctAnswer &&
         statement?.trim() === question?.statement &&
         text?.trim() === question?.passage) ||
      !duration ||
      duration < 1

   const isDisabledUpdate = !statement && !text && !answerValue

   const onSubmit = () => {
      if (
         selectType !== '' &&
         +duration !== 0 &&
         title !== '' &&
         text !== '' &&
         statement !== ''
      ) {
         const requestData = {
            title: title.trim(),
            duration: +duration,
            statement: statement.trim(),
            passage: text.trim(),
            correctAnswer: answerValue.trim(),
         }

         if (state === null) {
            dispatch(
               QUESTION_THUNKS.addTest({
                  requestData,

                  data: {
                     testId,
                     questionType: QUESTION_TITLES.HIGHLIGHTS_THE_ANSWER,
                     navigate,
                  },

                  setStates: {
                     setSelectType: setSelectType(selectType),
                     setTitle: setTitle(title),
                     setDuration: setDuration(duration),
                  },
               })
            )
         } else {
            const requestData = {
               title: title.trim(),
               duration: +duration,
               statement: statement.trim(),
               passage: text.trim(),
               correctAnswer: answerValue.trim(),
               optionRequest: [],
            }

            dispatch(
               QUESTION_THUNKS.updateQuestion({
                  id: state.id,
                  testId,
                  requestData,
                  navigate,
               })
            )
         }
      }
   }

   return (
      <StyledContainer>
         {state !== null ? isLoading && <Loading /> : null}

         <Box>
            <Typography className="title">Questions to the Passage</Typography>

            <Input
               fullWidth
               name="question"
               value={statement || ''}
               onChange={changeQuestionHandler}
               autoComplete="off"
            />
         </Box>

         <Box className="passage">
            <InputLabel className="title">Passage</InputLabel>

            <TextField
               multiline
               name="text"
               value={text || ''}
               onChange={changeTextHandler}
               fullWidth
            />
         </Box>

         <Box className="correct-answer">
            <Typography className="title">Highlight correct answer:</Typography>

            <Typography className="highlight-text" onMouseUp={mouseUpHandler}>
               {text || ''}
            </Typography>
         </Box>

         <Box className="buttons">
            <Button variant="secondary" onClick={navigateGoBackHandler}>
               GO BACK
            </Button>

            <Button
               variant="primary"
               disabled={isDisabled || isDisabledUpdate}
               onClick={onSubmit}
            >
               {state !== null ? 'UPDATE' : 'SAVE'}
            </Button>
         </Box>
      </StyledContainer>
   )
}

export default HighlightTheAnswer

const StyledContainer = styled(Box)(({ theme }) => ({
   width: '820px',

   '& > div > .title': {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#4C4859',
      fontFamily: 'Poppins',
      marginBottom: '8px',
      marginTop: '1.4rem',
   },

   '& > .passage': {
      marginTop: '1.6rem',

      '& > div > .MuiOutlinedInput-root': {
         borderRadius: '8px',
         fontWeight: 400,
         color: '#5b5867',

         '& > .Mui-focused fieldset': {
            border: `1px solid ${theme.palette.primary.main}`,
         },

         '&:hover fieldset': {
            border: `1px solid ${theme.palette.primary.main}`,
         },
      },
   },

   '& > .correct-answer': {
      marginTop: '1.8rem',
      marginBottom: '2rem',

      '& > .highlight-text': {
         marginBottom: '25px',
         fontWeight: 400,
         color: '#5b5867',

         '::selection': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
         },
      },
   },

   '& > .buttons': {
      display: 'flex',
      gap: '1.1rem',
      position: 'relative',
      right: '-35.5rem',

      '& > .MuiButton-root ': {
         width: '118px',
      },
   },
}))
