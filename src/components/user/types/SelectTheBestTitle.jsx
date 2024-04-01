import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, styled } from '@mui/material'
import Radio from '../../UI/Radio'
import Button from '../../UI/buttons/Button'
import { NoData } from '../../../assets/images'
import { PRACTICE_TEST_ACTIONS } from '../../../store/slices/user/practice-test/practiceTestSlice'

const SelectTheBestTitle = ({ questions, nextHandler }) => {
   const [selectedOptionId, setSelectedOptionId] = useState(null)

   const dispatch = useDispatch()

   const options = questions?.optionResponses

   const optionSelectHandler = (id) => setSelectedOptionId(id)

   const onSubmit = () => {
      const answerData = {
         attempts: 0,
         input: '',
         audioFile: '',
         optionId: [selectedOptionId],
         questionID: questions?.questionId,
      }

      dispatch(PRACTICE_TEST_ACTIONS.addCorrectAnswer(answerData))

      nextHandler()

      setSelectedOptionId(null)
   }

   const isDisabled = selectedOptionId === null

   return (
      <StyledContainer>
         {options?.length > 0 ? (
            <Box className="content-box">
               <Box className="correct-answer">
                  <Typography className="title">PASSAGE</Typography>

                  <Typography className="passage">
                     {questions?.passage}
                  </Typography>
               </Box>

               <Box>
                  <Typography className="instruction">
                     Select the best title for the passage
                  </Typography>

                  {options?.map(({ id, optionTitle }) => (
                     <Box
                        key={id}
                        className={`option ${
                           selectedOptionId === id ? 'selected' : ''
                        }`}
                        onClick={() => optionSelectHandler(id)}
                     >
                        <Radio
                           checked={selectedOptionId === id}
                           onClick={() => optionSelectHandler(id)}
                        />

                        <Typography className="title">{optionTitle}</Typography>
                     </Box>
                  ))}

                  <Button
                     className="button"
                     disabled={isDisabled}
                     onClick={onSubmit}
                  >
                     NEXT
                  </Button>
               </Box>
            </Box>
         ) : (
            <img src={NoData} alt="no-data" className="no-data" />
         )}
      </StyledContainer>
   )
}

export default SelectTheBestTitle

const StyledContainer = styled(Box)(({ theme }) => ({
   color: '#4C4859',
   fontFamily: 'Poppins',
   userSelect: 'none',

   '& > .no-data': {
      width: '25rem',
      margin: '0 0 0 15rem',
   },

   '& > .content-box': {
      display: 'flex',

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

      '& > div > .option': {
         display: 'flex',
         width: '24rem',
         border: '1px solid #D4D0D0',
         borderRadius: '8px',
         padding: '0.6rem 1rem 0.6rem 1rem',
         marginLeft: '2rem',
         marginBottom: '1rem',
         cursor: 'pointer',

         '& > .title': {
            width: '19.375rem',
            marginLeft: '1rem',
         },
      },

      '& > div > .selected': {
         background: '#3A10E524',
         borderColor: theme.palette.primary.main,
      },

      '& > div > .button': {
         marginLeft: '17.1rem',
         marginTop: '1rem',
         width: '143px',
      },
   },

   '& > div > .correct-answer': {
      marginTop: '1.8rem',
      border: '1px solid #D4D0D0',
      backgroundColor: '#F7F7F7',
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
      },
   },
}))
