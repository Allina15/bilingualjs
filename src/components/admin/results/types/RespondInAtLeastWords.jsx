import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import Button from '../../../UI/buttons/Button'

const RespondInAtLeastWords = ({ isDisabled, saveHandler }) => {
   const { answer } = useSelector((state) => state.answer)

   const navigate = useNavigate()

   const countWords = (text) => {
      const wordsArray = text.split(' ').filter((word) => word !== '')

      return wordsArray?.length
   }

   const wordsCount = answer.userAnswer ? countWords(answer.userAnswer) : 0

   const navigateHandler = () => navigate(-1)

   return (
      <StyledContainer>
         <Typography className="user-answer">User`s Answer </Typography>

         <Box className="user-options-box">
            <Typography className="respond">Respond:</Typography>

            <Typography className="user-answer">{answer.userAnswer}</Typography>
         </Box>

         <Typography>Number of words: {wordsCount}</Typography>

         <Box className="buttons-box">
            <Button variant="secondary" onClick={navigateHandler}>
               GO BACK
            </Button>

            <Button
               variant="primary"
               onClick={saveHandler}
               disabled={isDisabled}
            >
               SAVE
            </Button>
         </Box>
      </StyledContainer>
   )
}

export default RespondInAtLeastWords

const StyledContainer = styled(Box)(({ theme }) => ({
   color: '#4C4859',
   fontFamily: 'Poppins',

   '& > .user-answer': {
      fontWeight: 500,
      fontSize: '18px',
      marginTop: '1.4rem',
   },

   '& > .user-options-box': {
      width: '100%',
      gap: '0.5rem',
      display: 'flex',
      margin: '0.8rem 0 0.7rem 0',

      '& > .user-answer': {
         color: theme.palette.primary.main,
      },

      '& > .respond': {
         fontWeight: 600,
      },
   },

   '& > .buttons-box': {
      gap: '0 1rem',
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '2rem',
   },
}))
