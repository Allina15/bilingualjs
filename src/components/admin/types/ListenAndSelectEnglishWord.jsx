import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { styled, Box, Typography, InputLabel } from '@mui/material'
import Option from '../../UI/Option'
import Button from '../../UI/buttons/Button'
import SaveModal from '../../UI/modals/SaveModal'
import DeleteModal from '../../UI/modals/DeleteModal'
import { PlusIcon } from '../../../assets/icons'
import { QUESTION_ACTIONS } from '../../../store/slices/admin/question/questionSlice'
import { QUESTION_THUNKS } from '../../../store/slices/admin/question/questionThunk'
import { ROUTES } from '../../../routes/routes'
import { OPTIONS_NAME, QUESTION_TITLES } from '../../../utils/constants'

const ListenAndSelectEnglishWord = ({
   title,
   duration,
   setTitle,
   selectType,
   setDuration,
   setSelectType,
}) => {
   const { fileUrl, isLoading, options, inOpen, isUpdateDisabled } =
      useSelector((state) => state.question)

   const [files, setFiles] = useState([])
   const [optionId, setOptionId] = useState(null)
   const [isUploaded, setIsUploaded] = useState(false)
   const [optionTitle, setOptionTitle] = useState('')
   const [checkedOption, setCheckedOption] = useState(false)
   const [modals, setModals] = useState({
      delete: false,
      save: false,
   })

   const navigate = useNavigate()

   const dispatch = useDispatch()

   const { testId } = useParams()

   const { state } = useLocation()

   const toggleModal = (modalName) => {
      setModals((prev) => ({
         ...prev,
         [modalName]: !prev[modalName],
      }))

      setFiles([])
      setOptionTitle('')
      setIsUploaded(false)
      setCheckedOption(false)
   }

   useEffect(() => {
      if (state !== null) {
         dispatch(
            QUESTION_THUNKS.getQuestion({
               id: state.id,
               addUpdateOption: QUESTION_ACTIONS,
               optionName: OPTIONS_NAME?.listenAndSelectOptions,
            })
         )
      }
   }, [state])

   const changeTitleHandler = (e) => setOptionTitle(e.target.value)

   const fileChangeHandler = (e) => {
      const file = e.target.files[0]

      if (file) {
         setFiles([file])

         const reader = new FileReader()

         reader.readAsDataURL(file)

         dispatch(QUESTION_THUNKS.addFile(file))

         setIsUploaded(true)
      }
   }

   const addOptionHandler = () => {
      const option = {
         optionTitle: optionTitle.trim(),
         isCorrectOption: checkedOption,
         optionId: Math.floor(Math.random() * 999) + 200,
         fileUrl,
      }

      dispatch(
         QUESTION_ACTIONS.addOptionCheck({
            option,
            optionName: OPTIONS_NAME?.listenAndSelectOptions,
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
            optionName: OPTIONS_NAME?.listenAndSelectOptions,
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
               optionName: OPTIONS_NAME?.listenAndSelectOptions,
            })
         )
      } else if (optionId > 200) {
         dispatch(
            QUESTION_ACTIONS.deleteOption({
               optionId,
               optionName: OPTIONS_NAME?.listenAndSelectOptions,
            })
         )
      } else {
         dispatch(
            QUESTION_THUNKS.deleteOption({
               optionId,
               id: state.id,
               optionName: OPTIONS_NAME?.listenAndSelectOptions,
               addUpdateOption: QUESTION_ACTIONS,
            })
         )
      }

      dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
      dispatch(QUESTION_ACTIONS.changeInOpen(false))

      toggleModal('delete')
   }

   const deleteOption = options?.listenAndSelectOptions?.find(
      (option) => option.optionId === optionId
   )?.optionTitle

   const onSubmit = () => {
      if (selectType !== '' && +duration !== 0 && title !== '') {
         const requestData = {
            title: title.trim(),
            duration: +duration,
            option: options?.listenAndSelectOptions?.map((option) => ({
               optionTitle: option?.optionTitle,
               fileUrl: option?.fileUrl,
               isCorrectOption: option?.isCorrectOption,
            })),
         }

         if (state === null) {
            dispatch(
               QUESTION_THUNKS.addTest({
                  requestData,

                  data: {
                     testId,
                     questionType: QUESTION_TITLES?.LISTEN_AND_SELECT_WORD,
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
               optionRequest: options?.listenAndSelectOptions?.map(
                  (option) => ({
                     id: option?.optionId,
                     optionTitle: option?.optionTitle,
                     isCorrectOption: option?.isCorrectOption,
                     fileUrl: option?.fileUrl,
                  })
               ),
            }

            dispatch(
               QUESTION_THUNKS.updateQuestion({
                  id: state.id,
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
      !title?.trim() ||
      options?.listenAndSelectOptions?.length < 2

   const isDisabledModal =
      optionTitle?.trim() !== '' &&
      isUploaded !== false &&
      isLoading !== true &&
      fileUrl !== ''

   useEffect(() => {
      if (inOpen === false) {
         if (options?.listenAndSelectOptions?.length <= 1) {
            dispatch(QUESTION_ACTIONS.changeIsdisabled(true))
         } else {
            dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
         }
      }
   }, [options, inOpen])

   return (
      <StyledContainer>
         <Box className="add-button">
            <Button
               icon={<PlusIcon className="plus" />}
               onClick={() => toggleModal('save')}
            >
               ADD OPTIONS
            </Button>
         </Box>

         <Box className="cards">
            {options?.listenAndSelectOptions?.map((option, i) => (
               <Option
                  key={option?.optionId}
                  icon
                  deletion
                  index={i}
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

         <SaveModal
            isCloseIcon
            title={optionTitle}
            isVisible={modals.save}
            toggleModal={() => toggleModal('save')}
            isLoading={isLoading}
            isDisabledModal={isDisabledModal}
            addOptionHandler={addOptionHandler}
            changeTitleHandler={changeTitleHandler}
         >
            <input
               type="file"
               accept="audio/mp3, .wav"
               id="filed-input"
               onChange={fileChangeHandler}
               className="upload-input"
            />

            <Box className="upload">
               <InputLabel htmlFor="filed-input" className="text">
                  <Button variant="secondary" component="span">
                     {isUploaded ? 'Replace' : 'Upload audio file'}
                  </Button>
               </InputLabel>

               {isUploaded &&
                  files?.map(({ name }) => (
                     <Typography key={name} className="file-name">
                        {name}
                     </Typography>
                  ))}
            </Box>
         </SaveModal>

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

            <Typography className="modal-message">You can`t restore</Typography>
         </DeleteModal>
      </StyledContainer>
   )
}

export default ListenAndSelectEnglishWord

const StyledContainer = styled(Box)(() => ({
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
   '& > .buttons': {
      display: 'flex',
      gap: '1.1rem',
      position: 'relative',
      right: '-35.4rem',

      '& > .MuiButton-root ': {
         width: '118px',
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
}))
