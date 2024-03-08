import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, TextField, Typography, styled } from '@mui/material'
import { OPTIONS_NAME, QUESTION_TITLES } from '../../../utils/constants'
import { QUESTION_ACTIONS } from '../../../store/slice/admin/question/questionSlice'
import { QUESTION_THUNKS } from '../../../store/slice/admin/question/questionThunk'
import { PlusIcon } from '../../../assets/icons'
import DeleteModal from '../../../components/UI/modals/DeleteModal'
import SaveModal from '../../../components/UI/modals/SaveModal'
import Option from '../../../components/UI/Option'
import Button from '../../../components/UI/buttons/Button'

const SelectTheBestTitle = ({
   duration,
   setDuration,
   selectType,
   title,
   setTitle,
   setSelectType,
}) => {
   const { options } = useSelector((state) => state.question)

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

   const textAreaChangeHandler = (e) => setPassage(e.target.value)

   const changeCheckboxHandler = (e) => setCheckedOption(e.target.checked)

   const changeTitleHandler = (e) => setOptionTitle(e.target.value)

   const goBackHandler = () => navigate(-1)

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
            optionName: OPTIONS_NAME.selectTheBestTitle,
         })
      )

      toggleModal('delete')
   }

   const checkedHandler = (id) => {
      dispatch(
         QUESTION_ACTIONS.handleIsCorrect({
            id,
            optionName: OPTIONS_NAME.selectTheBestTitle,
         })
      )
   }

   const isDisabled =
      !selectType ||
      !duration ||
      !title.trim() ||
      options.selectTheBestTitle.length < 2 ||
      !passage.trim()

   const isDisabledModal = !optionTitle.trim()

   const onSubmit = () => {
      if (selectType !== '' && +duration !== 0 && title !== '') {
         const requestData = {
            title: title.trim(),
            duration: +duration,
            option: options.selectTheBestTitle.map((option) => ({
               optionTitle: option.optionTitle,
               isCorrectOption: option.isCorrectOption,
            })),
         }

         dispatch(
            QUESTION_THUNKS.saveTest({
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
      }
   }

   const addOptionHandler = () => {
      const option = {
         optionTitle: optionTitle.trim(),
         isCorrectOption: checkedOption,
         id: uuidv4(),
      }

      dispatch(
         QUESTION_ACTIONS.addOptionRadio({
            option,
            optionName: OPTIONS_NAME.selectTheBestTitle,
         })
      )

      toggleModal('save')

      setOptionTitle('')
      setCheckedOption(false)

      if (options.selectTheBestTitle.length === 0 || checkedOption) {
         setSelectedOptionId(option.id)
      }
   }

   return (
      <StyledContainer>
         <Box className="passage">
            <Typography className="title">Passage</Typography>

            <TextField
               name="text"
               value={passage}
               onChange={textAreaChangeHandler}
               multiline
               fullWidth
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
            {options.selectTheBestTitle?.map((option, i) => (
               <Option
                  key={option.id}
                  index={i}
                  option={option}
                  isRadio
                  toggleModal={() => toggleModal('delete')}
                  setOptionId={setOptionId}
                  checkedHandler={checkedHandler}
                  selectedOptionId={selectedOptionId}
                  setSelectedOptionId={setSelectedOptionId}
               />
            ))}
         </Box>

         <Box className="buttons">
            <Button variant="secondary" onClick={goBackHandler}>
               GO BACK
            </Button>

            <Button variant="primary" disabled={isDisabled} onClick={onSubmit}>
               SAVE
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
   width: '822px',

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
      marginLeft: '37.4rem',
   },
}))
