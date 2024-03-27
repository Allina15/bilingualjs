import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Howl, Howler } from 'howler'
import { Box, Typography, styled } from '@mui/material'
import Button from '../../../UI/buttons/Button'
import { SmallPauseIcon, SmallPlayIcon } from '../../../../assets/icons'

const RecordSayingStatement = ({ isDisabled, saveHandler }) => {
   const { answers } = useSelector((state) => state.answersSlice)

   const navigate = useNavigate()

   const [isPlaying, setIsPlaying] = useState(false)

   const { audioFile, correctAnswer } = answers

   const navigateHandler = () => navigate(-1)

   const stopSoundHandler = () => {
      Howler.stop()
      setIsPlaying(false)
   }

   const startSoundHandler = () => {
      if (!isPlaying) {
         stopSoundHandler()
      }

      const sound = new Howl({
         src: audioFile,
         html5: true,
         onend: () => setIsPlaying(false),
         onstop: () => setIsPlaying(false),
         onplay: () => setIsPlaying(true),
      })
      sound.play()

      setIsPlaying(true)
   }

   return (
      <StyledContainer>
         <Box className="answers-box">
            <Button
               className={isPlaying ? 'stop-button' : 'play-button'}
               onClick={isPlaying ? stopSoundHandler : startSoundHandler}
               icon={
                  isPlaying ? (
                     <SmallPlayIcon className="icon" />
                  ) : (
                     <SmallPauseIcon className="icon" />
                  )
               }
            >
               {isPlaying ? 'STOP RECORDED AUDIO' : 'PLAY AUDIO'}
            </Button>

            <Box className="correct-answer">
               <Typography>Correct Answer:</Typography>

               <Typography>{correctAnswer}</Typography>
            </Box>
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

export default RecordSayingStatement

const StyledContainer = styled(Box)(() => ({
   color: '#4C4859',
   fontFamily: 'Poppins',
   fontWeight: 300,

   '& > .user-answer': {
      fontWeight: 500,
      fontSize: '18px',
      marginTop: '1.4rem',
   },

   '& > .answers-box': {
      gap: '0.4rem',
      display: 'flex',
      alignItems: 'center',
      margin: '2rem 0 2rem 0',

      '& > .stop-button': {
         display: 'flex',
         alignItems: 'center',

         '& > span > .icon': {
            margin: '-8px 5px 0 0',
            width: '24px',
            height: '24px',

            '& > path': {
               stroke: 'white',
               strokeWidth: '2px',
            },

            '& > rect': {
               fill: 'white',
               strokeWidth: '2px',
            },
         },
      },

      '& > .play-button': {
         display: 'flex',
         alignItems: 'center',
         width: '155px',

         '& > span > .icon': {
            margin: '-8px 5px 0 0',
            width: '24px',
            height: '24px',

            '& > path': {
               stroke: 'white',
               strokeWidth: '2px',
            },

            '& > rect': {
               fill: 'white',
               strokeWidth: '2px',
            },
         },
      },

      '& > .correct-answer': {
         display: 'flex',
         gap: '0.4rem',
         marginLeft: '1rem',
      },
   },

   '& > .buttons-box': {
      gap: '0 1rem',
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '2rem',
   },
}))
