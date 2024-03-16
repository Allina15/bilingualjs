import { useEffect } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { ANSWERS_THUNKS } from '../../../../store/slices/admin/answers/answersThunk'
import TestQuestion from '../../../UI/TestQuestion'
import Option from '../../../UI/Option'
import Button from '../../../UI/buttons/Button'

const SelectRealEnglishWords = () => {
   const { answers, isLoading } = useSelector((state) => state.answersSlice)

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(ANSWERS_THUNKS.getAnswers({ answerId: 4 }))
   }, [dispatch])

   return (
      <TestQuestion {...answers[0]} isLoading={isLoading}>
         <StyledContainer>
            <Box className="admin-options-box">
               {answers[0]?.questionOptionResponses?.map((option, index) => (
                  <Option
                     key={option.optionId}
                     index={index}
                     option={option}
                     deletion={false}
                     checked
                  />
               ))}
            </Box>

            <Typography className="user-answer">User`s Answer </Typography>

            <Box className="user-options-box">
               {answers[0]?.userOptionResponses?.map(
                  ({ optionId, optionTitle }) => (
                     <Box key={optionId} className="option">
                        {optionTitle}
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

export default SelectRealEnglishWords

const StyledContainer = styled(Box)(() => ({
   color: '#4C4859',
   fontFamily: 'Poppins',

   '& > .user-answer': {
      fontWeight: 500,
      fontSize: '18px',
   },

   '& > .admin-options-box': {
      gap: '1rem',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: '2rem 0 2rem 0',

      '& > .option': {
         width: '240px',
         height: '46px',
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
         alignItems: 'center',
         borderRadius: '8px',
         paddingLeft: '1rem',
         flexWrap: 'wrap',
         width: '171px',
         height: '46px',
         color: '#4C4859',
         fontFamily: 'Poppins',
         fontSize: '14px',
      },
   },

   '& > .buttons-box': {
      gap: '0 1rem',
      display: 'flex',
      justifyContent: 'flex-end',
   },
}))
