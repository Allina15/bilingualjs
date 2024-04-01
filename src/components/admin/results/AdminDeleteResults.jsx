import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography } from '@mui/material'
import IconButton from '../../UI/buttons/IconButton'
import DeleteModal from '../../UI/modals/DeleteModal'
import { TrashIcon } from '../../../assets/icons'
import { SUBMITTED_RESULTS_THUNKS } from '../../../store/slices/admin/submited-results/submitedResultsThunk'

const AdminDeleteResults = ({ row }) => {
   const [isVisible, setIsVisible] = useState(false)

   const dispatch = useDispatch()

   const deleteHandler = () => {
      dispatch(
         SUBMITTED_RESULTS_THUNKS.deleteResult({
            resultId: row.original.resultId,
         })
      )

      setIsVisible(false)
   }

   const isVisibleHandler = (e) => {
      e.preventDefault()

      setIsVisible((prev) => !prev)
   }

   return (
      <Box>
         <IconButton onClick={isVisibleHandler}>
            <TrashIcon />
         </IconButton>

         <DeleteModal
            deleteHandler={deleteHandler}
            isVisible={isVisible}
            toggleModal={isVisibleHandler}
         >
            <Typography className="title" variant="p">
               <Typography variant="span">Test name: </Typography>

               {row.original.testName}
            </Typography>

            <Typography className="modal-message">You can`t restore</Typography>
         </DeleteModal>
      </Box>
   )
}

export default AdminDeleteResults
