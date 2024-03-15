import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { SUBMITTED_RESULTS_THUNKS } from '../../../store/slice/admin/results/submitedResultsThunk'
import { TrashIcon } from '../../../assets/icons'
import DeleteModal from '../../UI/modals/DeleteModal'
import IconButton from '../../UI/buttons/IconButton'

const AdminDeleteResults = ({ resultId }) => {
   const [isVisible, setIsVisible] = useState(false)

   const dispatch = useDispatch()

   const deleteHandler = () => {
      dispatch(SUBMITTED_RESULTS_THUNKS.deleteResults({ resultId }))

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
            <Typography className="modal-message">You can`t restore</Typography>
         </DeleteModal>
      </Box>
   )
}

export default AdminDeleteResults
