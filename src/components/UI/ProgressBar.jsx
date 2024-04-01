import { Box, Typography, styled } from '@mui/material'
import useTimer from '../../hooks/useTimer'

const ProgressBar = ({ duration, timeIsUp, count }) => {
   const { minute, seconds, percent } = useTimer(duration, timeIsUp, count)

   return (
      <StyledContainer>
         <Box className="block-progress-bar">
            <Typography className="duration">
               {minute}:{seconds}
            </Typography>

            <Box className="progressbar">
               <Box
                  className="progressbar-line"
                  style={{ width: `${100 - percent}%` }}
               />
            </Box>
         </Box>
      </StyledContainer>
   )
}

export default ProgressBar

const StyledContainer = styled(Box)(() => ({
   width: '100%',
   maxWidth: '56.875rem',
   paddingTop: '1px',

   '& > .block-progress-bar': {
      width: '100%',
      height: '52px',
   },

   '& > .duration': {
      color: '#4C4859',
      marginBottom: '20px',
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: '28px',
      lineHeight: '24px',
   },

   '& > .progressbar': {
      overflow: 'hidden',
      width: '100%',
      height: '8px',
      borderRadius: '5px',
      backgroundColor: '#eee',

      '& > .progressbar-line': {
         height: '100%',
         backgroundColor: '#3a10e5',
         transition: 'width 0.6s',
         borderRadius: '5px',
      },
   },
}))
