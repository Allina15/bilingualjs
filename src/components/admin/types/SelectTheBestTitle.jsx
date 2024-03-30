import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, TextField, Typography, styled } from '@mui/material'
import Loading from '../../Loading'
import Option from '../../UI/Option'
import Button from '../../UI/buttons/Button'
import SaveModal from '../../UI/modals/SaveModal'
import DeleteModal from '../../UI/modals/DeleteModal'
import { PlusIcon } from '../../../assets/icons'
import { ROUTES } from '../../../routes/routes'
import { QUESTION_ACTIONS } from '../../../store/slices/admin/question/questionSlice'
import { QUESTION_THUNKS } from '../../../store/slices/admin/question/questionThunk'
import { useToggleModal } from '../../../hooks/useToogleModal'
import { OPTIONS_NAME, QUESTION_TITLES } from '../../../utils/constants'

const SelectTheBestTitle = ({
   title,
   duration,
   setTitle,
   selectType,
   setDuration,
   setSelectType,
}) => {
   const { options, isLoading, isCreate, question, inOpen, isUpdateDisabled } =
      useSelector((state) => state.question)

   const [passage, setPassage] = useState('')
   const [optionId, setOptionId] = useState(null)
   const [optionTitle, setOptionTitle] = useState('')
   const [checkedOption, setCheckedOption] = useState(false)
   const [selectedOptionId, setSelectedOptionId] = useState(null)

   const { testId, questionId } = useParams()

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const deleteModal = useToggleModal('delete')
   const saveModal = useToggleModal('save')

   const changeTitleHandler = (e) => setOptionTitle(e.target.value)
   const changeCheckboxHandler = (e) => setCheckedOption(e.target.checked)

   const changeTextAreaHandler = (e) => {
      if (passage === options?.passage) {
         dispatch(QUESTION_ACTIONS.changeIsdisabled(true))
      } else {
         dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
      }

      const { value } = e.target

      setPassage(value || '')
   }

   useEffect(() => {
      if (questionId) {
         dispatch(
            QUESTION_THUNKS.getQuestion({
               id: questionId,
               addUpdateOption: QUESTION_ACTIONS,
               optionName: OPTIONS_NAME.selectTheBestTitleOptions,
            })
         )
      }
   }, [dispatch, questionId])

   useEffect(() => {
      if (questionId && question) {
         setPassage(question?.passage)
         setCheckedOption(question?.isCorrectOption)
      }
   }, [questionId, question])

   useEffect(() => {
      if (inOpen === false) {
         if (options.selectTheBestTitleOptions?.length <= 1) {
            dispatch(QUESTION_ACTIONS.changeIsdisabled(true))
         } else {
            dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
         }
      }
   }, [options, inOpen])

   const handleOnClose = () => {
      saveModal.onCloseModal()

      setOptionTitle('')
      setCheckedOption(false)
   }

   const addOptionHandler = () => {
      const option = {
         optionTitle: optionTitle.trim(),
         isCorrectOption: checkedOption,
         optionId: Math.floor(Math.random() * 999) + 200,
      }

      dispatch(
         QUESTION_ACTIONS.addOptionRadio({
            option,
            optionName: OPTIONS_NAME.selectTheBestTitleOptions,
         })
      )
      dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
      dispatch(QUESTION_ACTIONS.changeInOpen(false))

      handleOnClose()

      if (options.selectTheBestTitleOptions?.length === 0 || checkedOption) {
         setSelectedOptionId(option.optionId)
      }
   }

   const checkedHandler = (optionId) => {
      dispatch(
         QUESTION_ACTIONS.handleIsCorrect({
            optionId,
            optionName: OPTIONS_NAME.selectTheBestTitleOptions,
         })
      )

      dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
      dispatch(QUESTION_ACTIONS.changeInOpen(false))
   }

   const deleteHandler = () => {
      if (options.selectTheBestTitleOptions.length > 1) {
         dispatch(QUESTION_ACTIONS.changeIsdisabled(true))
      }

      if (isCreate) {
         dispatch(
            QUESTION_ACTIONS.deleteOption({
               optionId,
               optionName: OPTIONS_NAME.selectTheBestTitleOptions,
            })
         )
      } else if (optionId > 200) {
         dispatch(
            QUESTION_ACTIONS.deleteOption({
               optionId,
               optionName: OPTIONS_NAME.selectTheBestTitleOptions,
            })
         )
      } else {
         dispatch(
            QUESTION_THUNKS.deleteOption({
               optionId,
               id: questionId,
               optionName: OPTIONS_NAME.selectTheBestTitleOptions,
               addUpdateOption: QUESTION_ACTIONS,
            })
         )
      }

      dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
      dispatch(QUESTION_ACTIONS.changeInOpen(false))

      deleteModal.onCloseModal()
   }

   const onSubmit = () => {
      if (selectType !== '' && +duration !== 0 && title !== '') {
         const requestData = {
            title: title.trim(),
            duration: +duration,
            passage,
            option: options.selectTheBestTitleOptions?.map((option) => ({
               optionTitle: option.optionTitle,
               isCorrectOption: option.isCorrectOption,
            })),
         }

         if (isCreate) {
            dispatch(
               QUESTION_THUNKS.addTest({
                  requestData,

                  data: {
                     testId,
                     questionType: QUESTION_TITLES.SELECT_THE_BEST_TITLE,
                     navigate,
                  },

                  setStates: {
                     setSelectType: setSelectType(selectType),
                     setTitle: setTitle(title),
                     setDuration: setDuration(duration),
                  },

                  clearOptions: QUESTION_ACTIONS,
               })
            )
         } else {
            const requestData = {
               passage,
               title: title.trim(),
               duration: +duration,
               optionRequest: options.selectTheBestTitleOptions?.map(
                  (option) => ({
                     id: option.optionId,
                     optionTitle: option.optionTitle,
                     isCorrectOption: option.isCorrectOption,
                     fileUrl: 'none',
                  })
               ),
            }

            dispatch(
               QUESTION_THUNKS.updateQuestion({
                  id: questionId,
                  testId,
                  requestData,
                  navigate,
                  clearOptions: QUESTION_ACTIONS,
               })
            )

            dispatch(QUESTION_ACTIONS.changeIsdisabled(true))
         }
      }
   }

   const navigateGoBackHandler = () => {
      navigate(
         `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/${testId}`
      )

      dispatch(QUESTION_ACTIONS.changeIsdisabled(true))
      dispatch(QUESTION_ACTIONS.clearOptions())
   }

   const isDisabled =
      !selectType ||
      !duration ||
      duration < 1 ||
      !title ||
      options.selectTheBestTitleOptions?.length < 2 ||
      !passage

   const isDisabledModal = !optionTitle.trim()

   return (
      <StyledContainer>
         {isLoading && <Loading />}

         <Box className="passage">
            <Typography className="title">Passage</Typography>

            <TextField
               name="text"
               value={passage || ''}
               onChange={changeTextAreaHandler}
               multiline
               fullWidth
               autoComplete="off"
            />
         </Box>

         <Box className="add-button">
            <Button
               icon={<PlusIcon className="plus" />}
               onClick={saveModal.onOpenModal}
            >
               ADD OPTIONS
            </Button>
         </Box>

         <Box className="cards">
            {options.selectTheBestTitleOptions?.map((option, index) => (
               <Option
                  key={option.optionId}
                  index={index}
                  option={option}
                  isRadio
                  deletion
                  toggleModal={deleteModal.onOpenModal}
                  setOptionId={setOptionId}
                  checkedHandler={checkedHandler}
                  selectedOptionId={selectedOptionId}
                  setSelectedOptionId={setSelectedOptionId}
                  checked={option.isCorrectOption}
               />
            ))}
         </Box>

         <Box className="buttons">
            <Button variant="secondary" onClick={navigateGoBackHandler}>
               GO BACK
            </Button>

            <Button
               variant="primary"
               disabled={isCreate ? isDisabled : isUpdateDisabled}
               onClick={onSubmit}
            >
               {isCreate ? 'SAVE' : 'UPDATE'}
            </Button>
         </Box>

         <DeleteModal
            isCloseIcon
            isVisible={deleteModal.isOpen}
            toggleModal={deleteModal.onCloseModal}
            deleteHandler={deleteHandler}
         >
            <Typography className="modal-message">You can`t restore</Typography>
         </DeleteModal>

         <SaveModal
            isCloseIcon
            checkbox
            title={optionTitle}
            checked={checkedOption}
            isVisible={saveModal.isOpen}
            toggleModal={handleOnClose}
            isDisabledModal={!isDisabledModal}
            addOptionHandler={addOptionHandler}
            changeTitleHandler={changeTitleHandler}
            changeCheckboxHandler={changeCheckboxHandler}
         />
      </StyledContainer>
   )
}

export default SelectTheBestTitle

const StyledContainer = styled(Box)(({ theme }) => ({
   width: '820px',
   overflow: 'hidden',

   '& > .add-button': {
      margin: '2rem 0 1.375rem 41rem',

      '& > button >  span > .plus': {
         width: '1rem',
         marginBottom: '0.2rem',
         marginRight: '0.6rem',
      },
   },

   '& > .passage': {
      marginTop: '1.6rem',

      '& > div > .MuiOutlinedInput-root': {
         borderRadius: '8px',
         fontWeight: 400,

         '& > .Mui-focused fieldset': {
            border: `1px solid ${theme.palette.primary.main}`,
         },

         '&:hover fieldset': {
            border: `1px solid ${theme.palette.primary.main}`,
         },
      },
   },

   '& > .cards': {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      gap: '1.1rem',
      margin: '1.5rem 0 2rem 0',

      '& > div > .actions': {
         marginLeft: 'auto',
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
