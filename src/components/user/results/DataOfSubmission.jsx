import { Typography, styled } from '@mui/material'

const DataOfSubmission = ({ row }) => {
   const dataTime = row.original.submissionTime.slice(0, 5)
   const dataDate = row.original.submissionDate.split('-').reverse().join('.')

   return (
      <>
         <StyledTypography>{dataTime}</StyledTypography>
         <StyledTypography>{dataDate}</StyledTypography>
      </>
   )
}

export default DataOfSubmission

const StyledTypography = styled(Typography)(() => ({
   fontFamily: 'Poppins',
   fontSize: '14px',
}))
