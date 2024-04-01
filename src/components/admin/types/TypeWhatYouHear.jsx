import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Box, InputLabel, Typography, styled } from '@mui/material'
import Input from '../../UI/Input'
import Button from '../../UI/buttons/Button'
import Loading from '../../Loading'
import { PauseIcon, PlayIcon } from '../../../assets/icons'
import { QUESTION_ACTIONS } from '../../../store/slices/admin/question/questionSlice'
import { QUESTION_THUNKS } from '../../../store/slices/admin/question/questionThunk'
import { ROUTES } from '../../../routes/routes'
import { QUESTION_TITLES } from '../../../utils/constants'

const TypeWhatYouHear = ({
   title,
   duration,
   setTitle,
   selectType,
   setDuration,
   setSelectType,
}) => {
   const { fileUrl, isLoading, question } = useSelector(
      (state) => state.question
   )

   const [file, setFile] = useState('')
   const [fileName, setFileName] = useState('')
   const [attempts, setAttempts] = useState(1)
   const [isPlaying, setIsPlaying] = useState(false)
   const [correctAnswer, setCorrectAnswer] = useState('')

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const audioRef = useRef(null)

   const { testId } = useParams()

   const { state } = useLocation()

   useEffect(() => {
      if (state !== null) {
         dispatch(QUESTION_THUNKS.getQuestion({ id: state?.id }))
      }
   }, [dispatch, state])

   useEffect(() => {
      const parts = question?.fileUrl?.split('/')

      if (state !== null && question && parts) {
         setCorrectAnswer(question?.correctAnswer)
         setAttempts(question?.attempts)
         setFile(question?.fileUrl)
         setFileName(parts[parts.length - 1])

         audioRef.current.src = question?.fileUrl
      }
   }, [state, question])

   const changeAttemptsHandler = (e) => {
      let newValue = e.target.value.replace(/\D/g, '')

      newValue = newValue.slice(0, 2)

      const value = parseInt(newValue, 10)
      if (value > 15) newValue = '15'

      setAttempts(newValue)

      if (
         value === 0 ||
         newValue === '' ||
         state?.duration === value.toString()
      ) {
         dispatch(QUESTION_ACTIONS.changeIsdisabled(true))
      } else dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
   }

   const correctAnswerChangeHandler = (e) => {
      setCorrectAnswer(e.target.value || '')
   }

   const toggleHandler = () => {
      if (isPlaying) {
         audioRef.current.pause()
      } else {
         audioRef.current.play()
      }

      setIsPlaying(!isPlaying)
   }

   const changeFileHandler = (e) => {
      const file = e.target.files[0]

      if (file) {
         setFile(file)

         const reader = new FileReader()

         reader.readAsDataURL(file)

         setFileName(file.name)
         setIsPlaying(false)

         audioRef.current.src = URL.createObjectURL(file)

         dispatch(QUESTION_THUNKS.addFile(file))
      }
   }

   const endedHandler = () => setIsPlaying(false)

   const onSubmit = () => {
      if (
         selectType !== '' &&
         +duration !== 0 &&
         title !== '' &&
         correctAnswer !== '' &&
         file !== '' &&
         +attempts !== 0
      ) {
         const requestData = {
            title: title.trim(),
            duration: +duration,
            correctAnswer: correctAnswer.trim(),
            attempts,
            fileUrl,
         }

         if (state === null) {
            dispatch(
               QUESTION_THUNKS.addTest({
                  requestData,

                  data: {
                     testId,
                     questionType: QUESTION_TITLES?.TYPE_WHAT_YOU_HEAR,
                     navigate,
                  },

                  setStates: {
                     setSelectType: setSelectType(selectType),
                     setTitle: setTitle(title),
                     setDuration: setDuration(duration),
                  },
               })
            )
         } else {
            const requestData = {
               title: title.trim(),
               duration: +duration,
               correctAnswer: correctAnswer.trim(),
               optionRequest: [],
               attempts,
               fileUrl,
            }

            dispatch(
               QUESTION_THUNKS.updateQuestion({
                  id: state?.id,
                  testId,
                  requestData,
                  navigate,
               })
            )
         }
      }
   }

   const navigateGoBackHandler = () => {
      navigate(
         `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/${testId}`
      )
   }

   const isDisabled =
      isLoading ||
      (!state &&
         (!selectType ||
            !duration ||
            duration < 1 ||
            !title?.trim() ||
            !file ||
            !attempts ||
            !correctAnswer?.trim())) ||
      (title?.trim() === question?.title &&
         duration === question?.duration &&
         file === question?.fileUrl &&
         attempts === question?.attempts &&
         correctAnswer?.trim() === question?.correctAnswer) ||
      !duration ||
      duration < 1 ||
      !attempts
   return (
      <StyledContainer>
         {state !== null ? isLoading && <Loading /> : null}

         <Box className="content">
            <Box className="replays">
               <InputLabel>
                  Number off <br />
                  Replays
               </InputLabel>

               <Input
                  className="input-replays"
                  type="number"
                  name="attempts"
                  inputProps={{ min: 0, max: 15 }}
                  value={attempts || ''}
                  onChange={changeAttemptsHandler}
                  autoComplete="off"
               />
            </Box>

            <Box className="file">
               <InputLabel htmlFor="filedInput" className="label">
                  <Button type="button" component="span">
                     {file ? 'REPLACE' : 'UPPLOAD'}
                  </Button>
               </InputLabel>

               <input
                  type="file"
                  id="filedInput"
                  name="fileUrl"
                  accept="audio/mp3, .wav"
                  onChange={changeFileHandler}
               />

               {file && (
                  <button
                     type="button"
                     onClick={toggleHandler}
                     className="playing"
                  >
                     {isPlaying ? <PlayIcon /> : <PauseIcon />}
                  </button>
               )}

               <Typography variant="span" className="file-name">
                  {fileName}
               </Typography>

               <audio
                  className="audio"
                  ref={audioRef}
                  type="audio/mp3, .wav"
                  controls
                  onEnded={endedHandler}
               >
                  <track
                     src="captions_en.vtt"
                     kind="captions"
                     label="english_captions"
                  />
               </audio>
            </Box>
         </Box>

         <Box>
            <InputLabel>Correct Answer</InputLabel>

            <Input
               type="text"
               name="correctAnswer"
               value={correctAnswer || ''}
               onChange={correctAnswerChangeHandler}
               autoComplete="off"
            />
         </Box>

         <Box className="buttons">
            <Button variant="secondary" onClick={navigateGoBackHandler}>
               GO BACK
            </Button>

            <Button
               variant="primary"
               onClick={onSubmit}
               disabled={isDisabled}
               isLoading={isLoading}
               loadingColor="secondary"
            >
               {state !== null ? 'UPDATE' : 'SAVE'}
            </Button>
         </Box>
      </StyledContainer>
   )
}

