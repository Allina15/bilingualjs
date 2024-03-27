import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Skeleton, Typography, styled } from '@mui/material'
import { EditIcon, TrashIcon } from '../../../assets/icons'
import { TESTS_THUNKS } from '../../../store/slices/admin/tests/testsThunk'
import { NoDataImage } from '../../../assets/images'
import { ROUTES } from '../../../routes/routes'
import DeleteModal from '../../UI/modals/DeleteModal'
import Switcher from '../../UI/Switcher'

const AdminTestList = () => {
   const { tests, isLoading } = useSelector((state) => state.tests)

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const [isVisible, setIsVisible] = useState(false)
   const [selectedTestId, setSelectedTestId] = useState(null)

   const stopPropagationHandler = (e) => e.stopPropagation()

   useEffect(() => {
      dispatch(TESTS_THUNKS.getTests())
   }, [dispatch])

   const deleteTestHandler = (testId) => {
      dispatch(TESTS_THUNKS.deleteTest(testId))

      setIsVisible(false)
   }

   const isVisibleHandler = (e, testId) => {
      e.preventDefault()

      setSelectedTestId(testId)
      setIsVisible((prev) => !prev)
   }

   const enableHandler = ({ id, value }) => {
      dispatch(
         TESTS_THUNKS.updateTestByEnable({
            testId: id,
            enable: value,
         })
      )
   }

   const navigateHandler = (e, id) => {
      e.preventDefault()

      navigate(
         `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.UPDATE_TEST}/${id}`
      )
   }

   const deleteTest = tests?.find((test) => test.id === selectedTestId)?.title

   return (
      <StyledContainer>
         {tests?.length > 0 ? (
            tests.map(({ id, title, enable }) => (
               <Link
                  to={`${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/${id}`}
                  key={id}
                  className="test-link"
               >
                  {isLoading ? (
                     <Skeleton
                        key={id}
                        variant="rounded"
                        width={900}
                        height={66}
                        animation="wave"
                        className="skeleton-box"
                     />
                  ) : (
                     <Box className="test">
                        <Typography className="title">{title}</Typography>

                        <Box className="icons">
                           <Box onClick={stopPropagationHandler}>
                              <Switcher
                                 checked={enable}
                                 onChange={(value) =>
                                    enableHandler({ value, id })
                                 }
                              />
                           </Box>

                           <EditIcon
                              className="edit"
                              onClick={(e) => navigateHandler(e, id)}
                           />

                           <TrashIcon
                              className="delete"
                              onClick={(e) => isVisibleHandler(e, id)}
                           />
                        </Box>
                     </Box>
                  )}
               </Link>
            ))
         ) : (
            <Box className="no-data-image">
               <img src={NoDataImage} alt="no-data" />
            </Box>
         )}

         <DeleteModal
            isVisible={isVisible}
            toggleModal={isVisibleHandler}
            deleteHandler={() => deleteTestHandler(selectedTestId)}
         >
            <Typography className="title">
               <Typography variant="span">Test: </Typography>

               {deleteTest}
            </Typography>

            <Typography className="modal-message">
               You can`t restore this test
            </Typography>
         </DeleteModal>
      </StyledContainer>
   )
}

export default AdminTestList

const StyledContainer = styled(Box)(() => ({
   '& > .no-data-image': {
      margin: 'auto',
      maxWidth: '20rem',
      maxHeight: '18rem',

      '& > img': {
         width: '100%',
         height: '100%',
      },
   },

   '& > .test-link': {
      textDecoration: 'none',
      color: 'inherit',

      '& > .skeleton-box': {
         backgroundColor: '#e5e5e567',
         marginBottom: '0.5rem',
      },

      '& > .test': {
         width: '100%',
         height: 'auto',
         display: 'flex',
         backgroundColor: '#fff',
         color: '#4C4859',
         padding: '20px 25px',
         borderRadius: '0.5rem',
         boxShadow:
            '0px 4px 10px 0px rgba(0, 0, 0, 0.06), 0px -4px 10px 0px rgba(0, 0, 0, 0.06)',
         marginBottom: '0.94rem',
         cursor: 'pointer',
         position: 'relative',

         '& > .title': {
            maxWidth: '20rem',
            fontFamily: 'Poppins',
            fontSize: '1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
         },

         '&:hover': {
            backgroundColor: '#f6f6f6',
         },

         '& > .icons': {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '1.4rem',
            display: 'flex',
            gap: '1.4rem',

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
      },
   },
}))
