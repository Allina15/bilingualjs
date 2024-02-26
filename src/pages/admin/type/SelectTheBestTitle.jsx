import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, Typography, styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { CancelIcon, FalseIcon, PlusIcon } from '../../../assets/icons'
import { QUESTION_ACTIONS } from '../../../store/slice/admin/questionSlice'
import { questionTitle } from '../../../utils/helpers/questionTitle'
import { QUESTION_THUNK } from '../../../store/slice/admin/questionThunk'
import Button from '../../../components/UI/buttons/Button'
import CardOption from '../../../components/UI/CardOption'
import Modal from '../../../components/UI/Modal'
import Checkbox from '../../../components/UI/Checkbox'
import Input from '../../../components/UI/Input'

const SelectTheBestTitle = ({
   duration,
   setDuration,
   selectType,
   title,
   setTitle,
   setSelectType,
}) => {
   const option = useSelector((state) => state.question.option)

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const { testId } = useParams()

   const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

   const [isOpenModalSave, setIsOpenModalSave] = useState(false)

   const [optionTitle, setOptionTitle] = useState('')

   const [checkOption, setCheckOption] = useState(false)

   const [optionId, setOptionId] = useState(null)

   const [passage, setPassage] = useState('')

   const handleChangeInput = (e) => setOptionTitle(e.target.value)

   const handleChangeTextArea = (e) => setPassage(e.target.value)

   const changeCheckbox = (e) => setCheckOption(e.target.checked)

   const openModalDelete = () => setIsOpenModalDelete((prevState) => !prevState)

   const openModalSave = () => {
      setIsOpenModalSave((prevState) => !prevState)
      setOptionTitle('')
      setCheckOption('')
   }

   const deleteTest = () => {
      dispatch(QUESTION_ACTIONS.deleteOption(optionId))
      setIsOpenModalDelete((prevState) => !prevState)
   }

   const handleChecked = (id) => {
      dispatch(QUESTION_ACTIONS.changeTrueOption(id))
   }

   const saveTestQuestion = () => {
      if (selectType !== '' && +duration !== +'' && title !== '') {
         dispatch(QUESTION_ACTIONS.clearOptions())

         setSelectType('')
         setTitle('')
         setDuration('')
         setPassage('')

         const requestData = {
            title: title.trim(),
            duration: +duration * 60,
            passage: passage.trim(),
            option,
         }

         dispatch(
            QUESTION_THUNK.saveTest({
               requestData,
               data: {
                  testId,
                  questionType: questionTitle('SELECT_THE_BEST_TITLE'),
                  navigate,
               },
            })
         )
      }
   }

   const addHandler = () => {
      const data = {
         optionTitle,
         isCorrect: checkOption,
         id: uuidv4(),
      }

      dispatch(QUESTION_ACTIONS.addOption(data))

      openModalSave()

      setOptionTitle('')
      setCheckOption(false)
   }

   return (
      <StyledContainer>
         <Box className="passage">
            <Typography className="title">Passage</Typography>

            <TextField
               multiline
               value={passage}
               onChange={handleChangeTextArea}
               name="text"
               fullWidth
            />
         </Box>

         <Box className="add-button">
            <Button
               onClick={openModalSave}
               icon={<PlusIcon className="icon" />}
            >
               Add Options
            </Button>
         </Box>

         <Box className="cards">
            {option?.map((item, i) => (
               <CardOption
                  className="card-option"
                  key={item.id}
                  item={item}
                  index={i}
                  isRadio
                  handleChecked={handleChecked}
                  openModal={setIsOpenModalDelete}
                  setOptionId={setOptionId}
               />
            ))}
         </Box>

         <Box className="buttons">
            <Button variant="secondary" onClick={() => navigate(-1)}>
               GO BACK
            </Button>

            <Button
               variant="primary"
               disabled={
                  !selectType ||
                  !duration ||
                  !title ||
                  option.length === 0 ||
                  !passage.trim()
               }
               onClick={saveTestQuestion}
            >
               SAVE
            </Button>
         </Box>

         <Modal
            isCloseIcon
            isVisible={isOpenModalDelete}
            handleIsVisible={openModalDelete}
         >
            <FalseIcon />

            <Typography className="modal-title">Do you want delete?</Typography>

            <Typography className="modal-message">
               You can`t restore this file
            </Typography>

            <Box className="container-buttons">
               <Button variant="secondary" onClick={openModalDelete}>
                  CANCEL
               </Button>

               <Button onClick={deleteTest}>DELETE</Button>
            </Box>
         </Modal>

         <Modal
            isVisible={isOpenModalSave}
            handleIsVisible={openModalSave}
            isCloseIcon="true"
         >
            <StyledModalSave>
               <CancelIcon onClick={openModalSave} className="cancel" />

               <Box className="content-modal-save">
                  <Typography className="title" variant="label">
                     Title
                  </Typography>

                  <Input
                     type="text"
                     placeholder="Select the main idea"
                     value={optionTitle}
                     onChange={handleChangeInput}
                  />

                  <Box className="checkbox-container">
                     <Typography className="true-option">
                        Is true option ?
                     </Typography>

                     <Checkbox
                        checked={checkOption}
                        onChange={changeCheckbox}
                     />
                  </Box>
               </Box>

               <Box className="buttons-modal-container">
                  <Button variant="secondary" onClick={openModalSave}>
                     GO BACK
                  </Button>

                  <Button
                     variant="primary"
                     onClick={addHandler}
                     disabled={!optionTitle}
                  >
                     SAVE
                  </Button>
               </Box>
            </StyledModalSave>
         </Modal>
      </StyledContainer>
   )
}

export default SelectTheBestTitle

const StyledContainer = styled(Box)(({ theme }) => ({
   width: '820px',

   '& .add-button': {
      margin: '2rem 0 1.375rem 41.5rem',

      '& .icon': {
         width: '1rem',
         marginBottom: '0.2rem',
      },
   },

   '& > .passage': {
      marginTop: '1.6rem',

      '& .MuiOutlinedInput-root': {
         borderRadius: '8px',
         fontWeight: 400,

         '&.Mui-focused fieldset': {
            border: `1.53px solid ${theme.palette.primary.main}`,
         },

         '&:hover fieldset': {
            border: `1px solid ${theme.palette.primary.main}`,
         },
      },
   },

   '& .cards': {
      display: 'flex',
      justifyContent: 'start',
      flexDirection: 'column',
      gap: '1.1rem',
      margin: '1.5rem 0 2rem 0',
      width: '820px',

      '& .card-option': {},
   },

   '& .buttons': {
      display: 'flex',
      gap: '1.1rem',
      marginLeft: '37.4rem',
   },
}))

const StyledModalSave = styled(Box)(() => ({
   position: 'absolute',
   backgroundColor: '#fff',
   borderRadius: '1.25rem',
   boxShadow: '0rem 0.25rem 2.4375rem -0.3125rem rgba(196, 196, 196, 0.6)',
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   alignItems: 'center',

   '& .cancel': {
      cursor: 'pointer',
      marginLeft: ' 34rem',
      marginTop: ' 1rem',
   },

   '& .content-modal-save': {
      width: '32.3125rem',
      margin: '3rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',

      '& .title': {
         width: '2.33rem',
         height: '1.125rem',
         fontFamily: 'Poppins',
         fontWeight: '500',
         display: 'flex',
         alignItems: 'center',
         color: '#4B4759',
      },

      '& .checkbox-container': {
         display: 'flex',
         gap: '0.44rem',
         alignItems: 'center',

         '& .true-option': {
            fontFamily: 'Poppins',
         },
      },
   },

   '& .buttons-modal-container': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '1.5rem',
      gap: '1rem',
      backgroundColor: '#F0F1F1',
      width: '100%',
      height: '5rem',
      borderRadius: '0 0 1rem 1rem',
   },
}))
