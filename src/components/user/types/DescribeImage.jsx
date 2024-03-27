import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, styled } from '@mui/material'
import Button from '../../UI/buttons/Button'
import TextArea from '../../UI/TextArea'
import { PRACTICE_TEST_ACTIONS } from '../../../store/slices/user/practiceTestSlice'
import { NoData } from '../../../assets/images'

const DescribeImage = ({ questions, nextHandler }) => {
   const [description, setDescription] = useState('')

   const dispatch = useDispatch()

   const changeDescriptionHandler = (e) => setDescription(e.target.value)

   const onSubmit = () => {
      const answerData = {
         attempts: 0,
         input: description,
         audioFile: '',
         optionId: [],
         questionID: questions.questionId,
      }

      dispatch(PRACTICE_TEST_ACTIONS.addCorrectAnswer(answerData))

      nextHandler()

      setDescription('')
   }

   return (
      <StyledContainer>
         {questions.fileUrl !== '' ? (
            <>
               <Box className="content-box">
                  <Typography className="title">
                     Write one or more sentences that describe the image
                  </Typography>

                  <Box className="image-box">
                     <img src={questions.fileUrl} alt="img" className="image" />

                     <TextArea
                        className="text-area"
                        placeholder="Your response"
                        value={description}
                        rows={6}
                        handleChange={changeDescriptionHandler}
                     />
                  </Box>
               </Box>

               <Box className="button-box">
                  <Button
                     className="button"
                     disabled={!description}
                     onClick={onSubmit}
                  >
                     NEXT
                  </Button>
               </Box>
            </>
         ) : (
            <img src={NoData} alt="no-data" className="no-data" />
         )}
      </StyledContainer>
   )
}

export default DescribeImage

const StyledContainer = styled(Box)(() => ({
   color: '#4C4859',

   '& > .no-data': {
      width: '25rem',
      margin: '0 0 0 15rem',
   },

   '& > .content-box': {
      width: '78.72%',
      height: 'auto',
      boxSizing: 'border-box',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      '& > .title': {
         textAlign: 'center',
         width: '100%',
         fontSize: '28px',
         marginTop: '2rem',
      },

      '& > div > .text-area': {
         width: '30rem',
         fontFamily: 'Poppins',

         '& .MuiInputBase-root': {
            fontFamily: 'Poppins',
            borderRadius: '0.5rem',
         },
      },

      '& > .image-box': {
         width: '37.125rem',
         height: 'auto',
         display: 'flex',
         gap: '5.05%',
         marginTop: '50px',

         '& > .image': {
            width: '11.375rem',
            backgroundPosition: 'center',
            borderRadius: '2px',
         },
      },
   },

   '& > .button-box': {
      borderTop: '1.53px solid #D4D0D0',
      marginTop: '3rem',

      '& > .button': {
         marginLeft: '84%',
         marginTop: '1.8rem',
         width: '143px',
      },
   },
}))
