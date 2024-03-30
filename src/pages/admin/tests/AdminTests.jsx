import { useNavigate } from 'react-router-dom'
import { Box, styled } from '@mui/material'
import AdminTestList from '../../../components/admin/tests/AdminTestList'
import Button from '../../../components/UI/buttons/Button'
import TestContainer from '../../../components/UI/TestContainer'
import { PlusIcon } from '../../../assets/icons'
import { ROUTES } from '../../../routes/routes'

const AdminTests = () => {
   const navigate = useNavigate()

   const navigateHandler = () => {
      navigate(
         `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.CREATE_TEST}`
      )
   }

   return (
      <StyledContainer>
         <TestContainer>
            <Button
               className="button"
               icon={<PlusIcon className="plus" />}
               onClick={navigateHandler}
            >
               ADD NEW TEST
            </Button>

            <AdminTestList />
         </TestContainer>
      </StyledContainer>
   )
}

export default AdminTests

const StyledContainer = styled(Box)(() => ({
   '& > div > .MuiButton-root': {
      margin: 'auto',
      marginLeft: '44.3rem',
      width: '12rem',

      '& > span > .plus': {
         width: '0.9rem',
         height: '0.9rem',
         margin: '0.6rem',
         marginTop: '0.4rem',
      },
   },
}))
