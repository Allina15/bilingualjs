import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Skeleton, Tooltip, Typography, styled } from '@mui/material'
import Switcher from '../../../components/UI/Switcher'
import Button from '../../../components/UI/buttons/Button'
import TestContainer from '../../../components/UI/TestContainer'
import DeleteModal from '../../../components/UI/modals/DeleteModal'
import { NoDataImage } from '../../../assets/images'
import { EditIcon, PlusIcon, TrashIcon } from '../../../assets/icons'
import { ROUTES } from '../../../routes/routes'
import { QUESTION_ACTIONS } from '../../../store/slices/admin/question/questionSlice'
import { QUESTION_THUNKS } from '../../../store/slices/admin/question/questionThunk'
import { TESTS_THUNKS } from '../../../store/slices/admin/tests/testsThunk'
import { questionTypeHandler } from '../../../utils/helpers'

const Questions = () => {
   const { test, isLoading } = useSelector((state) => state.tests)

   const [isVisible, setIsVisible] = useState(false)
   const [selectedQuestionId, setSelectedQuestionId] = useState(null)

   const { testId } = useParams()

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const navigateGoBackHandler = () => navigate('/')

   useEffect(() => {
      if (testId) dispatch(TESTS_THUNKS.getTest({ id: testId }))
   }, [testId])

   const toggleModal = (questionId) => {
      setSelectedQuestionId(questionId)
      setIsVisible((prev) => !prev)
   }

   const enableHandler = ({ id, value }) => {
      dispatch(
         QUESTION_THUNKS.updateQuestionByEnable({
            questionId: id,
            isEnable: value,
            testId,
         })
      )
   }

   const deleteQuestionHandler = () => {
      dispatch(
         QUESTION_THUNKS.deleteQuestion({
            questionId: selectedQuestionId,
            testId,
         })
      )

      setIsVisible(false)
   }

   const deleteQuestion = test?.question?.find(
      (test) => test.id === selectedQuestionId
   )?.title

   const navigateHandler = () => {
      navigate(
         `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/${testId}/${ROUTES.ADMIN.CREATE_QUESTION}`
      )

      dispatch(QUESTION_ACTIONS.changeIsUpdate(true))
   }

   const navigateEditHandler = (question, questionId) => {
      navigate(
         `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/${testId}/${ROUTES.ADMIN.UPDATE_QUESTION}/${questionId}`,
         { state: question }
      )

      dispatch(QUESTION_ACTIONS.changeInOpen(true))
   }

   return (
      <StyledContainer>
         <TestContainer>
            <Box className="title-container">
               {isLoading ? (
                  <Skeleton
                     variant="rounded"
                     width={480}
                     height={20}
                     className="skeleton-box"
                  />
               ) : (
                  <Box className="text">
                     <Typography className="title">Title:</Typography>

                     <Typography>{test?.title}</Typography>
                  </Box>
               )}

               {isLoading ? (
                  <Skeleton
                     variant="rounded"
                     width={400}
                     height={20}
                     className="skeleton-box"
                  />
               ) : (
                  <Box className="text">
                     <Typography className="title">
                        Short Description:
                     </Typography>

                     <Typography>{test?.shortDescription}</Typography>
                  </Box>
               )}

               {isLoading ? (
                  <Skeleton
                     variant="rounded"
                     width={200}
                     height={20}
                     className="skeleton-box"
                  />
               ) : (
                  <Box className="text">
                     <Typography className="title">Duration:</Typography>
                     <Typography>
                        {/* {test?.duration === 0 ? '00' : test?.duration}:00 */}
                        {test?.duration}:00
                     </Typography>
                  </Box>
               )}
            </Box>

            <Button
               icon={<PlusIcon className="plus" />}
               className="button"
               onClick={navigateHandler}
            >
               ADD MORE QUESTIONS
            </Button>

            <Box className="divider" />

            <StyledTable>
               {test && test?.question?.length > 0 ? (
                  <>
                     <Typography>#</Typography>
                     <Typography className="name">Name</Typography>
                     <Typography className="duration-time">Duration</Typography>
                     <Typography className="question-type">
                        Question Type
                     </Typography>
                  </>
               ) : null}
            </StyledTable>

            {test && test?.question?.length > 0 ? (
               test?.question?.map((item, index) =>
                  isLoading ? (
                     <Skeleton
                        key={item.id}
                        variant="rounded"
                        width={900}
                        height={66}
                        animation="wave"
                        className="skeleton-questions"
                     />
                  ) : (
                     <StyledBox key={item.id}>
                        <Typography className="numbering">
                           {index + 1}
                        </Typography>

                        <Tooltip title={item.title}>
                           <Typography className="name-props">
                              {item.title}
                           </Typography>
                        </Tooltip>

                        <Typography className="duration-props">
                           {item.duration} m
                        </Typography>

                        <Typography className="question-type-props">
                           {questionTypeHandler(item.questionType)}
                        </Typography>

                        <Box className="icons">
                           <Switcher
                              key={item.id}
                              className="switcher"
                              checked={item.enable}
                              onChange={(value) =>
                                 enableHandler({ value, id: item.id })
                              }
                           />

                           <EditIcon
                              className="edit"
                              onClick={() => navigateEditHandler(item, item.id)}
                           />

                           <TrashIcon
                              className="delete"
                              onClick={() => toggleModal(item.id)}
                           />
                        </Box>
                     </StyledBox>
                  )
               )
            ) : (
               <Box className="no-data-image">
                  <img src={NoDataImage} alt="no-data" />
               </Box>
            )}
            <Button
               className="go-back-button"
               variant="secondary"
               onClick={navigateGoBackHandler}
            >
               GO BACK
            </Button>
         </TestContainer>

         <DeleteModal
            isCloseIcon
            isVisible={isVisible}
            toggleModal={toggleModal}
            deleteHandler={deleteQuestionHandler}
         >
            <Typography className="title" variant="p">
               <Typography variant="span">Question: </Typography>

               {deleteQuestion}
            </Typography>

            <Typography className="modal-message">You can`t restore</Typography>
         </DeleteModal>
      </StyledContainer>
   )
}
export default Questions

const StyledContainer = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   width: 'auto',

   '& > div > .title-container': {
      paddingLeft: '1rem',
      paddingTop: '0.2rem',

      '& > .text': {
         display: 'flex',
         gap: '0.3rem',
         fontFamily: 'Poppins',
         fontSize: '1rem',
         overflow: 'hidden',
         maxWidth: '40rem',
         textOverflow: 'ellipsis',

         '& > .title': {
            color: '#3752B4',
         },
      },

      '& > .skeleton-box': {
         backgroundColor: '#e5e5e567',
         marginBottom: '0.5rem',
      },
   },

   '& > div > .skeleton-questions': {
      backgroundColor: '#e5e5e546',
      borderRadius: '8px',
   },

   '& > div > .button': {
      padding: '0.75rem 1.5rem 0.75rem 1rem',
      width: 'auto',
      gap: '0.5rem',
      margin: '0 1.75rem 0 40rem',

      '& > span > .plus': {
         width: '17px',
         height: '17px',
         marginTop: '-1rem',
      },

      '& > .text': {
         color: 'inherit',
         textDecoration: 'none',
         fontFamily: 'Poppins',
         fontSize: '14px',
      },

      '@media (max-width: 768px)': {
         margin: '2.75rem 0 0 0',
      },
   },

   '& > div > .go-back-button': {
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      color: '#3A10E5',
      border: '2px solid #3A10E5',
      background: '#FFFF',
      padding: '0.8125rem 1.5rem',
      height: '2.625rem',
      margin: 'auto',
      marginLeft: '48.6rem',
      marginTop: '0.8rem',
      width: '7.8rem',

      '& > .text': {
         display: 'flex',
         alignItems: 'center',
         textDecoration: 'none',
         color: 'inherit',
         fontFamily: 'Poppins',
         fontSize: '14px',
         fontWeight: '500',
      },

      '&:hover': {
         color: '#FFF',
         backgroundColor: '#3A10E5',
      },

      '@media (max-width: 800px)': {
         margin: '2.75rem 0 0 0',
      },
   },

   '& > div > .divider': {
      width: 'auto',
      height: '0.0625rem',
      margin: '0.5rem',
      border: '1px solid #D4D0D0',
      background: '#C4C4C4',
   },

   '& > div > .no-data-image': {
      margin: 'auto',
      maxWidth: '20rem',
      maxHeight: '15rem',

      '& > img': {
         width: '100%',
         height: '100%',
      },
   },
}))

const StyledTable = styled(Box)(() => ({
   display: 'flex',
   margin: '0 1.5rem',

   '& > .name': {
      marginLeft: '2.5rem',
   },

   '& > .duration-time': {
      marginLeft: '16.5rem',
   },

   '& > .question-type': {
      marginLeft: '3.8rem',
   },
}))

const StyledBox = styled(Box)(() => ({
   width: '100%',
   display: 'flex',
   backgroundColor: '#fff',
   color: '#4C4859',
   padding: '20px 25px',
   borderRadius: '0.5rem',
   boxShadow:
      '0px 4px 10px 0px rgba(0, 0, 0, 0.06), 0px -4px 10px 0px rgba(0, 0, 0, 0.06)',
   margin: 'auto',

   '& > .numbering': {
      width: '1rem',
   },

   '& > .name-props': {
      margin: '0 2rem',
      whiteSpace: 'nowrap',
      width: '13rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      cursor: 'pointer',
   },

   '& > .duration-props': {
      margin: '0 4.4rem',
      width: '2.5rem',
   },

   '& > .question-type-props': {
      margin: '0 0.6rem',
   },

   '&:hover': {
      backgroundColor: '#F6F6F6',
   },

   '& > .icons': {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      gap: '1.4rem',
      marginLeft: 'auto',
      cursor: 'pointer',

      '& > .edit:hover': {
         '& > g > path': {
            stroke: '#0F85F1',
         },
      },

      '& > .delete:hover': {
         '& > path': {
            stroke: '#F61414',
         },
      },
   },
}))
