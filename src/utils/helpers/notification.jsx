import { Box, Typography, styled } from '@mui/material'
import { toast } from 'react-toastify'
import {
   ExitIcon,
   NotificationErrorIcon,
   NotificationSuccessIcon,
} from '../../assets/icons'

export const showNotification = ({
   title = 'Success',
   message = 'Successfully',
   type = 'success',
   duration = 300000,
}) => {
   const icon =
      type === 'success' ? (
         <NotificationSuccessIcon />
      ) : (
         <NotificationErrorIcon />
      )

   toast[type](
      <>
         <StyledIcon className={type}> {icon}</StyledIcon>
         <StyledTitle variant="h1">{title}</StyledTitle>
         <StyledMessage>{message}</StyledMessage>
      </>,

      {
         autoClose: duration,
         closeOnClick: true,
         closeToast: <ExitIcon />,

         style: {
            padding: '1.5rem 0.5rem 1.5rem 0.5rem ',
            background: type === 'success' ? '#EAFBE7' : '#FFF1F0',
            border:
               type === 'success' ? '1px solid #8CDB95' : '1px solid #fb9998',
         },
      }
   )
}

const StyledIcon = styled(Box)(() => ({
   '&.success': {
      position: 'absolute',
      top: '27px',
   },

   '&.error': {
      position: 'absolute',
      top: '30px',
   },
}))

const StyledTitle = styled(Typography)(() => ({
   color: '#4C4859',
   fontFamily: 'Gilroy',
   fontSize: '1rem',
   fontWeight: 400,
   paddingLeft: '2rem',
}))

const StyledMessage = styled(Typography)(() => ({
   marginTop: '0.5rem',
   width: '100%',
   wordWrap: 'break-word',
   color: '#646464',
   fontSize: '1rem',
   fontWeight: 400,
   paddingLeft: '2rem',
   fontFamily: 'Poppins',
}))
