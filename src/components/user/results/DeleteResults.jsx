import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Typography } from '@mui/material'
import DeleteModal from '../../UI/modals/DeleteModal'
import IconButton from '../../UI/buttons/IconButton'
import { TrashIcon } from '../../../assets/icons'
import { MY_RESULTS_THUNKS } from '../../../store/slices/user/results/resultsThunk'

const DeleteResults = ({ row }) => {
   const [isVisible, setIsVisible] = useState(false)

   const dispatch = useDispatch()

   const isVisibleHandler = (e) => {
      e.preventDefault()

      setIsVisible((prev) => !prev)
   }

   const deleteHandler = () => {
      dispatch(
         MY_RESULTS_THUNKS.deleteResult({ resultId: row.original.resultId })
      )

      setIsVisible(false)
   }

   return (
      <>
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
      </>
   )
}

export default DeleteResults
