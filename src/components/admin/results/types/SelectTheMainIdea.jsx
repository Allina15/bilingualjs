import { useEffect } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { ANSWERS_THUNKS } from '../../../../store/slices/admin/answers/answersThunk'
import TestQuestion from '../../../UI/TestQuestion'
import Button from '../../../UI/buttons/Button'
import Radio from '../../../UI/Radio'

const SelectTheMainIdea = () => {
   const { answers, isLoading } = useSelector((state) => state.answersSlice)

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(ANSWERS_THUNKS.getAnswers({ answerId: 2 }))
   }, [dispatch])

   return (
      <TestQuestion {...answers[0]} isLoading={isLoading}>
         <StyledContainer>
            <Box className="passage-box">
               <Typography className="title">Passage:</Typography>

               <Typography className="passage">
                  {answers[0]?.passage}
               </Typography>
            </Box>

            <Box className="admin-options-box">
               {answers[0]?.questionOptionResponses?.map(
                  ({ optionId, optionTitle, isCorrectOption }, index) => (
                     <Box key={optionId} className="option">
                        <Typography className="number">{index + 1} </Typography>

                        <Typography>{optionTitle}</Typography>

                        <Radio checked={isCorrectOption} className="radio" />
                     </Box>
                  )
               )}
            </Box>

            <Typography className="user-answer">User`s Answer </Typography>

            <Box className="user-options-box">
               {answers[0]?.userOptionResponses?.map(
                  ({ optionId, number, optionTitle }) => (
                     <Box key={optionId} className="option">
                        <Typography className="number">{number}</Typography>

                        <Typography>{optionTitle}</Typography>
                     </Box>
                  )
               )}
            </Box>

            <Box className="buttons-box">
               <Button variant="secondary">GO BACK</Button>
               <Button variant="primary">SAVE</Button>
            </Box>
         </StyledContainer>
      </TestQuestion>
   )
}

export default SelectTheMainIdea

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

      '& >.title': {
         fontWeight: 500,
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
   },
}))
