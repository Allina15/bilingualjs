import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { Box, InputLabel, Typography, styled } from '@mui/material'
import Input from '../../UI/Input'
import Button from '../../UI/buttons/Button'
import Loading from '../../Loading'
import { ROUTES } from '../../../routes/routes'
import { QUESTION_THUNKS } from '../../../store/slices/admin/question/questionThunk'
import { QUESTION_TITLES } from '../../../utils/constants'
import { showNotification } from '../../../utils/helpers/notification'

const DescribeImage = ({
   title,
   setTitle,
   duration,
   selectType,
   setDuration,
   setSelectType,
}) => {
   const { fileUrl, isLoading, question } = useSelector(
      (state) => state.question
   )

   const [image, setImage] = useState(null)
   const [answer, setAnswer] = useState('')
   const [fileName, setFileName] = useState('')

   const { testId } = useParams()
   const { state } = useLocation()

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const inputFileRef = useRef(null)
   const inputRef = useRef(null)

   useEffect(() => {
      if (state !== null) {
         dispatch(QUESTION_THUNKS.getQuestion({ id: state?.id }))
      }
   }, [dispatch, state])

   useEffect(() => {
      if (state !== null && question) {
         setAnswer(question?.correctAnswer)
         setImage(question?.fileUrl)
      }
   }, [state, question])

   const changeAnswerHandler = (e) => {
      const { value } = e.target
      setAnswer(value || '')
   }

   const clickHandler = () => inputFileRef.current.click()

   const handleFileUpload = (file) => {
      if (file) {
         const reader = new FileReader()

         reader.onloadend = () => {
            setImage(reader.result)
         }

         reader.readAsDataURL(file)

         setFileName(file.name)

         dispatch(QUESTION_THUNKS.addFile(file))
      }
   }

   const changeFileHandler = (e) => {
      const file = e.target.files[0]
      handleFileUpload(file)
   }

   const onDrop = (acceptedFiles) => {
      const file = acceptedFiles[0]
      handleFileUpload(file)
   }

   const { getRootProps, getInputProps, fileRejections } = useDropzone({
      onDrop,
      accept: { 'image/jpeg': ['.png', '.jpeg', '.jpg'] },
      maxFiles: 1,
      maxSize: 5000000,
   })

   useEffect(() => {
      if (fileRejections && fileRejections.length > 0) {
         const rejectionMessage = fileRejections
            ?.map(({ errors }) => errors?.map((e) => e.message)?.join(', '))
            ?.join('\n')

         showNotification({
            title: 'Error',
            type: 'error',
            message: rejectionMessage,
         })
      }
   }, [fileRejections])

   const onSubmit = () => {
      if (
         selectType !== '' &&
         +duration !== 0 &&
         title !== '' &&
         answer !== ''
      ) {
         const requestData = {
            title: title.trim(),
            duration: +duration,
            correctAnswer: answer.trim(),
            fileUrl,
         }

         if (state === null) {
            dispatch(
               QUESTION_THUNKS.addTest({
                  requestData,

                  data: {
                     testId,
                     questionType: QUESTION_TITLES.DESCRIBE_IMAGE,
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
               correctAnswer: answer.trim(),
               optionRequest: [],
               fileUrl,
            }

            dispatch(
               QUESTION_THUNKS.updateQuestion({
                  id: state.id,
                  testId,
                  requestData,
                  navigate,
               })
            )
         }
      }
   }

   const navigateGoBackHandler = () =>
      navigate(
         `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/${testId}`
      )

   const isDisabled =
      isLoading ||
      (!state &&
         (!selectType ||
            !duration ||
            duration < 1 ||
            !title?.trim() ||
            !image ||
            !answer?.trim() ||
            !fileUrl)) ||
      (title?.trim() === question?.title &&
         image === question?.fileUrl &&
         duration === question?.duration &&
         answer?.trim() === question?.correctAnswer) ||
      !duration ||
      duration < 1

   return (
      <StyledContainer>
         {state !== null ? isLoading && <Loading /> : null}

         {image ? (
            <Box className="container-image">
               <Box onClick={clickHandler} {...getRootProps()}>
                  <img src={image} alt="uploaded" className="image" />
               </Box>

               <input
                  ref={inputFileRef}
                  type="file"
                  className="input-update"
                  accept=".jpg, .png"
                  onChange={changeFileHandler}
                  {...getInputProps()}
               />

               <Typography
                  className="file-name"
                  onClick={clickHandler}
                  {...getRootProps()}
               >
                  {fileName}
               </Typography>
            </Box>
         ) : (
            <Box className="upload">
               <InputLabel
                  htmlFor="fileInput"
                  className="title"
                  {...getRootProps()}
               >
                  Upload image
                  <input
                     id="fileInput"
                     type="file"
                     className="input"
                     onChange={changeFileHandler}
                     accept=".jpg, .png"
                     ref={inputRef}
                     {...getInputProps()}
                  />
               </InputLabel>
            </Box>
         )}

         <Box className="answer">
            <InputLabel className="correct-answer">Correct answer</InputLabel>

            <Input
               value={answer || ''}
               onChange={changeAnswerHandler}
               autoComplete="off"
            />
         </Box>

         <Box className="buttons">
            <Button variant="secondary" onClick={navigateGoBackHandler}>
               GO BACK
            </Button>

            <Button
               variant="primary"
               disabled={isDisabled}
               onClick={onSubmit}
               isLoading={isLoading}
               loadingColor="secondary"
            >
               {state !== null ? 'UPDATE' : 'SAVE'}
            </Button>
         </Box>
      </StyledContainer>
   )
}

export default DescribeImage

const StyledContainer = styled(Box)(({ theme }) => ({
   fontFamily: 'Arial',
   color: '#4C4859',
   width: '820px',
   overflow: 'hidden',

   '& > .container-image': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1.4rem',
      marginTop: '1rem',
   },

   '& > div > div > .image': {
      width: '181.59px',
      height: '177.39px',
      borderRadius: '8px',
      cursor: 'pointer',
   },

   '& > .upload': {
      display: 'flex',
      alignItems: 'center',
   },

   '& > div > .title': {
      border: '1px solid #D4D0D0',
      borderRadius: '8px',
      padding: '4.6rem 2rem 4.6rem 2rem',
      color: theme.palette.primary.main,
      fontWeight: 500,
      fontFamily: 'Poppins',
      marginBottom: '1.4rem',
      marginTop: '1rem',
      cursor: 'pointer',
   },

   '& > div > label > .input': {
      display: 'none',
   },

   '& > div > .input-update': {
      display: 'none',
   },

   '& > div > .file-name': {
      marginLeft: '4rem',
      cursor: 'pointer',
   },

   '& > div > .correct-answer': {
      paddingBottom: '7px',
   },

   '& > .answer': {
      marginBottom: '2rem',
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
