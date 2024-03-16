import { useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { GradientListenerIcon } from '../../../assets/icons'
import Button from '../../UI/buttons/Button'
import TextArea from '../../UI/TextArea'
import { PRACTICE_TEST_ACTIONS } from '../../../store/slices/user/practiceTestSlice'

const TypeWhatYouHear = ({ questions, nextHandler }) => {
   const [description, setDescription] = useState('')
   const [isPlaying, setIsPlaying] = useState(false)
   const [replays, setReplays] = useState(questions.attempts)

   const soundRef = useRef(null)

   const dispatch = useDispatch()

   const textAreaHandler = (e) => setDescription(e.target.value)

   const soundHandler = () => {
      if (questions.fileUrl && replays > 0) {
         if (isPlaying) {
            soundRef.current.pause()

            setIsPlaying(false)
         } else {
            soundRef.current.play()

            setIsPlaying(true)
         }
      }
   }

   const handleEnd = () => {
      setIsPlaying(false)

      if (replays > 0) {
         setReplays((prevReplays) => prevReplays - 1)
      }
   }

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
         <Box className="main-content">
            <Typography className="title">
               Type the statement you hear
            </Typography>

            <audio
               ref={soundRef}
               className="audio"
               type="audio/mp3"
               onEnded={handleEnd}
            >
               <track kind="captions" srcLang="english" />

               <source src={questions.fileUrl} type="audio/mp3" />
            </audio>

            <Box className="content">
               <GradientListenerIcon
                  className={`listener ${replays === 0 ? 'disabled' : ''}`}
                  onClick={soundHandler}
               />

               <Box className="description">
                  <TextArea
                     className="text-area"
                     placeholder="Your response"
                     rows={5}
                     value={description}
                     handleChange={textAreaHandler}
                  />

                  <Typography
                     className={replays !== 0 ? 'replays' : 'attempts'}
                  >
                     {!replays
                        ? 'Your attempts are over !'
                        : `Number of replays left: ${replays}`}
                  </Typography>
               </Box>
            </Box>
         </Box>

         <Box className="container-button">
            <Button disabled={!description} onClick={onSubmit}>
               NEXT
            </Button>
         </Box>
      </StyledContainer>
   )
}

export default TypeWhatYouHear

const StyledContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',

   '& > .main-content': {
      width: '91.5%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 0 0 0 ',

      '& > .title': {
         fontFamily: 'Poppins',
         fontWeight: 400,
         fontSize: '1.75rem',
         color: '#4C4859',
      },

      '& > .audio': {
         display: 'none',
      },

      '& > .content': {
         width: '100%',
         display: 'flex',
         alignItems: 'center',
         marginLeft: '10rem',

         '& > .listener': {
            width: '5.5rem',
            height: '5.5rem',
            cursor: 'pointer',
            transition: '0.3s',

            '&:hover': {
               transform: 'scale(1.06)',
               path: {
                  stroke: theme.palette.background.paper,
               },
            },

            '&:active': {
               path: {
                  stroke: theme.palette.grey[600],
               },
            },
         },

         '& > .disabled': {
            opacity: '0.3',
         },

         '& > .description': {
            width: '81.98%',
            marginTop: '2.5rem',
            marginLeft: '7rem',

            '& > .text-area': {
               width: '30rem',
               height: '100%',
               fontFamily: 'Poppins',

               '& .MuiInputBase-root': {
                  fontFamily: 'Poppins',
                  borderRadius: '0.5rem',
               },
            },

            '& > .replays': {
               width: '49%',
               height: '1.25rem',
               marginTop: '0.5rem',
               fontFamily: 'Poppins',
               fontWeight: '400',
               fontSize: '1rem',
               color: '#AFAFAF',
            },

            '& > .attempts': {
               width: '49%',
               height: '1.25rem',
               marginTop: '0.5rem',
               fontFamily: 'Poppins',
               fontWeight: '400',
               fontSize: '1rem',
               color: 'red',
            },
         },
      },
   },

   '& > .container-button': {
      width: '91.5%',
      display: 'flex',
      justifyContent: 'end',
      marginTop: '3.75rem',
      borderTop: '0.0956rem solid #D4D0D0',
      padding: '2rem 0 0 0 ',

      '& .MuiButtonBase-root': {
         padding: '12px 54px',
      },
   },
}))
