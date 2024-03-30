import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes/routes'
import IconButton from '../../UI/buttons/IconButton'
import { CheckSquareIcon, EyeIcon } from '../../../assets/icons'

const SelectedResults = ({ resultId, status }) => {
   const navigate = useNavigate()

   const navigateHandler = () => {
      navigate(
         `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.RESULTS}/${resultId}/${ROUTES.ADMIN.EVALUATIONS}`
      )
   }

   return status === 'EVALUATED' ? (
      <IconButton onClick={navigateHandler}>
         <CheckSquareIcon className="evaluated" />
      </IconButton>
   ) : (
      <IconButton onClick={navigateHandler}>
         <EyeIcon />
      </IconButton>
   )
}

export default SelectedResults
