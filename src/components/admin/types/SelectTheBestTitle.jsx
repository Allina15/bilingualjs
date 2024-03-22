import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, TextField, Typography, styled } from '@mui/material'
import { OPTIONS_NAME, QUESTION_TITLES } from '../../../utils/constants'
import { QUESTION_ACTIONS } from '../../../store/slices/admin/question/questionSlice'
import { QUESTION_THUNKS } from '../../../store/slices/admin/question/questionThunk'
import { PlusIcon } from '../../../assets/icons'
import DeleteModal from '../../UI/modals/DeleteModal'
import SaveModal from '../../UI/modals/SaveModal'
import Option from '../../UI/Option'
import Button from '../../UI/buttons/Button'
import Loading from '../../Loading'

const SelectTheBestTitle = ({
   title,
   duration,
   setTitle,
   selectType,
   setDuration,
   setSelectType,
}) => {
   const { options, question, isLoading } = useSelector(
      (state) => state.question
   )

   const { state } = useLocation()

   const [passage, setPassage] = useState('')
   const [optionId, setOptionId] = useState(null)
   const [optionTitle, setOptionTitle] = useState('')
   const [checkedOption, setCheckedOption] = useState(false)
   const [selectedOptionId, setSelectedOptionId] = useState(null)
   const [modals, setModals] = useState({
      delete: false,
      save: false,
   })

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const { testId } = useParams()

   const changeTitleHandler = (e) => setOptionTitle(e.target.value)

   const changeCheckboxHandler = (e) => setCheckedOption(e.target.checked)

   const textAreaChangeHandler = (e) => {
      const { value } = e.target

      setPassage(value || '')
   }

   const navigateGoBackHandler = () => {
      navigate(-1)

      dispatch(QUESTION_ACTIONS.clearOptions())
   }

   useEffect(() => {
      if (state !== null) {
         dispatch(
            QUESTION_THUNKS.getQuestion({
               id: state?.id,
               addUpdateOption: QUESTION_ACTIONS,
               optionName: OPTIONS_NAME.selectTheBestTitleOptions,
            })
         )
      }
   }, [dispatch, state])

   useEffect(() => {
      if (state !== null && question) {
         setPassage(question?.passage)
      }
   }, [state, question])

   const toggleModal = (modalName) => {
      setModals((prevModals) => ({
         ...prevModals,
         [modalName]: !prevModals[modalName],
      }))

      setOptionTitle('')
      setCheckedOption(false)
   }

   const deleteHandler = () => {
      dispatch(
         QUESTION_ACTIONS.deleteOption({
            optionId,
            optionName: OPTIONS_NAME.selectTheBestTitleOptions,
         })
      )

      toggleModal('delete')
   }

   const checkedHandler = (optionId) => {
      dispatch(
         QUESTION_ACTIONS.handleIsCorrect({
            optionId,
            optionName: OPTIONS_NAME.selectTheBestTitleOptions,
         })
      )
   }

   const isDisabled =
      !selectType ||
      !duration ||
      !title ||
      options.selectTheBestTitleOptions?.length < 2 ||
      !passage

   const isDisabledModal = !optionTitle.trim()

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

         if (state === null) {
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
               title: title.trim(),
               duration: +duration,
               optionRequest: options.selectTheBestTitleOptions?.map(
                  (option) => ({
                     optionTitle: option.optionTitle,
                     isCorrectOption: option.isCorrectOption,
                  })
               ),
            }

            dispatch(
               QUESTION_THUNKS.updateQuestion({
                  id: state.id,
                  requestData,
                  navigate,
                  clearOptions: QUESTION_ACTIONS,
               })
            )
         }
      }
   }

   const addOptionHandler = () => {
      const option = {
         optionTitle: optionTitle.trim(),
         isCorrectOption: checkedOption,
         optionId: uuidv4(),
      }

      dispatch(
         QUESTION_ACTIONS.addOptionRadio({
            option,
            optionName: OPTIONS_NAME.selectTheBestTitleOptions,
         })
      )

      toggleModal('save')

      setOptionTitle('')
      setCheckedOption(false)

      if (options.selectTheBestTitleOptions?.length === 0 || checkedOption) {
         setSelectedOptionId(option.optionId)
      }
   }

   return (
      <StyledContainer>
         {state !== null ? isLoading && <Loading /> : null}

         <Box className="passage">
            <Typography className="title">Passage</Typography>

            <TextField
               name="text"
               value={passage || ''}
               onChange={textAreaChangeHandler}
               multiline
               fullWidth
               autoComplete="off"
            />
         </Box>

         <Box className="add-button">
            <Button
               icon={<PlusIcon className="plus" />}
               onClick={() => toggleModal('save')}
            >
               ADD OPTIONS
            </Button>
         </Box>

         <Box className="cards">
            {options.selectTheMainIdeaOptions?.map((option, index) => (
               <Option
                  key={option.optionId}
                  index={index}
                  option={option}
                  isRadio
                  deletion
                  toggleModal={() => toggleModal('delete')}
                  setOptionId={setOptionId}
                  checkedHandler={checkedHandler}
                  selectedOptionId={selectedOptionId}
                  setSelectedOptionId={setSelectedOptionId}
               />
            ))}
         </Box>

         <Box className="buttons">
            <Button variant="secondary" onClick={navigateGoBackHandler}>
               GO BACK
            </Button>

            <Button
               variant="primary"
               disabled={state !== null ? null : isDisabled}
               onClick={onSubmit}
            >
               {state !== null ? 'UPDATE' : 'SAVE'}
            </Button>
         </Box>

         <DeleteModal
            isCloseIcon
            isVisible={modals.delete}
            toggleModal={() => toggleModal('delete')}
            deleteHandler={deleteHandler}
         >
            <Typography className="modal-message">You can`t restore</Typography>
         </DeleteModal>

         <SaveModal
            isCloseIcon
            checkbox
            title={optionTitle}
            checked={checkedOption}
            isVisible={modals.save}
            toggleModal={() => toggleModal('save')}
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
      right: '-35.5rem',

      '& > .MuiButton-root ': {
         width: '118px',
      },
   },
}))
