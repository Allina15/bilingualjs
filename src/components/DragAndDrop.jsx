import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, styled } from '@mui/material'
import { PRACTICE_TEST_ACTIONS } from '../store/slices/user/practice-test/practiceTestSlice'

const DragAndDrop = ({ options }) => {
   const { correctOptions } = useSelector((state) => state.practiceTest)

   const [isDropped, setIsDropped] = useState(false)
   const [isDragging, setIsDragging] = useState(false)

   const dispatch = useDispatch()

   const onDragEndHandler = (e, option) => {
      e.preventDefault()

      const correctOption = correctOptions.find(
         (correctOption) => correctOption.id === option.id
      )

      if (isDropped) {
         if (correctOption) return correctOptions

         return dispatch(PRACTICE_TEST_ACTIONS.addCorrectOption(option))
      }

      setIsDropped(false)
      setIsDragging(false)

      return option
   }

   const onDropHandler = (e) => {
      e.preventDefault()

      setIsDropped(true)
   }

   const onDragOverHandler = (e) => {
      e.preventDefault()

      setIsDragging(true)
   }

   const optionDisabledHandler = (id) => {
      correctOptions.find((correctOption) => correctOption.id === id)
   }

   const deleteWordHandler = (id) => {
      dispatch(PRACTICE_TEST_ACTIONS.deleteCorrectOption(id))
   }

   return (
      <StyledContainer>
         <Box className="drag-container">
            {options.map((option) => (
               <Box
                  key={option.id}
                  draggable={!false}
                  className={`option-container ${
                     optionDisabledHandler(option.id) ? 'disabled' : ''
                  }`}
                  onDragEnd={(e) => onDragEndHandler(e, option)}
               >
                  <Typography className="option">
                     {option.optionTitle}
                  </Typography>
               </Box>
            ))}
         </Box>

         <Box className="bord-container">
            <StyledBord
               dragging={isDragging.toString()}
               onDrop={onDropHandler}
               onDragOver={onDragOverHandler}
            >
               {correctOptions?.length === 0 ? (
                  <Typography className="board-text">
                     Select words & drag here
                  </Typography>
               ) : (
                  correctOptions?.map(({ id, optionTitle }) => (
                     <Box
                        key={id}
                        className="option-container"
                        onClick={() => deleteWordHandler(id)}
                     >
                        <Typography className="option">
                           {optionTitle}
                        </Typography>
                     </Box>
                  ))
               )}
            </StyledBord>
         </Box>
      </StyledContainer>
   )
}

export default DragAndDrop

const StyledContainer = styled(Box)(({ theme }) => ({
   padding: '44px 0px',
   display: 'flex',
   flexDirection: 'column',
   gap: '1.5rem',
   width: '100%',

   '& > .drag-container': {
      display: 'flex',
      flexWrap: 'wrap',
   },

   '& div > .option-container': {
      border: '2px solid #D4D0D0',
      borderRadius: '0.5rem',
      padding: '0.5rem 2rem',
      cursor: 'pointer',
      margin: '0.3rem',

      '&.disabled': {
         opacity: 0.5,
         pointerEvents: 'none',
      },

      ':hover': {
         borderColor: theme.palette.primary.main,
      },

      ':active': {
         backgroundColor: theme.palette.primary.main,
         color: theme.palette.primary.white,
      },

      '& > .option': {
         fontFamily: 'Poppins',
         fontWeight: '500',
      },
   },

   '& > .bord-container': {
      display: 'flex',
      justifyContent: 'flex-end',
   },
}))

const StyledBord = styled(Box)(({ dragging }) => ({
   gap: '0.3rem',
   display: 'flex',
   flexWrap: 'wrap',
   maxWidth: '35rem',
   alignItems: 'center',
   borderRadius: '0.5rem',
   justifyContent: 'center',
   border: dragging === 'true' ? `1px dashed  #3A10E5` : '1px dashed',
   background: dragging === 'true' ? 'rgba(58, 16, 229, 0.1)' : '',
   padding: '3.5rem',

   '& > .board-text': {
      fontFamily: 'Poppins',
   },
}))
