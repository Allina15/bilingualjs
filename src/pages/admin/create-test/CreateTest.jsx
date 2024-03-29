import { useEffect, useState } from 'react'
import { Box, Skeleton, Typography, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Input from '../../../components/UI/Input'
import TestContainer from '../../../components/UI/TestContainer'
import Button from '../../../components/UI/buttons/Button'
import { TESTS_THUNKS } from '../../../store/slices/admin/tests/testsThunk'

const CreateTest = () => {
   const { test, isLoading } = useSelector((state) => state.tests)

   const { id } = useParams()

   const [formData, setFormData] = useState({
      title: '',
      shortDescription: '',
   })

   const isNewTest = id === undefined || id === ''

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value,
      })
   }

   useEffect(() => {
      if (id) {
         dispatch(TESTS_THUNKS.getTest({ id }))
      }
   }, [dispatch, id])

   useEffect(() => {
      if (!isNewTest && test) {
         setFormData({
            title: test.title || '',
            shortDescription: test.shortDescription || '',
         })
      }
   }, [isNewTest, test, id])

   const handleSave = () => {
      const testToSave = { ...formData }

      if (isNewTest) {
         dispatch(TESTS_THUNKS.addTest({ testData: testToSave, navigate }))
      } else {
         dispatch(
            TESTS_THUNKS.updateTest({ id, updatedTest: testToSave, navigate })
         )
      }
   }

   const isFormValid = formData.title !== '' && formData.shortDescription !== ''

   return (
      <TestContainer>
         <StyledContainer>
            <Typography className="label">Title</Typography>
            {isLoading ? (
               <Skeleton
                  variant="rounded"
                  width={900}
                  height={58}
                  className="skeleton-box"
               />
            ) : (
               <Input
                  className="input"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
               />
            )}

            <Typography className="label">Short Description</Typography>

            {isLoading ? (
               <Skeleton
                  variant="rounded"
                  width={900}
                  height={58}
                  className="skeleton-box"
               />
            ) : (
               <Input
                  className="input"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
               />
            )}

            <Box className="container-buttons">
               <Link to="/">
                  <Button variant="secondary">GO BACK</Button>
               </Link>

               <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={!isFormValid}
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

   '& > .container-buttons': {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
      marginTop: '0.7rem',
   },

   '& > .skeleton-box': {
      backgroundColor: '#e5e5e567',
      borderRadius: '8px',
      margin: '0 0.5rem 1rem 0',
   },
}))
