import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, styled } from '@mui/material'
import Button from '../../UI/buttons/Button'
import { RecordingIcon, SpeakManIcon } from '../../../assets/icons'
import { NoData } from '../../../assets/images'
import { showNotification } from '../../../utils/helpers/notification'
import { PRACTICE_TEST_ACTIONS } from '../../../store/slices/user/practice-test/practiceTestSlice'
import { PRACTICE_TEST_THUNKS } from '../../../store/slices/user/practice-test/practiceTestThunk'

const RecordSayingStatement = ({ questions, nextHandler }) => {
   const { fileUrl, isLoading } = useSelector((state) => state.practiceTest)

   const [array, setArray] = useState(null)
   const [stream, setStream] = useState(null)
   const [analyser, setAnalyser] = useState(null)
   const [myElements, setMyElements] = useState([])
   const [isRecording, setIsRecording] = useState(false)
   const [mediaRecorder, setMediaRecorder] = useState(null)
   const [showNextButton, setShowNextButton] = useState(false)

   const dispatch = useDispatch()
   const num = 18
   const width = 7

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

      const audioContext = new window.AudioContext()
      const newAnalyser = audioContext.createAnalyser()

      setAnalyser(newAnalyser)

      navigator.mediaDevices
         .getUserMedia({ audio: true, video: false })
         .then((stream) => {
            setStream(stream)

            const mediaRecorderInstance = new MediaRecorder(stream)
            const src = audioContext.createMediaStreamSource(stream)

            src.connect(newAnalyser)

            const chunks = []

            mediaRecorderInstance.addEventListener('dataavailable', (event) => {
               chunks.push(event.data)
            })

            mediaRecorderInstance.addEventListener('stop', () => {
               const blob = new Blob(chunks, { type: 'audio/mp3' })

               dispatch(
                  PRACTICE_TEST_THUNKS.addAnswerFile({ recordedAudio: blob })
               )
            })

            setMediaRecorder(mediaRecorderInstance)

            mediaRecorderInstance.start()
         })
         .catch((error) => {
            showNotification({ message: error.message, type: 'error' })
         })
   }

   const stopRecordingHandler = () => {
      setIsRecording(false)
      setShowNextButton(true)

      if (stream) stream.getTracks().forEach((track) => track.stop())

      if (analyser) analyser.disconnect()
   }

   const onSubmit = () => {
      const answerData = {
         attempts: 0,
         input: '',
         audioFile: fileUrl,
         optionId: [],
         questionID: questions.questionId,
      }

      dispatch(PRACTICE_TEST_ACTIONS.addCorrectAnswer(answerData))

      nextHandler()

      setMediaRecorder(null)
   }

   return (
      <StyledContainer>
         {questions.statement ? (
            <Box className="main-container">
               <Box>
                  <Box className="record-saying-title-block">
                     <Typography className="title">
                        Record yourself saying the statement below:
                     </Typography>

                     <Box className="speak-block">
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
                           <Button
                              onClick={onSubmit}
                              disabled={!mediaRecorder}
                              isLoading={isLoading}
                              loadingColor="secondary"
                           >
                              NEXT
                           </Button>
                        )}
                     </Box>
                  </Box>
               </Box>
            </Box>
         ) : (
            <img src={NoData} alt="no-data" className="no-data" />
         )}
      </StyledContainer>
   )
}

export default RecordSayingStatement

const StyledContainer = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   userSelect: 'none',

   '& > .no-data': {
      width: '25rem',
      margin: 'auto',
   },

   '& > .main-container': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',

      '& div > .record-saying-title-block': {
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

         '& > .speak-block': {
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
      },

      '& div > .container-button': {
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
