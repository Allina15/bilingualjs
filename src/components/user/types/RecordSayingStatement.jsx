import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { RecordingIcon, SpeakManIcon } from '../../../assets/icons'
import { PRACTICE_TEST_ACTIONS } from '../../../store/slices/user/practiceTestSlice'
import { showNotification } from '../../../utils/helpers/notification'
import Button from '../../UI/buttons/Button'
import { NoData } from '../../../assets/images'

const RecordSayingStatement = ({ questions, nextHandler }) => {
   const [array, setArray] = useState(null)
   const [analyser, setAnalyser] = useState(null)
   const [myElements, setMyElements] = useState([])
   const [isRecording, setIsRecording] = useState(false)
   const [recordedAudio, setRecordedAudio] = useState(null)
   const [mediaRecorder, setMediaRecorder] = useState(null)
   const [showNextButton, setShowNextButton] = useState(false)

   const dispatch = useDispatch()

   const num = 18
   const width = 7

   useEffect(() => {
      const handleClick = () => {
         if (analyser) return

         const audioContext = new AudioContext()
         const newAnalyser = audioContext.createAnalyser()

         setAnalyser(newAnalyser)

         navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
               const src = audioContext.createMediaStreamSource(stream)

               src.connect(newAnalyser)
            })
            .catch((error) => {
               showNotification({
                  message: 'Something went wrong',
                  type: error,
               })

               window.location.reload()
            })
      }

      window.onclick = handleClick

      return () => {
         window.onclick = null
      }
   }, [analyser])

   useEffect(() => {
      if (analyser) {
         const newArray = new Uint8Array(num * 2)

         setArray(newArray)
      }
   }, [analyser])

   useEffect(() => {
      if (analyser && array) {
         const loop = () => {
            window.requestAnimationFrame(loop)

            analyser.getByteFrequencyData(array)

            const elements = []
            for (let i = 0; i < num; i += 1) {
               const height = array[i + num]

               elements.push({
                  height,
                  opacity: 0.008 * height,
                  key: Math.random(),
               })
            }

            setMyElements(elements)
         }

         loop()
      }
   }, [analyser, array])

   const startRecordingHandler = () => {
      setIsRecording(true)
      setShowNextButton(false)

      navigator.mediaDevices
         .getUserMedia({ audio: true })
         .then((stream) => {
            const mediaRecorderInstance = new MediaRecorder(stream)
            const chunks = []

            mediaRecorderInstance.addEventListener('dataavailable', (event) => {
               chunks.push(event.data)
            })

            mediaRecorderInstance.addEventListener('stop', () => {
               const blob = new Blob(chunks, { type: 'audio/mp3' })
               const url = URL.createObjectURL(blob)

               setRecordedAudio(url)
            })

            setMediaRecorder(mediaRecorderInstance)

            mediaRecorderInstance.start()
         })
         .catch((error) => {
            showNotification({ message: 'Something went wrong', type: error })
         })
   }

   const stopRecordingHandler = () => {
      setIsRecording(false)
      setShowNextButton(true)

      mediaRecorder.stop()
   }

   const onSubmit = () => {
      const answerData = {
         attempts: 0,
         input: '',
         audioFile: recordedAudio,
         optionId: [],
         questionID: questions.questionId,
      }

      dispatch(PRACTICE_TEST_ACTIONS.addCorrectAnswer(answerData))

      setMediaRecorder()

      nextHandler()
   }

   return (
      <Container>
         {questions.statement !== '' ? (
            <Box className="styled-container">
               <Box>
                  <Box className="record-saying-title">
                     <Typography className="title">
                        Record yourself saying the statement below:
                     </Typography>
                     <Box className="block">
                        <SpeakManIcon className="speak" />
                        <Typography>{questions.statement}</Typography>
                     </Box>
                  </Box>
                  <Box className="container-button">
                     {isRecording && <RecordingIcon />}
                     {isRecording ? (
                        <Box className="block-of-visualize">
                           {myElements.map((element) => (
                              <AudioVisualize
                                 key={element.key}
                                 element={element}
                                 widthpx={width}
                              />
                           ))}
                        </Box>
                     ) : null}
                     <Box>
                        {!showNextButton && (
                           <Button
                              onClick={
                                 isRecording
                                    ? stopRecordingHandler
                                    : startRecordingHandler
                              }
                           >
                              {!isRecording ? 'RECORD NOW' : 'STOP RECORDING'}
                           </Button>
                        )}

                        {showNextButton && (
                           <Button onClick={onSubmit} disabled={!mediaRecorder}>
                              NEXT
                           </Button>
                        )}
                     </Box>
                  </Box>
               </Box>
            </Box>
         ) : (
            <img src={NoData} alt="no-data" />
         )}
      </Container>
   )
}

export default RecordSayingStatement

const Container = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',

   '& > .styled-container': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',

      '& .block': {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         gap: '1rem',
         marginBottom: '2.3rem',

         '& > .speak': {
            width: '7.5rem',
            height: '7.5rem',
            cursor: 'pointer',
            transition: '0.3s',
            marginTop: '1.5rem',
         },
      },
      '& .record-saying-title': {
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',

         '& > .title': {
            fontFamily: 'Poppins',
            fontSize: '1.75rem',
            color: '#4C4859',
            width: '100%',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'center',
         },
      },

      '& .container-button': {
         width: '95%',
         display: 'flex',
         justifyContent: 'end',
         alignItems: 'center',
         marginTop: '3.75rem',
         borderTop: '0.0956rem solid #D4D0D0',
         gap: '10rem',
         marginLeft: '1.5rem',
         padding: '2rem 0',
         height: '7rem',

         '& > .block-of-visualize': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         },
      },
      '& .audio': {
         marginRight: '9rem',
         width: '7.875rem',
         height: '3.75rem',
      },
   },
}))

const AudioVisualize = styled(Box)(({ widthpx, element }) => ({
   borderRadius: '30px',
   margin: '0.125rem',
   background: 'blue',
   width: `${widthpx}px`,
   height: `${Math.min(element.height, 90)}px`,
   opacity: element.opacity,
   marginRight: '2px',
}))
