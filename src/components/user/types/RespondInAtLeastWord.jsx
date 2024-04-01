import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, styled } from '@mui/material'
import Button from '../../UI/buttons/Button'
import { NoData } from '../../../assets/images'
import {
   ScrollBottomArrowIcon,
   ScrollTopArrowIcon,
} from '../../../assets/icons'
import { PRACTICE_TEST_ACTIONS } from '../../../store/slices/user/practice-test/practiceTestSlice'
import { countWords } from '../../../utils/helpers'

const RespondInAtLeastWord = ({ questions, nextHandler }) => {
   const [text, setText] = useState('')

   const dispatch = useDispatch()

   const changeTextHandler = (e) => setText(e.target.value)

   const wordsCount = countWords(text)

   const onSubmit = () => {
      const answerDate = {
         attempts: 0,
         input: text,
         audioFile: '',
         optionId: [],
         questionID: questions?.questionId,
      }

      dispatch(PRACTICE_TEST_ACTIONS.addCorrectAnswer(answerDate))

      nextHandler()

      setText()
   }

   const isDisabled = wordsCount < questions?.attempts

   return (
      <StyledContainer>
         {questions?.statement !== '' ? (
            <>
               <Typography className="title">
                  Respond to the question in at least {questions?.attempts}
                  words
               </Typography>

               <Box className="content-box">
                  <Typography className="question">
                     {questions?.statement}
                  </Typography>

                  <Box>
                     <textarea
                        name="text"
                        value={text}
                        onChange={changeTextHandler}
                        placeholder="Your response"
                        className="text-area"
                        onPaste={(e) => e.preventDefault()}
                     />
                     <Typography
                        className={`${
                           wordsCount >= questions?.attempts
                              ? 'highlight-word'
                              : 'word-length'
                        }`}
                     >
                        Word: {wordsCount}
                     </Typography>
                  </Box>
               </Box>

               <Box className="line" />

               <Button
                  disabled={isDisabled}
                  className="button"
                  onClick={onSubmit}
               >
                  NEXT
               </Button>
            </>
         ) : (
            <img src={NoData} alt="no-data" className="no-data" />
         )}
      </StyledContainer>
   )
}

export default RespondInAtLeastWord

const StyledContainer = styled(Box)(({ theme }) => ({
   color: '#4C4859',
   userSelect: 'none',

   '& > .no-data': {
      width: '25rem',
      margin: '0 0 0 15rem',
   },

   '& > .title': {
      fontFamily: 'Poppins',
      fontWeight: 300,
      fontSize: '28px',
      textAlign: 'center',
      marginTop: '2rem',
      marginBottom: '2.5rem',
   },

   '& > .button': {
      marginLeft: '47.5rem',
      width: '143px',
   },

   '& > .content-box': {
      display: 'flex',
      justifyContent: 'space-between',

      '& > .question': {
         width: '20.563rem',
         fontSize: '18px',
      },

      '& > div > .highlight-word': {
         color: theme.palette.primary.main,
      },

      '& > div > .word-length': {
         color: '#AFAFAF',
      },

      '& > div > .text-area': {
         width: '23.875rem',
         height: '11.438rem',
         fontFamily: 'Poppins',
         fontWeight: 300,
         padding: '1rem',
         resize: 'none',
         borderRadius: '8px',
         border: '1.53px solid #D4D0D0',
         outline: 'none',
         caretColor: theme.palette.primary.main,

         '&::placeholder': {
            color: '#AFAFAF',
            fontSize: '16px',
            fontFamily: 'Arial',
            paddingTop: '0.299rem',
         },

         ' &::-webkit-scrollbar': {
            backgroundColor: '#F0F0F0',
            borderRadius: '0 6px 6px 0',
            width: '8px',
         },

         '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#C4C4C4',
            borderRadius: '5px',
            cursor: 'pointer',
         },

         '&::-webkit-scrollbar-button': {
            display: 'block',
            height: '10px',
         },

         '&::-webkit-scrollbar-button:start:decrement': {
            background: `url(${ScrollTopArrowIcon}) no-repeat`,
            backgroundPosition: 'center 3px',
            cursor: 'pointer',
         },

         '&::-webkit-scrollbar-button:end:increment': {
            background: `url(${ScrollBottomArrowIcon}) no-repeat`,
            transform: 'rotate(180deg)',
            backgroundPosition: 'center -1px',
            cursor: 'pointer',
         },
      },
   },

   '& > .line': {
      marginTop: '4rem',
      marginBottom: '2rem',
      borderBottom: '1.53px solid #D4D0D0',
   },
}))
