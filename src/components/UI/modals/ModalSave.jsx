import { useState } from 'react'
import { Box, Modal, styled, Typography } from '@mui/material'
import Button from '../buttons/Button'
import Input from '../Input'
import { CancelIcon } from '../../../assets/icons'
import Checkbox from '../Checkbox'

const ModalSave = () => {
   const [isVisible, setIsVisidle] = useState(false)
   const handleIsVisible = () => setIsVisidle((prev) => !prev)
   return (
      <Container>
         <StyledOpenButton onClick={handleIsVisible}>SAVE</StyledOpenButton>
         <Modal open={isVisible} onClose={handleIsVisible}>
            <StyledModal>
               <StyledCloseIcon onClick={handleIsVisible} />
               <Box className="conForm">
                  <Typography className="title" variant="label">
                     Title
                  </Typography>
                  <Input placeholder="Select real English words" type="text" />
                  <Box className="checkCon">
                     <Typography className="trueOption">
                        Is true option?
                     </Typography>
                     <Checkbox />
                  </Box>
               </Box>
               <Box className="btns-GoBack-Save">
                  <Box className="conOfBtns">
                     <Button variant="secondary" onClick={handleIsVisible}>
                        Go back
                     </Button>
                     <Button variant="primary">Save</Button>
                  </Box>
               </Box>
            </StyledModal>
         </Modal>
      </Container>
   )
}

export default ModalSave

const Container = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
}))

const StyledModal = styled(Box)(() => ({
   position: 'absolute',
   top: '45%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   backgroundColor: '#fff',
   borderRadius: '1.25rem',
   boxShadow: '0rem 0.25rem 2.4375rem -0.3125rem rgba(196, 196, 196, 0.6)',
   width: '39.8125rem',
   height: '23.5rem',
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   alignItems: 'center',
   '& .conOfBtns': {
      width: '13.75rem',
      height: '2.625rem',
      marginLeft: '23.4rem',
      display: 'flex',
      gap: '1rem',
   },
   '& .trueOption': {
      fontFamily: 'Poppins',
   },
   '& .checkCon': {
      display: 'flex',
      gap: '0.88rem',
      alignItems: 'center',
   },
   '& .btns-GoBack-Save': {
      width: '39.8125rem',
      height: '5.875rem',
      borderRadius: '0rem 0rem 1.25rem 1.25rem',
      background: '#F0F1F1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   '& .title': {
      width: '2.33rem',
      height: '1.125rem',
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: '1rem',
      lineHeight: '2.33rem',
      display: 'flex',
      alignItems: 'center',
      color: '#4B4759',
   },
   '& .conForm': {
      width: '32.3125rem',
      marginTop: '2.5rem',
      marginBottom: '5.7rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
   },
   '& .checkedIcon': {},
}))

const StyledCloseIcon = styled(CancelIcon)(() => ({
   marginLeft: '34.44rem',
   marginTop: '1.25rem',
   cursor: 'pointer',
   transition: '0.3s',
   ':hover': {
      transform: 'scale(1.1)',
      textColor: '#fff',
   },
}))

const StyledOpenButton = styled('button')(() => ({
   width: '39.8125rem',
   height: '2.4375rem',
   background: '#4D9E3F',
   color: '#FFF',
   fontSize: '1.125rem',
   fontWeight: '500',
   fontFamily: 'Poppins',
   display: 'flex',
   textAlign: 'left',
   alignItems: 'center',
   paddingLeft: '1.37rem',
   cursor: 'pointer',
   border: 'none',
}))
