import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import Option from '../../UI/Option'
import Button from '../../UI/buttons/Button'
import Loading from '../../Loading'
import SaveModal from '../../UI/modals/SaveModal'
import DeleteModal from '../../UI/modals/DeleteModal'
import { ROUTES } from '../../../routes/routes'
import { PlusIcon } from '../../../assets/icons'
import { QUESTION_ACTIONS } from '../../../store/slices/admin/question/questionSlice'
import { QUESTION_THUNKS } from '../../../store/slices/admin/question/questionThunk'
import { OPTIONS_NAME, QUESTION_TITLES } from '../../../utils/constants'

const SelectRealEnglish = ({
   title,
   setTitle,
   duration,
   selectType,
   setDuration,
   setSelectType,
}) => {
   const { options, isLoading, inOpen, isUpdateDisabled } = useSelector(
      (state) => state.question
   )

   const [optionId, setOptionId] = useState(null)
   const [optionTitle, setOptionTitle] = useState('')
   const [checkedOption, setCheckedOption] = useState(false)

   const { testId } = useParams()

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const { state } = useLocation()

   const [modals, setModals] = useState({
      delete: false,
      save: false,
   })

   const toggleModal = (modalName) => {
      setModals((prevModals) => ({
         ...prevModals,
         [modalName]: !prevModals[modalName],
      }))

      setOptionTitle('')
      setCheckedOption(false)
   }

   useEffect(() => {
      if (state !== null) {
         dispatch(
            QUESTION_THUNKS.getQuestion({
               id: state.id,
               addUpdateOption: QUESTION_ACTIONS,
               optionName: OPTIONS_NAME.selectRealEnglishWordsOptions,
            })
         )
      }
   }, [dispatch, state])

   useEffect(() => {
      if (inOpen === false) {
         if (options.selectRealEnglishWordsOptions?.length <= 1) {
            dispatch(QUESTION_ACTIONS.changeIsdisabled(true))
         } else {
            dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
         }
      }
   }, [options, inOpen])

   const changeCheckbox = (e) => setCheckedOption(e.target.checked)

   const changeTitleHandler = (e) => setOptionTitle(e.target.value)

   const addOptionHandler = () => {
      const option = {
         optionTitle: optionTitle.trim(),
         isCorrectOption: checkedOption,
         optionId: Math.floor(Math.random() * 999) + 200,
      }

      dispatch(
         QUESTION_ACTIONS.addOptionCheck({
            option,
            optionName: OPTIONS_NAME.selectRealEnglishWordsOptions,
         })
      )

      dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
      dispatch(QUESTION_ACTIONS.changeInOpen(false))

      toggleModal('save')
   }

   const checkedHandler = (optionId) => {
      dispatch(
         QUESTION_ACTIONS.handleIsChecked({
            optionId,
            optionName: OPTIONS_NAME.selectRealEnglishWordsOptions,
         })
      )

      dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
      dispatch(QUESTION_ACTIONS.changeInOpen(false))
   }

   const deleteHandler = () => {
      if (state === null) {
         dispatch(
            QUESTION_ACTIONS.deleteOption({
               optionId,
               optionName: OPTIONS_NAME.selectRealEnglishWordsOptions,
            })
         )
      } else if (optionId > 200) {
         dispatch(
            QUESTION_ACTIONS.deleteOption({
               optionId,
               optionName: OPTIONS_NAME.selectRealEnglishWordsOptions,
            })
         )
      } else {
         dispatch(
            QUESTION_THUNKS.deleteOption({
               optionId,
               id: state.id,
               optionName: OPTIONS_NAME.selectRealEnglishWordsOptions,
               addUpdateOption: QUESTION_ACTIONS,
            })
         )
      }

      dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
      dispatch(QUESTION_ACTIONS.changeInOpen(false))

      toggleModal('delete')
   }

   const deleteOption = options?.selectRealEnglishWordsOptions?.find(
      (option) => option?.optionId === optionId
   )?.optionTitle

   const onSubmit = () => {
      if (selectType !== '' && +duration !== 0 && title !== '') {
         const requestData = {
            title: title.trim(),
            duration: +duration,
            option: options.selectRealEnglishWordsOptions?.map((option) => ({
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
                     questionType: QUESTION_TITLES.SELECT_REAL_ENGLISH_WORD,
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
               optionRequest: options.selectRealEnglishWordsOptions?.map(
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
                  id: state.id,
                  requestData,
                  testId,
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
      options.selectRealEnglishWordsOptions?.length < 2

   const isDisabledModal = !optionTitle.trim()

   return (
      <>
         <StyledContainer>
            {isLoading && <Loading />}

            <Box className="add-button">
               <Button
                  onClick={() => toggleModal('save')}
                  icon={<PlusIcon className="plus" />}
               >
                  Add Options
               </Button>
            </Box>

            <Box className="cards">
               {options.selectRealEnglishWordsOptions?.map((option, index) => (
                  <Option
                     key={option.optionId}
                     index={index}
                     deletion
                     option={option}
                     toggleModal={() => toggleModal('delete')}
                     setOptionId={setOptionId}
                     checkedHandler={checkedHandler}
                  />
               ))}
            </Box>

            <Box className="buttons">
               <Button variant="secondary" onClick={navigateGoBackHandler}>
                  GO BACK
               </Button>

               <Button
                  variant="primary"
                  disabled={state === null ? isDisabled : isUpdateDisabled}
                  onClick={onSubmit}
               >
                  {state === null ? 'SAVE' : 'UPDATE'}
               </Button>
            </Box>
         </StyledContainer>

         <DeleteModal
            isCloseIcon
            isVisible={modals.delete}
            toggleModal={() => toggleModal('delete')}
            deleteHandler={deleteHandler}
         >
            <Typography className="title" variant="p">
               <Typography variant="span">Option: </Typography>

               {deleteOption}
            </Typography>

            <Typography className="modal-message">You cant restore</Typography>
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
            changeCheckboxHandler={changeCheckbox}
         />
      </>
   )
}

export default SelectRealEnglish

const StyledContainer = styled(Box)(() => ({
   width: '820px',
   overflow: 'hidden',

   '& > .add-button': {
      margin: '2rem -1rem 1.375rem 41rem',

      '& > button >  span > .plus': {
         width: '1rem',
         marginBottom: '0.2rem',
         marginRight: '0.6rem',
      },
   },

   '& > .cards': {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '1.1rem',
      margin: '1.5rem 0 2rem 0',

      '& > .option': {
         width: '261px',

         '& > .title-option': {
            width: '13rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
         },
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

      '& > .text': {
         textDecoration: 'none',
         color: 'inherit',
         fontFamily: 'Poppins',
         fontWeight: '700',
      },
   },
}))
