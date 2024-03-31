import { Fragment, useState } from 'react'
import {
   Collapse,
   Divider,
   List,
   ListItemButton,
   Typography,
   styled,
} from '@mui/material'
import { PlusIcon } from '../../assets/icons'
import { QUESTIONS } from '../../utils/constants'

const FAQ = () => {
   const [expanded, setExpanded] = useState(null)

   const expandClickHandler = (index) => {
      setExpanded((prev) => (prev === index ? null : index))
   }

   return (
      <StyledList className="list">
         <Typography variant="h2" className="title">
            FAQ:
         </Typography>

         {QUESTIONS.map(({ question, answer }, index) => (
            <Fragment key={question}>
               <Divider className="divider" />

               <ListItemButton onClick={() => expandClickHandler(index)}>
                  <Typography className="question">{question}</Typography>

                  <StyledPlus
                     alt="plus"
                     rotated={expanded === index ? index : null}
                     index={index}
                  />
               </ListItemButton>

               <Collapse in={expanded === index} unmountOnExit>
                  <Typography className="answer">{answer}</Typography>
               </Collapse>
            </Fragment>
         ))}

         <Divider className="divider" />
      </StyledList>
   )
}

export default FAQ

const StyledList = styled(List)(({ theme }) => ({
   width: '100%',

   '& > .title': {
      color: theme.palette.primary.white,
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: '3.1875rem',
      margin: '0 0 0 30px',
   },

   '& > .divider': {
      background: '#4A4A4A',
      margin: '2.12rem',
   },

   '& .question': {
      color: theme.palette.primary.white,
      fontSize: '1.25rem',
      fontWeight: '600',
      margin: '1rem',
      width: 'auto',
      flexGrow: 1,
   },

   '& .answer': {
      color: theme.palette.primary.white,
      fontSize: '1.125rem',
      fontWeight: '300',
      width: 'auto',
      margin: '0 2rem',
      fontFamily: 'Poppins',
   },
}))

const StyledPlus = styled(PlusIcon)(({ rotated, index }) => ({
   cursor: 'pointer',
   transform: `rotate(${rotated === index ? '45deg' : '0'})`,
   transition: 'transform 0.3s ease',
   marginLeft: 'auto',
   marginRight: '1rem',
}))
