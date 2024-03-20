import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, ListItem, Typography, styled } from '@mui/material'
import { TESTS_LIST_THUNKS } from '../../../store/slices/user/tests/testsListThunk'
import { TestImage } from '../../../assets/images'
import { ROUTES } from '../../../routes/routes'
import TestContainer from '../../UI/TestContainer'
import Loading from '../../Loading'
import Button from '../../UI/buttons/Button'
import { ClockIcon, LaptopIcon, UserCardIcon } from '../../../assets/icons'

const InnerTest = () => {
   const { tests, isLoading } = useSelector((state) => state.testsList)

   const { testId } = useParams()

   const dispatch = useDispatch()

   const navigate = useNavigate()

   useEffect(() => {
      dispatch(TESTS_LIST_THUNKS.getTest(testId))
   }, [dispatch, testId])

   const navigateHandler = () => navigate(-1)

   const practiceHandler = () =>
      navigate(
         `${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/${testId}/${ROUTES.USER.PRACTICE_TEST}`
      )

   return (
      <StyledContainer>
         {isLoading && <Loading />}

         <MainContent key={tests.id}>
            <Typography className="title">{tests.title}</Typography>

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
                        Practice takes just {tests.duration % 60}
                     </Typography>
                  </ListItem>

                  <ListItem>
                     <UserCardIcon />

                     <Typography>Get an unofficial score estimate</Typography>
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

               <Button onClick={practiceHandler}>PRACTICE TEST</Button>
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
      fontSize: '28px',
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
