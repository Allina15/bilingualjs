import { styled, Modal, Box, Typography } from '@mui/material'
import Button from '../buttons/Button'
import { CancelIcon, FalseIcon } from '../../../assets/icons'

const DeleteModal = ({ children, isVisible, deleteHandler, toggleModal }) => (
   <StyledModal open={isVisible} onClose={toggleModal}>
      <Box className="content">
         <Box>
            <CancelIcon onClick={toggleModal} className="cancel-icon" />
         </Box>

         <FalseIcon />

         <Typography className="modal-title">Do you want delete?</Typography>

         {children}

         <Box className="buttons-box">
            <Button variant="secondary" onClick={toggleModal}>
               CANCEL
            </Button>

            <Button onClick={deleteHandler}>DELETE</Button>
         </Box>
      </Box>
   </StyledModal>
)

export default DeleteModal

const StyledModal = styled(Modal)(() => ({
   display: 'flex',
   alignItems: 'center',
   borderStyle: 'none',
   borderRadius: '1.25rem',
   justifyContent: 'center',

   '& > .content': {
      width: '25.4375rem',
      display: 'flex',
      boxShadow: '0rem 0.25rem 2.4375rem -0.3125rem rgba(196, 196, 196, 0.6)',
      textAlign: 'center',
      alignItems: 'center',
      borderRadius: '1.25rem',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#fff',

      '& > .modal-title': {
         fontSize: '17px',
         marginTop: '2.2rem',
         fontWeight: 'bold',
      },

      '& > .title': {
         maxWidth: '10rem',
         fontSize: '1rem',
         overflow: 'hidden',
         fontFamily: 'Poppins',
         textOverflow: 'ellipsis',

         '& > span': {
            fontWeight: 'bold',
            fontFamily: 'Poppins',
         },
      },

      '& > .modal-message': {
         color: 'red',
         fontSize: '14px',
         marginBottom: '2.2rem',
      },

      '& > div > .cancel-icon': {
         cursor: 'pointer',
         marginTop: '1rem',
         marginLeft: '22rem',
      },

      '& > .buttons-box': {
         gap: '1rem',
         width: '25.4375rem',
         height: '5rem',
         display: 'flex',
         paddingTop: '1rem',
         borderRadius: '0 0 1.25rem 1.25rem',
         justifyContent: 'center',
         backgroundColor: '#F0F1F1',
      },
   },
}))
