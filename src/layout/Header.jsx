import React from 'react'
import { AppBar, Button, Typography, styled } from '@mui/material'
import BilingualLogoImage from '../assets/images/bilingual.png'

const Header = () => {
   return (
      <StyledContainer position="static">
         <img src={BilingualLogoImage} alt="Logo-Bilingual_Image" />
         <StyledTextCon>
            <StyledTests>TESTS</StyledTests>
            <StyledResults className="typography">
               RESULTS
               <StyledLogOutBtn>LOG OUT</StyledLogOutBtn>
            </StyledResults>
         </StyledTextCon>
      </StyledContainer>
   )
}

export default Header

const StyledContainer = styled(AppBar)(() => ({
   background: '#FFFFFF',
   boxShadow: 'none',
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   color: '#4C4859',
   '& img': {
      marginLeft: '120px',
      width: '174px',
      height: '42px',
   },
   height: '94px',
   width: '100%',
}))

const StyledTextCon = styled('div')(() => ({
   '& .MuiTypography-root': {
      fontSize: '15px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 'normal',
      textTransform: 'uppercase',
   },
   display: 'flex',
   alignItems: 'center',
   gap: '60px',
   marginRight: '120px',
   cursor: 'pointer',
}))

const StyledTests = styled(Typography)(() => ({
   fontSize: '15px',
   lineHeight: '18px',
   textTransform: 'uppercase',
   fontWeight: 700,
   cursor: 'pointer',
   textDecoration: 'none',
}))

const StyledResults = styled(Typography)(() => ({
   fontSize: '15px',
   fontWeight: 700,
   lineHeight: '18px',
   textTransform: 'uppercase',
   marginLeft: '60px',
   cursor: 'pointer',
   textDecoration: 'none',
}))

const StyledLogOutBtn = styled(Button)(() => ({
   border: '2px solid #4C4859',
   boxShadow:
      '0px 1px 2px rgba(76, 72, 89, 0.2), 0px 1px 2px rgba(76, 72, 89, 0.2)',
   borderRadius: '8px',
   background: 'none',
   fontSize: '14px',
   lineHeight: '16px',
   color: '#4C4C4C',
   padding: '13px 24px',
   fontWeight: 700,
   gap: '8px',
   marginLeft: '60px',
   '&:hover': {
      background: '#3A10E5',
      color: '#fff',
      border: '2px solid #3A10E5',
   },
}))
