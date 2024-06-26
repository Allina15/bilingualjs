import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, ListItem, Typography, styled } from '@mui/material'
import Loading from '../../Loading'
import Button from '../../UI/buttons/Button'
import TestContainer from '../../UI/TestContainer'
import {
   ClockIcon,
   LaptopIcon,
   ScreenShotIcon,
   UserCardIcon,
} from '../../../assets/icons'
import { TestImage } from '../../../assets/images'
import { PRACTICE_TEST_THUNKS } from '../../../store/slices/user/practice-test/practiceTestThunk'
import { TESTS_LIST_THUNKS } from '../../../store/slices/user/tests-list/testsListThunk'
import { ROUTES } from '../../../routes/routes'

const InnerTest = () => {
   const { tests, isLoading } = useSelector((state) => state.testsList)
   const { isDisabled } = useSelector((state) => state.practiceTest)

   const { testId } = useParams()

   const dispatch = useDispatch()

   const navigate = useNavigate()

   useEffect(() => {
      dispatch(TESTS_LIST_THUNKS.getTest(testId))
   }, [dispatch, testId])

   useEffect(() => {
      dispatch(PRACTICE_TEST_THUNKS.getQuestions({ testId }))
   }, [dispatch, testId])

   const navigateHandler = () =>
      navigate(`${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}`)

   const practiceHandler = () =>
      navigate(
         `${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/${testId}/${ROUTES.USER.PRACTICE_TEST}`,
         { replace: true }
      )

   return (
      <StyledContainer>
         {isLoading && <Loading />}

         <MainContent key={tests?.id}>
            <Typography className="title" variant="h1">
               {tests?.title}
            </Typography>

            <Box className="content">
               <img src={TestImage} alt="test" className="test" />

               <Box className="description">
                  <ListItem>
                     <LaptopIcon />

                     <Typography>See what the test is like *</Typography>
                  </ListItem>

                  <ListItem>
                     <ClockIcon />

                     <Typography>
                        Practice takes just {tests.duration % 60} minutes
                     </Typography>
                  </ListItem>

                  <ListItem>
                     <UserCardIcon />

                     <Typography>Get an unofficial score estimate</Typography>
                  </ListItem>

                  <ListItem>
                     <ScreenShotIcon className="screen" />

                     <Typography>You cant take a screenshot </Typography>
                  </ListItem>
               </Box>
            </Box>

            <Typography>
               * The practice test may include question types that may not
               appear on the certified test.
            </Typography>

            <Box className="buttons">
               <Button variant="secondary" onClick={navigateHandler}>
                  CANCEL
               </Button>

               <Button onClick={practiceHandler} disabled={isDisabled}>
                  PRACTICE TEST
               </Button>
            </Box>
         </MainContent>
      </StyledContainer>
   )
}

export default InnerTest

const StyledContainer = styled(TestContainer)(() => ({
   overflow: 'hidden',
}))

const MainContent = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   flexDirection: 'column',
   gap: '3.725rem',
   color: '#4c4859',

   '& > .title': {
      fontSize: '30px !important',
      fontWeight: '300',
      fontFamily: 'Poppins',
   },

   '& > .content': {
      display: 'flex',
      alignItems: 'center',
      gap: '4rem',

      '& > .test': {
         maxWidth: '198.22px',
         width: '100%',
      },

      '& > .description': {
         display: 'flex',
         justifyContent: 'center',
         flexDirection: 'column',
         gap: '1rem',

         '& > li > .screen': {
            width: '1.8rem',
            height: '1.8rem',
         },

         '& > .MuiListItem-root': {
            gap: '1.5rem',

            '& > .MuiTypography-root': {
               fontSize: '17px',
               fontFamily: 'Poppins',
            },
         },
      },
   },

   '& > .MuiTypography-root': {
      fontSize: '15px',
      fontFamily: 'Poppins',
   },

   '& > .buttons': {
      display: 'flex',
      justifyContent: ' space-between',
      width: '100%',
      padding: '2rem 0 0 0',
      borderTop: 'solid 2px #D4D0D0',
   },
}))