export default TypeWhatYouHear

const StyledContainer = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   marginTop: '2rem',
   gap: '1rem',
   width: '820px',
   color: '#4C4859',
   overflow: 'hidden',

   '& > .content': {
      display: 'flex',
      gap: '2rem',

      '& > .replays': {
         display: 'table-column',

         '& > .input-replays': {
            '& > .MuiOutlinedInput-root': {
               padding: '.75rem  0.7rem .75rem 0.7rem ',
               width: '4.5rem',
               height: '2.5rem',
               textAlign: 'center',
               fontSize: '1.2rem',
            },
         },
      },

      '& > div > .file-name': {
         fontFamily: 'Arial',
         maxWidth: '20rem',
      },

      '& div > .MuiOutlinedInput-input[type="number"]::-webkit-inner-spin-button':
         {
            display: 'none',
         },

      '& > .input-file': {
         border: 'none',
      },

      '& > .file': {
         marginTop: '2.11111rem',
         display: 'flex',
         gap: '1rem',
         alignItems: 'center',

         '&  > .label': {
            fontFamily: 'Poppins',
            fontWeight: '600',
            cursor: 'pointer',
            color: 'inherit',
            marginTop: '0.8rem',
         },

         '& > input': {
            display: 'none',
         },

         '& > .playing': {
            border: 'none',
            backgroundColor: 'white',
            marginTop: '0.1rem',
            cursor: 'pointer',
         },

         '& > .audio': {
            display: 'none',
         },
      },
   },

   '& div > .MuiInputLabel-root': {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '16px',
      color: '#4B4759',
      marginBottom: '15px',
   },

   '& > .buttons': {
      display: 'flex',
      gap: '1.1rem',
      position: 'relative',
      right: '-35.4rem',

      '& > .MuiButton-root ': {
         width: '118px',
      },
   },
}))
