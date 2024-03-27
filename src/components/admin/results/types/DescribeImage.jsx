import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import Button from '../../../UI/buttons/Button'

const DescribeImage = ({ isDisabled, saveHandler }) => {
   const { answers } = useSelector((state) => state.answersSlice)

   const { fileUrl, correctAnswer, userAnswer } = answers

   const navigate = useNavigate()

   const navigateHandler = () => navigate(-1)

   return (
      <StyledContainer>
         <Box className="admin-answers-box">
            <Box>
               <img src={fileUrl} alt="img" />
            </Box>

            <Typography className="correct-answer">Correct Answer:</Typography>

            <Typography>{correctAnswer}</Typography>
         </Box>

         <Typography className="user-answer">User`s Answer </Typography>

         <Box className="user-answers-box">
            <Typography>Entered Statement:</Typography>

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

export default DescribeImage

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
      },
   },

   '& > .user-answers-box': {
      width: '100%',
      gap: '0.4rem',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: '1rem 0 1rem 0',
   },

   '& > .buttons-box': {
      gap: '0 1rem',
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '2rem',
   },
}))
