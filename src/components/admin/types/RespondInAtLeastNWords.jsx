import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router'
import { InputLabel, styled, Box } from '@mui/material'
import Input from '../../UI/Input'
import Button from '../../UI/buttons/Button'
import Loading from '../../Loading'
import { ROUTES } from '../../../routes/routes'
import { QUESTION_ACTIONS } from '../../../store/slices/admin/question/questionSlice'
import { QUESTION_THUNKS } from '../../../store/slices/admin/question/questionThunk'
import { QUESTION_TITLES } from '../../../utils/constants'

const RespondInAtLeastNWords = ({
   title,
   duration,
   setTitle,
   selectType,
   setDuration,
   setSelectType,
}) => {
   const { isLoading, question } = useSelector((state) => state.question)

   const [attempts, setAttempts] = useState(1)
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
         setAttempts(question?.attempts)
         setStatement(question?.statement)
      }
   }, [state, question])

   const statementChangeHandler = (e) => {
      const { value } = e.target

      setStatement(value || '')
   }

   const attemptsChangeHandler = (e) => {
      let newValue = e.target.value.replace(/\D/g, '')
      newValue = newValue.slice(0, 2)

      const value = parseInt(newValue, 10)
      if (value > 50) {
         newValue = '50'
      }

      setAttempts(newValue)

      if (
         value === 0 ||
         newValue === '' ||
         state?.duration === value.toString()
      ) {
         dispatch(QUESTION_ACTIONS.changeIsdisabled(true))
      } else {
         dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
      }
   }

   const onSubmit = () => {
      if (
         selectType !== '' &&
         +duration !== 0 &&
         title !== '' &&
         statement !== '' &&
         +attempts !== 0
      ) {
         const requestData = {
            title: title.trim(),
            duration: +duration,
            statement: statement.trim(),
            attempts,
         }

         if (state === null) {
            dispatch(
               QUESTION_THUNKS.addTest({
                  requestData,

                  data: {
                     testId,
                     questionType: QUESTION_TITLES.RESPOND_IN_AT_LEAST_N_WORDS,
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
               attempts,
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
         statement?.trim() === question?.statement &&
         attempts === question?.attempts) ||
      !duration ||
      duration < 1 ||
      !attempts

   return (
      <StyledContainer>
         {state !== null ? isLoading && <Loading /> : null}

         <Box>
            <InputLabel>Question statement</InputLabel>

            <Input value={statement || ''} onChange={statementChangeHandler} />
         </Box>

         <Box>
            <InputLabel>
               Number off <br />
               Words
            </InputLabel>

            <Input
               className="input-number"
               type="number"
               value={attempts || ''}
               onChange={attemptsChangeHandler}
               inputProps={{ min: 0, max: 15 }}
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
               isLoading={isLoading}
               disabled={isDisabled}
               loadingColor="secondary"
            >
               {state !== null ? 'UPDATE' : 'SAVE'}
            </Button>
         </Box>
      </StyledContainer>
   )
}

export default RespondInAtLeastNWords

const StyledContainer = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '2rem',
   marginTop: '2rem',
   width: '820px',
   overflow: 'hidden',

   '& > .MuiInputLabel-root': {
      fontFamily: 'Poppins',
      fontWeight: 500,
      color: '#4B4759',
      marginBottom: '0.5rem',
   },

   '& > div > .input-number': {
      '& > .MuiOutlinedInput-root': {
         padding: '.75rem  0.1rem .75rem 0.1rem ',
         width: '3.5rem',
         height: '3.5rem',
         textAlign: 'center',
         fontSize: '1.2rem',
      },
   },

   '& div > .MuiOutlinedInput-input[type="number"]::-webkit-inner-spin-button':
      {
         display: 'none',
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
