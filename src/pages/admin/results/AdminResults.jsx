import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, styled } from '@mui/material'
import Table from '../../../components/UI/Table'
import { NoDataImage } from '../../../assets/images'
import { SUBMITTED_RESULTS_THUNKS } from '../../../store/slices/admin/results/submitedResultsThunk'
import { ADMIN_COLUMNS } from '../../../utils/constants/admin-columns'

const AdminResults = () => {
   const { results, isLoading } = useSelector(
      (state) => state.submitedResultsSlice
   )

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(SUBMITTED_RESULTS_THUNKS.getAllResults())
   }, [dispatch])

   if (results.length === 0) {
      return (
         <StyledContainer>
            <img src={NoDataImage} alt="no-data" />
         </StyledContainer>
      )
   }

   return <Table columns={ADMIN_COLUMNS} data={results} isLoading={isLoading} />
}

export default AdminResults

const StyledContainer = styled(Box)(() => ({
   margin: 'auto',
   maxWidth: '33rem',
   maxHeight: '20rem',

   '& > img': {
      width: '100%',
      height: '100%',
   },
}))
