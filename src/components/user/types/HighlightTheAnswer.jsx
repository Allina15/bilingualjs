import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, styled } from '@mui/material'
import Input from '../../UI/Input'
import Button from '../../UI/buttons/Button'
import { NoData } from '../../../assets/images'
import { PRACTICE_TEST_ACTIONS } from '../../../store/slices/user/practice-test/practiceTestSlice'

const HighlightTheAnswer = ({ questions, nextHandler }) => {
   const [highlightAnswer, setHighlightAnswer] = useState('')

   const dispatch = useDispatch()

   const mouseUpHandler = () => {
      const selection = window.getSelection().toString().trim()

      if (selection !== '') setHighlightAnswer(selection)
   }

   const onSubmit = () => {
      const answerData = {
         attempts: 0,
         input: highlightAnswer,
         audioFile: '',
         optionId: [],
         questionID: questions.questionId,
      }

      dispatch(PRACTICE_TEST_ACTIONS.addCorrectAnswer(answerData))

      nextHandler()

      setHighlightAnswer('')
   }

   return (
      <StyledContainer>
         {questions.passage !== '' ? (
            <Box className="content-box">
               <Box className="correct-answer">
                  <Typography className="title">PASSAGE</Typography>

                  <Typography onMouseUp={mouseUpHandler} className="passage">
                     {questions.passage}
                  </Typography>
               </Box>

               <Box>
                  <Typography className="instruction">
                     Click and drag text to highlight the answer to the question
                     below
                  </Typography>

                  <Typography className="question">
                     What did residents think could happen with the new bridge?
                  </Typography>

                  <Input
                     readOnly
                     value={highlightAnswer}
                     multiline
                     placeholder="Highlight text in the passage to set an answer"
                     className={`input ${
                        highlightAnswer.length > 0 ? 'highlighted-input' : ''
                     }`}
                     autoComplete="off"
                  />

                  <Button
                     className="button"
                     disabled={!highlightAnswer}
                     onClick={onSubmit}
                  >
                     NEXT
                  </Button>
               </Box>
            </Box>
         ) : (
            <img src={NoData} alt="no-data" />
         )}
      </StyledContainer>
   )
}

export default HighlightTheAnswer

const StyledContainer = styled(Box)(({ theme }) => ({
   color: '#4C4859',
   fontFamily: 'Poppins',
   userSelect: 'none',

   '& > img': {
      width: '25rem',
      margin: '0 0 0 15rem',
   },

   '& > div > .correct-answer': {
      marginTop: '1.8rem',
      border: '1px solid #D4D0D0',
      borderRadius: '8px',
      width: '31.688rem',

      '& > .title': {
         borderBottom: '1px solid #D4D0D0',
         fontWeight: 500,
         padding: '1rem',
      },

      '& > .passage': {
         marginBottom: '25px',
         fontWeight: 400,
         color: '#5b5867',
         width: '30.438rem',
         padding: '1rem 2rem 2rem 1rem',
         userSelect: 'text',

         '::selection': {
            backgroundColor: '#3A10E52E',
            opacity: '0.3',
         },
      },
   },

   '& > .content-box': {
      display: 'flex',

      '& > div > .button': {
         marginTop: '1rem',
         width: '143px',
         marginLeft: '16.1rem',
      },

      '& >  div > .instruction': {
         width: '24.375rem',
         marginTop: '1.8rem',
         fontSize: '22px',
         padding: '0 0 1rem 2rem',
      },

      '& > div > .question': {
         padding: '0 0 1rem 2rem',
         width: '23.5rem',
      },

      '& > div > .input': {
         '.MuiOutlinedInput-root': {
            width: '23rem',
            margin: '0 0 1rem 2rem',
            fontFamily: 'Poppins',
            fontSize: '14px',
            height: '2.875rem',
            backgroundColor: '#F7F7F7',
            borderRadius: '8px',
            outline: 'none',

            '&:focus': {
               outline: 'none',
            },
         },
      },

      '& > div > .highlighted-input': {
         height: 'auto',

         '.MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#FFFCFC',
            padding: '0.8rem',
            height: 'auto',
         },

         '& > div > .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
         },
      },
   },
}))
