import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { Box, Typography, styled } from '@mui/material'
import { TESTS_THUNKS } from '../../../store/slices/admin/tests/testsThunk'
import TestContainer from '../../../components/UI/TestContainer'
import Button from '../../../components/UI/buttons/Button'
import Input from '../../../components/UI/Input'

const CreateTest = () => {
   const { test } = useSelector((state) => state.tests)

   const { id } = useParams()

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const isNewTest = id === undefined || id === ''

   const onSubmit = (values) => {
      if (isNewTest) {
         dispatch(TESTS_THUNKS.addTest({ testData: { ...values }, navigate }))
      } else {
         dispatch(
            TESTS_THUNKS.updateTest({
               id,
               updatedTest: { ...values },
               navigate,
            })
         )
      }
   }

   const { values, handleChange, handleBlur, handleSubmit, isValid, dirty } =
      useFormik({
         initialValues: {
            title: isNewTest && test ? '' : test?.title || '',
            shortDescription:
               isNewTest && test ? '' : test?.shortDescription || '',
         },

         onSubmit,
      })

   useEffect(() => {
      if (id) {
         dispatch(TESTS_THUNKS.getTest({ id }))
      }
   }, [dispatch, id])

   return (
      <TestContainer>
         <StyledContainer>
            <Typography className="label">Title</Typography>

            <Input
               className="input"
               name="title"
               value={values.title}
               onChange={handleChange}
               onBlur={handleBlur}
               autoComplete="off"
            />

            <Typography className="label">Short Description</Typography>

            <Input
               className="input"
               name="shortDescription"
               value={values.shortDescription}
               onChange={handleChange}
               onBlur={handleBlur}
               autoComplete="off"
            />

            <Box className="buttons-box">
               <Link to="/">
                  <Button variant="secondary">GO BACK</Button>
               </Link>

               <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={!dirty || !isValid}
               >
                  SAVE
               </Button>
            </Box>
         </StyledContainer>
      </TestContainer>
   )
}

export default CreateTest

const StyledContainer = styled(Box)(() => ({
   '& > .label': {
      paddingBottom: '10px',
      color: '#4B4759',
   },

   '& > .input': {
      marginBottom: '1.8rem',
   },

   '& > .buttons-box': {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
      marginTop: '0.7rem',
   },
}))
