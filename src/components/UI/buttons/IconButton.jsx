import { IconButton as MuiIconButton } from '@mui/material'

const IconButton = ({ children, ...rest }) => (
   <MuiIconButton {...rest}>{children}</MuiIconButton>
)

export default IconButton
