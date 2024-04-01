import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import Button from '../../../UI/buttons/Button'

const ResultDescribeImage = ({ isDisabled, saveHandler }) => {
   const { answer } = useSelector((state) => state.answer)

   const { fileUrl, correctAnswer, userAnswer } = answer

   const navigate = useNavigate()

   const navigateHandler = () => navigate(-1)

   return (
      <StyledContainer>
         <Box className="admin-answers-box">
            <Box>
               <img src={fileUrl} alt="portrayal" />
            </Box>

            <Typography className="correct-answer">Correct Answer:</Typography>

            <Typography>{correctAnswer}</Typography>
         </Box>

         <Typography className="user-answer">User`s Answer </Typography>

         <Box className="user-answers-box">
            <Typography className="user-title">Entered Statement:</Typography>

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

export default ResultDescribeImage

const StyledContainer = styled(Box)(() => ({
   color: '#4C4859',
   fontFamily: 'Poppins',
   fontWeight: 300,

   '& > .user-answer': {
      fontWeight: 500,
      fontSize: '18px',
      marginTop: '1.4rem',
   },

   '& > .admin-answers-box': {
      gap: '0.4rem',
      display: 'flex',
      alignItems: 'center',
      margin: '2rem 0 2rem 0',

      '& > div > img': {
         width: '181.59px',
         height: '177.39px',
         borderRadius: '8px',
         cursor: 'pointer',

         '&:hover': {
            filter: 'brightness(0.6)',
            transition: 'transform 0.3s ease',
         },
      },

      '& > .correct-answer': {
         marginLeft: '1rem',
         fontWeight: 600,
      },
   },

   '& > .user-answers-box': {
      width: '100%',
      gap: '0.4rem',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: '1rem 0 1rem 0',

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
