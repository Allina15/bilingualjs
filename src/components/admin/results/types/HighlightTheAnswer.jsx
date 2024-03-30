import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import Button from '../../../UI/buttons/Button'

const HighlightTheAnswer = ({ isDisabled, saveHandler }) => {
   const { answer } = useSelector((state) => state.answer)

   const { passage, correctAnswer, userAnswer, statement } = answer

   const navigate = useNavigate()

   const navigateHandler = () => navigate(-1)

   return (
      <StyledContainer>
         <Box className="admin-answers-box">
            <Typography className="passage-title">Passage:</Typography>

            <Typography className="passage">{passage}</Typography>
         </Box>

         <Box className="admin-answers-box">
            <Typography className="question-statement">
               Question Statement:
            </Typography>

            <Typography className="statement">{statement}</Typography>
         </Box>

         <Box className="admin-answers-box">
            <Typography className="answer">Correct Answer:</Typography>

            <Typography className="correct-answer">{correctAnswer}</Typography>
         </Box>

         <Typography className="user-answer">User`s Answer </Typography>

         <Box className="user-answers-box">
            <Typography className="user-title">Respond:</Typography>

            <Typography>{userAnswer}</Typography>
         </Box>

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

export default HighlightTheAnswer

const StyledContainer = styled(Box)(({ theme }) => ({
   color: '#4C4859',
   fontFamily: 'Poppins',
   fontWeight: 300,

   '& > .user-answer': {
      fontSize: '18px',
      marginTop: '1.4rem',
   },

   '& > .admin-answers-box': {
      gap: '0.3rem',
      display: 'flex',
      margin: '0.8rem 0 0.7rem 0',

      '& > .passage-title': {
         fontWeight: 600,
      },

      '& > .passage': {
         marginBottom: '1rem',
      },

      '& > .correct-answer': {
         color: theme.palette.primary.main,
         width: '785px',
         marginLeft: '-2.5rem',
         marginBottom: '1rem',
      },

      '& > .answer': {
         width: '10rem',
         fontWeight: 600,
      },

      '& > .question-statement': {
         margin: '0.6rem 0 1rem 0',
         fontWeight: 600,
      },

      '& > .statement': {
         margin: '0.6rem 1rem 0.6rem 0',
      },
   },

   '& > .user-answers-box': {
      width: '100%',
      gap: '0.5rem',
      display: 'flex',
      margin: '0.8rem 0 0.7rem 0',

      '& > .user-title': {
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
