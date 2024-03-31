import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { Box, Skeleton, Typography, styled } from '@mui/material'
import Button from '../../../components/UI/buttons/Button'
import TestContainer from '../../../components/UI/TestContainer'
import IconButton from '../../../components/UI/buttons/IconButton'
import { NoDataImage } from '../../../assets/images'
import { CheckedIcon, EyeIcon } from '../../../assets/icons'
import { ROUTES } from '../../../routes/routes'
import { SUBMITTED_RESULTS_THUNKS } from '../../../store/slices/admin/results/submitedResultsThunk'
import {
   questionTypeHandler,
   resultsStatusHandler,
} from '../../../utils/helpers'

const InnerResults = () => {
   const { evaluations, isLoading, isSendLoading } = useSelector(
      (state) => state.submitedResults
   )
   const { resultId } = useParams()

   const navigate = useNavigate()

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(SUBMITTED_RESULTS_THUNKS.getResult({ resultId }))
   }, [dispatch])

   const formatDate = (dateString) => {
      if (!dateString) return ''

      const date = new Date(dateString)

      return format(date, 'dd.MM.yyyy HH:mm')
   }

   const stopPropagationHandler = (e) => e.stopPropagation()

   const sendResultsHandler = () => {
      dispatch(SUBMITTED_RESULTS_THUNKS.postResult({ resultId, navigate }))
   }

   const navigateHandler = (answerId) => {
      navigate(
         `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.RESULTS}/${resultId}/${ROUTES.ADMIN.EVALUATIONS}/${answerId}`
      )
   }

   const isDisabled = evaluations?.answerResponses?.every(
      (response) => response.status === 'EVALUATED'
   )

   return (
      <TestContainer>
         <StyledContainer>
            <Box className="title-container">
               <Box className="title-box-left">
                  {isLoading ? (
                     <Skeleton
                        variant="rounded"
                        width={150}
                        height={20}
                        className="skeleton-box"
                     />
                  ) : (
                     <Box className="text">
                        <Typography className="title">User:</Typography>

                        <Typography>{evaluations?.fullName}</Typography>
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
                        <Typography className="title">Test:</Typography>

                        <Typography>{evaluations?.testName}</Typography>
                     </Box>
                  )}

                  {isLoading ? (
                     <Skeleton
                        variant="rounded"
                        width={280}
                        height={20}
                        className="skeleton-box"
                     />
                  ) : (
                     <Box className="text">
                        <Typography className="title">
                           Date of submission:
                        </Typography>

                        <Typography>
                           {formatDate(evaluations?.dateOfSubmission)}
                        </Typography>
                     </Box>
                  )}
               </Box>

               <Box className="title-box-right">
                  {isLoading ? (
                     <Skeleton
                        variant="rounded"
                        width={150}
                        height={20}
                        className="skeleton-box"
                     />
                  ) : (
                     <Box className="text">
                        <Typography className="title">Final Score :</Typography>

                        {evaluations?.answerResponses?.every(
                           (response) => response.status === 'EVALUATED'
                        ) ? (
                           <Typography className="evaluated">
                              {evaluations?.finalScore}
                           </Typography>
                        ) : (
                           <Typography>{evaluations?.finalScore}</Typography>
                        )}
                     </Box>
                  )}

                  {isLoading ? (
                     <Skeleton
                        variant="rounded"
                        width={190}
                        height={20}
                        className="skeleton-box"
                     />
                  ) : (
                     <Box className="text">
                        <Typography className="title">Final Status:</Typography>

                        {evaluations?.answerResponses?.every(
                           (response) => response.status === 'EVALUATED'
                        ) ? (
                           <Typography className="evaluated">
                              Evaluated
                           </Typography>
                        ) : (
                           <Typography>Not Evaluated</Typography>
                        )}
                     </Box>
                  )}

                  {isLoading ? (
                     <Skeleton
                        variant="rounded"
                        width={261}
                        height={42}
                        className="skeleton-box"
                     />
                  ) : (
                     <Button
                        variant="secondary"
                        className="button"
                        disabled={!isDisabled}
                        onClick={sendResultsHandler}
                        isLoading={isSendLoading}
                     >
                        SEND RESULTS TO USER`S EMAIL
                     </Button>
                  )}
               </Box>
            </Box>

            <StyledTable>
               {evaluations && evaluations?.answerResponses?.length > 0 ? (
                  <>
                     <Typography>#</Typography>
                     <Typography className="question">Question</Typography>
                     <Typography className="score">Score</Typography>
                     <Typography className="status">Status</Typography>
                  </>
               ) : null}
            </StyledTable>

            {evaluations && evaluations?.answerResponses?.length > 0 ? (
               evaluations?.answerResponses?.map(
                  ({ answerId, questionType, status, score }, index) =>
                     isLoading ? (
                        <Skeleton
                           key={answerId}
                           variant="rounded"
                           width={900}
                           height={66}
                           animation="wave"
                           className="skeleton-box"
                        />
                     ) : (
                        <StyledBox
                           key={answerId}
                           onClick={() => navigateHandler(answerId)}
                        >
                           <Typography
                              className="numbering"
                              onClick={stopPropagationHandler}
                           >
                              {index + 1}
                           </Typography>

                           <Typography
                              className="question-type"
                              onClick={stopPropagationHandler}
                           >
                              {questionTypeHandler(questionType)}
                           </Typography>

                           <Typography
                              className="score"
                              onClick={stopPropagationHandler}
                           >
                              {score} out of 10
                           </Typography>

                           {status === 'EVALUATED' ? (
                              <Typography
                                 className="status evaluated"
                                 onClick={stopPropagationHandler}
                              >
                                 {resultsStatusHandler(status)}
                              </Typography>
                           ) : (
                              <Typography
                                 className="status"
                                 onClick={stopPropagationHandler}
                              >
                                 {resultsStatusHandler(status)}
                              </Typography>
                           )}

                           <Box className="icons">
                              {status === 'EVALUATED' ? (
                                 <IconButton>
                                    <CheckedIcon />
                                 </IconButton>
                              ) : (
                                 <IconButton>
                                    <EyeIcon />
                                 </IconButton>
                              )}
                           </Box>
                        </StyledBox>
                     )
               )
            ) : (
               <Box className="no-data-image">
                  <img src={NoDataImage} alt="no-data" />
               </Box>
            )}
         </StyledContainer>
      </TestContainer>
   )
}

export default InnerResults

const StyledContainer = styled(Box)(({ theme }) => ({
   color: '#4C4859',

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
   },

   '& > .title-container': {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1.53px solid #C4C4C4',

      '& > .title-box-left': {
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
      },

      '& > .title-box-right': {
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'flex-end',
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
            color: '#F61414',

            '& > .title': {
               color: '#4C4859',
            },
         },
      },

      '& > div > .button': {
         marginBottom: '2rem',
         marginTop: '2rem',
         width: '270px',
         cursor: 'pointer',

         '&:hover': {
            background: 'none',
            color: theme.palette.primary.main,
         },
      },
   },

   '&  .evaluated': {
      color: '#2AB930',
   },

   '&  .skeleton-box': {
      backgroundColor: '#e5e5e567',
      marginBottom: '8px',
   },
}))

const StyledBox = styled(Box)(() => ({
   width: '100%',
   display: 'flex',
   backgroundColor: '#fff',
   color: '#4C4859',
   padding: '20px 25px',
   borderRadius: '0.5rem',
   marginBottom: '1rem',
   cursor: 'pointer',
   boxShadow:
      '0px 4px 10px 0px rgba(0, 0, 0, 0.06), 0px -4px 10px 0px rgba(0, 0, 0, 0.06)',

   '& > .numbering, & > .question-type, & > .score, & > .status': {
      cursor: 'auto',
   },

   '& > .numbering': {
      width: '1rem',
   },

   '& > .score': {
      margin: '0 2rem',
      width: '99px',
   },

   '& > .status': {
      margin: '0 4.4rem',
      color: '#F61414',
   },

   '& > .question-type': {
      margin: '0 1.2rem',
      width: '276px',
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
   },

   '& > .evaluated': {
      color: '#2AB930',
   },
}))

const StyledTable = styled(Box)(() => ({
   display: 'flex',
   margin: '2rem 0 1rem 1.5rem',

   '& > .question': {
      marginLeft: '1.6rem',
   },

   '& > .score': {
      marginLeft: '16.4rem',
   },

   '& > .status': {
      marginLeft: '9.9rem',
   },
}))
