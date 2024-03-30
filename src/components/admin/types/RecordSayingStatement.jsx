import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import Input from '../../UI/Input'
import Button from '../../UI/buttons/Button'
import Loading from '../../Loading'
import { ROUTES } from '../../../routes/routes'
import { QUESTION_THUNKS } from '../../../store/slices/admin/question/questionThunk'
import { QUESTION_TITLES } from '../../../utils/constants'

const RecordSayingStatement = ({
   title,
   duration,
   setTitle,
   selectType,
   setDuration,
   setSelectType,
}) => {
   const { question, isLoading } = useSelector((state) => state.question)

   const [statement, setStatement] = useState('')

   const { testId } = useParams()
   const { state } = useLocation()

   const dispatch = useDispatch()

   const navigate = useNavigate()

   useEffect(() => {
      if (state !== null) {
         dispatch(QUESTION_THUNKS.getQuestion({ id: state?.id }))
      }
   }, [dispatch, state])

   useEffect(() => {
      if (state !== null && question) {
         setStatement(question?.correctAnswer)
      }
   }, [state, question])

   const statementChangeHandler = (e) => {
      const { value } = e.target

      setStatement(value || '')
   }

   const onSubmit = () => {
      if (selectType !== '' && +duration !== 0 && title !== '') {
         const requestData = {
            title: title.trim(),
            duration: +duration,
            statement: statement.trim(),
         }

         if (state === null) {
            dispatch(
               QUESTION_THUNKS.addTest({
                  requestData,

                  data: {
                     testId,
                     questionType: QUESTION_TITLES.RECORD_SAYING,
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
               statement: statement.trim(),
               optionRequest: [],
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
            !statement?.trim())) ||
      (title?.trim() === question?.title &&
         duration === question?.duration &&
         statement?.trim() === question?.correctAnswer) ||
      !duration ||
      duration < 1

   return (
      <StyledContainer>
         {state !== null ? isLoading && <Loading /> : null}

         <Box className="statement">
            <Typography className="text">Statement</Typography>

            <Input
               type="text"
               value={statement || ''}
               onChange={statementChangeHandler}
               autoComplete="off"
            />
         </Box>

         <Box className="buttons">
            <Button variant="secondary" onClick={navigateGoBackHandler}>
               GO BACK
            </Button>

            <Button variant="primary" disabled={isDisabled} onClick={onSubmit}>
               {state !== null ? 'UPDATE' : 'SAVE'}
            </Button>
         </Box>
      </StyledContainer>
   )
}

export default RecordSayingStatement

const StyledContainer = styled(Box)(() => ({
   width: '820px',
   overflow: 'hidden',

   '& > .statement': {
      marginTop: '1.4rem',
      marginBottom: '2rem',

      '& > .text': {
         fontFamily: 'Poppins',
         fontWeight: '500',
      },
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
