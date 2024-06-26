import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import Radio from '../../../UI/Radio'
import Button from '../../../UI/buttons/Button'

const ResultSelectTheMainIdea = ({ saveHandler, isDisabled }) => {
   const { answer } = useSelector((state) => state.answer)

   const navigate = useNavigate()

   const navigateHandler = () => navigate(-1)

   return (
      <StyledContainer>
         <Box className="passage-box">
            <Typography className="title">Passage:</Typography>

            <Typography className="passage">{answer?.passage}</Typography>
         </Box>

         <Box className="admin-options-box">
            {answer?.questionOptionResponses?.map(
               ({ optionId, optionTitle, isCorrectOption, number }) => (
                  <Box key={optionId} className="option">
                     <Typography className="number">{number}</Typography>

                     <Typography>{optionTitle}</Typography>

                     <Radio checked={isCorrectOption} className="radio" />
                  </Box>
               )
            )}
         </Box>

         <Typography className="user-answer">User`s Answer </Typography>

         <Box className="user-options-box">
            {answer?.userOptionResponses?.map(({ optionId, optionTitle }) => {
               const selectedOption = answer?.questionOptionResponses?.find(
                  (questionOption) => questionOption.optionTitle === optionTitle
               )

               return (
                  <Box key={optionId} className="option">
                     <Typography className="number">
                        {selectedOption ? selectedOption.number : ''}
                     </Typography>

                     <Typography>{optionTitle}</Typography>
                  </Box>
               )
            })}
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

export default ResultSelectTheMainIdea

const StyledContainer = styled(Box)(() => ({
   color: '#4C4859',
   fontFamily: 'Poppins',
   fontWeight: 300,

   '& > .user-answer': {
      fontWeight: 500,
      fontSize: '18px',
      marginTop: '1.4rem',
   },

   '& > .passage-box': {
      display: 'flex',
      gap: '0.4rem',
      marginTop: '1.4rem',

      '& > .title': {
         fontWeight: 600,
      },

      '& > .passage': {
         width: '832px',
      },
   },

   '& > .admin-options-box': {
      gap: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      margin: '2rem 0 2rem 0',

      '& > .option': {
         border: '1.8px solid #BDBDBD',
         display: 'flex',
         alignItems: 'flex-start',
         justifyContent: 'space-between',
         borderRadius: '8px',
         paddingLeft: '1rem',
         width: '100%',
         height: 'auto',
         color: '#4C4859',
         fontFamily: 'Poppins',
         fontSize: '14px',
         padding: '0.6rem 2rem 0.6rem 2rem',

         '& > .radio': {
            marginLeft: 'auto',
         },

         '& > .number': {
            marginLeft: '-2rem',
            padding: '0 1rem',
         },
      },
   },

   '& > .user-options-box': {
      width: '100%',
      gap: '1rem',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: '1rem 0 2rem 0',

      '& > .option': {
         border: '1.8px solid #BDBDBD',
         display: 'flex',
         alignItems: 'flex-start',
         borderRadius: '8px',
         paddingLeft: '1rem',
         width: '100%',
         height: 'auto',
         color: '#4C4859',
         fontFamily: 'Poppins',
         fontSize: '14px',
         padding: '0.6rem 2rem 0.6rem 2rem',

         '& > .number': {
            marginLeft: '-2rem',
            padding: '0 1rem',
         },
      },
   },

   '& > .buttons-box': {
      gap: '0 1rem',
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '2rem',
   },
}))
