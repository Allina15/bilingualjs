import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Howl, Howler } from 'howler'
import { Box, Typography, styled } from '@mui/material'
import Button from '../../UI/buttons/Button'
import { NoData } from '../../../assets/images'
import { AnimationSoundIcon, CheckIcon, SoundIcon } from '../../../assets/icons'
import { PRACTICE_TEST_ACTIONS } from '../../../store/slices/user/practice-test/practiceTestSlice'

const ListenAndSelectWord = ({ questions, nextHandler }) => {
   const options = questions?.optionResponses

   const [optionState, setOptionState] = useState({})

   const dispatch = useDispatch()

   const stopSoundHandler = (id) => {
      Howler.stop()

      setOptionState((prevState) => ({
         ...prevState,
         [id]: { ...prevState[id], isPlaying: false },
      }))
   }

   const startSoundHandler = (fileUrl, id) => {
      stopSoundHandler(id)

      const sound = new Howl({
         src: fileUrl,
         html5: true,
         onend: () => {
            setOptionState((prevState) => ({
               ...prevState,
               [id]: { ...prevState[id], isPlaying: false },
            }))
         },

         onplay: () => {
            setOptionState((prevState) => ({
               ...prevState,
               [id]: { ...prevState[id], isPlaying: true },
            }))
         },

         onstop: () => {
            setOptionState((prevState) => ({
               ...prevState,
               [id]: { ...prevState[id], isPlaying: false },
            }))
         },
      })
      sound.play()

      setOptionState((prevState) => ({
         ...prevState,
         [id]: { ...prevState[id], howl: sound, isPlaying: true },
      }))
   }

   const toggleCheckboxHandler = (id) => {
      setOptionState((prev) => {
         const isChecked = !prev?.[id]?.isChecked

         const newState = {
            ...prev,
            [id]: {
               id,
               isChecked,
            },
         }

         return newState
      })
   }

   const onSubmit = () => {
      const selectedOptions = Object.values(optionState)?.filter(
         (option) => option.isChecked
      )

      const answerData = {
         attempts: 0,
         input: '',
         audioFile: '',
         optionId: selectedOptions?.map((option) => option.id),
         questionID: questions?.questionId,
      }
      dispatch(PRACTICE_TEST_ACTIONS.addCorrectAnswer(answerData))

      nextHandler()

      dispatch(PRACTICE_TEST_ACTIONS.clearCorrectOption())
   }

   const isDisabled = !Object.values(optionState)?.find(
      (option) => option.isChecked
   )

   return (
      <StyledContainer>
         {options?.length > 0 ? (
            <>
               <Typography className="title">
                  Select the real English words in this list
               </Typography>

               <Box className="options-box">
                  {options?.map(({ id, fileUrl, optionTitle }) => (
                     <Box
                        key={id}
                        className={`option ${
                           optionState[id]?.isChecked ? 'selected' : ''
                        }`}
                     >
                        {optionState[id]?.isPlaying ? (
                           <AnimationSoundIcon
                              onClick={() => stopSoundHandler(id)}
                              className="animation-sound"
                           />
                        ) : (
                           <SoundIcon
                              onClick={() => startSoundHandler(fileUrl, id)}
                              className="sound"
                           />
                        )}
                        <Typography className="text">{optionTitle}</Typography>
                        <Box
                           className={`checkbox ${
                              optionState[id]?.isChecked ? 'checked' : ''
                           }`}
                           onClick={() => toggleCheckboxHandler(id)}
                        >
                           <CheckIcon />
                        </Box>
                     </Box>
                  ))}
               </Box>

               <Box className="line" />

               <Button
                  className="button"
                  disabled={isDisabled}
                  onClick={onSubmit}
               >
                  NEXT
               </Button>
            </>
         ) : (
            <img src={NoData} alt="no-data" className="no-data" />
         )}
      </StyledContainer>
   )
}

export default ListenAndSelectWord

const StyledContainer = styled(Box)(({ theme }) => ({
   userSelect: 'none',

   '& > .no-data': {
      width: '25rem',
      margin: '0 0 0 15rem',
   },

   '& > .options-box': {
      width: '820px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.8rem 5.4rem',
      marginLeft: '3rem',
   },

   '&  > .title': {
      fontFamily: 'Poppins',
      fontWeight: 300,
      fontSize: '28px',
      textAlign: 'center',
      marginTop: '2rem',
      marginBottom: '2.5rem',
   },

   '& > .line': {
      marginTop: '4rem',
      marginBottom: '2rem',
      borderBottom: '1.53px solid #D4D0D0',
   },

   '& > .button': {
      marginLeft: '47.5rem',
      width: '143px',
   },

   '& >  div > .selected': {
      border: `1.53px solid ${theme.palette.primary.main} !important`,
   },

   '& > div > .option': {
      display: 'flex',
      width: '13rem',
      border: '1.53px solid #D4D0D0',
      borderRadius: '8px',
      alignItems: 'center',
      justifyContent: 'space-between',

      '& > .text': {
         marginLeft: '-2rem',
      },

      '& > .sound': {
         cursor: 'pointer',
         marginLeft: '1rem',
      },

      '& > .animation-sound': {
         cursor: 'pointer',
         marginTop: '-2px',
         marginLeft: '1rem',
      },

      '& > .checked': {
         backgroundColor: theme.palette.primary.main,
         width: '30px',
         height: '100%',
         borderRadius: ' 0 8px 8px 0 ',
         borderLeft: `1.53px solid ${theme.palette.primary.main} !important`,

         '& > svg > path': {
            fill: 'white !important',
         },
      },

      '& > .checkbox': {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         borderLeft: '1.53px solid #D4D0D0',
         cursor: 'pointer',
         height: '2.625rem',
         maxHeight: '10rem',
         width: '2.894rem',

         '& > svg': {
            width: '30px',
            height: '30px',

            '& > path': {
               fill: '#D4D0D0',
            },
         },
      },
   },
}))
