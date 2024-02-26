import { useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, TextField, Typography, styled } from '@mui/material'
import { QUESTION_ACTIONS } from '../../../store/slice/admin/questionSlice'
import { questionTitle } from '../../../utils/helpers/questionTitle'
import { QUESTION_THUNK } from '../../../store/slice/admin/questionThunk'
import Input from '../../../components/UI/Input'
import Button from '../../../components/UI/buttons/Button'

const HighlightTheAnswer = ({
   duration,
   setDuration,
   selectType,
   title,
   setTitle,
   setSelectType,
}) => {
   const [answerValue, setAnswerValue] = useState('')

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const { testId } = useParams()

   const formik = useFormik({
      initialValues: {
         question: '',
         text: '',
      },
   })

   const saveTestQuestion = () => {
      if (selectType !== '' && +duration !== +'' && title !== '') {
         dispatch(QUESTION_ACTIONS.clearOptions())

         setSelectType('')
         setTitle('')
         setDuration('')
         setAnswerValue('')

         const requestData = {
            title: title.trim(),
            duration: +duration * 60,
            statement: formik.values.question.trim(),
            passage: formik.values.text.trim(),
            correctAnswer: answerValue.trim(),
         }

         dispatch(
            QUESTION_THUNK.saveTest({
               requestData,
               data: {
                  testId,
                  questionType: questionTitle('HIGHLIGHTS_THE_ANSWER'),
                  navigate,
               },
            })
         )
      }
   }

   return (
      <StyledContainer onSubmit={formik.handleSubmit}>
         <Typography className="title">Questions to the Passage</Typography>

         <Input
            fullWidth
            name="question"
            value={formik.values.question}
            onChange={formik.handleChange}
         />

         <Box className="passage">
            <Typography className="title">Passage</Typography>

            <TextField
               multiline
               name="text"
               value={formik.values.text}
               onChange={formik.handleChange}
               fullWidth
            />
         </Box>

         <Box className="correct-answer">
            <Typography className="title">Highlight correct answer:</Typography>

            <Typography
               className="highlight-text"
               onMouseUp={() =>
                  setAnswerValue(window.getSelection().toString())
               }
            >
               {formik.values.text}
            </Typography>
         </Box>

         <Box className="buttons">
            <Button variant="secondary" onClick={() => navigate(-1)}>
               GO BACK
            </Button>

            <Button
               variant="primary"
               disabled={
                  !selectType ||
                  !duration ||
                  !title.trim() ||
                  !answerValue ||
                  formik.values.question.trim() === ''
               }
               onClick={saveTestQuestion}
            >
               SAVE
            </Button>
         </Box>
      </StyledContainer>
   )
}

export default HighlightTheAnswer

const StyledContainer = styled(Box)(({ theme }) => ({
   width: '820px',

   '& .title': {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#4C4859',
      fontFamily: 'Poppins',
      marginBottom: '8px',
      marginTop: '1.4rem',
   },

   '& > .passage': {
      marginTop: '1.6rem',

      '& .MuiOutlinedInput-root': {
         borderRadius: '8px',
         fontWeight: 400,
         color: '#5b5867',

         '&.Mui-focused fieldset': {
            border: `1.53px solid ${theme.palette.primary.main}`,
         },

         '&:hover fieldset': {
            border: `1px solid ${theme.palette.primary.main}`,
         },
      },
   },

   '& > .correct-answer': {
      marginTop: '1.8rem',
      marginBottom: '2rem',

      '& .highlight-text': {
         marginBottom: '25px',
         fontWeight: 400,
         color: '#5b5867',

         '::selection': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
         },
      },
   },

   '& .buttons': {
      display: 'flex',
      gap: '1.1rem',
      marginLeft: '37.4rem',
   },
}))
