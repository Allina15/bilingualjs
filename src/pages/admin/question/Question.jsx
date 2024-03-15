import { useState, useEffect } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { QUESTION_ACTIONS } from '../../../store/slices/admin/question/questionSlice'
import { OPTIONS } from '../../../utils/constants'
import TestContainer from '../../../components/UI/TestContainer'
import TestType from '../../../components/admin/TestType'
import Dropdown from '../../../components/UI/Dropdown'
import Input from '../../../components/UI/Input'

const Question = () => {
   const { options } = useSelector((state) => state.question)

   const dispatch = useDispatch()

   const [title, setTitle] = useState('')
   const [duration, setDuration] = useState(1)
   const [selectType, setSelectType] = useState('')

   const changeTitleHandler = (e) => setTitle(e.target.value)

   const changeDurationHandler = (e) => {
      const newValue = e.target.value.replace(/\D/g, '')

      const limitedValue = newValue.slice(0, 2)

      setDuration(limitedValue)
   }

   const changeSelecTypeHandler = (e) => setSelectType(e.target.value)

   useEffect(() => {
      dispatch(QUESTION_ACTIONS.updateOptions(options || []))
   }, [])

   return (
      <TestContainer>
         <StyledContainer>
            <Box className="container">
               <Typography className="text title" variant="label">
                  Title
               </Typography>

               <Box className="input-container">
                  <Input
                     className="input-title"
                     placeholder="Enter the title ....."
                     onChange={changeTitleHandler}
                     value={title}
                     autoComplete="off"
                  />

                  <Box className="duration-container">
                     <Typography className="text duration">
                        Duration <br /> (in seconds)
                     </Typography>

                     <Input
                        className="duration-input"
                        placeholder="15:00"
                        value={duration}
                        onChange={changeDurationHandler}
                        inputProps={{ min: 0, max: 15 }}
                        type="number"
                        autoComplete="off"
                     />
                  </Box>
               </Box>

               <Typography className="text type" variant="label">
                  Type
               </Typography>

               <Box>
                  <Dropdown
                     className="dropdown"
                     value={selectType}
                     onChange={changeSelecTypeHandler}
                     options={OPTIONS}
                  />
               </Box>
            </Box>

            <TestType
               duration={duration}
               setDuration={setDuration}
               selectType={selectType}
               title={title}
               setTitle={setTitle}
               setSelectType={setSelectType}
            />
         </StyledContainer>
      </TestContainer>
   )
}

export default Question

const StyledContainer = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   alignItems: 'center',

   '& > .container': {
      marginTop: '2.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '1.25rem',

      '& > .text': {
         fontFamily: 'Poppins',
         fontWeight: '500',
      },

      '& > .title': {
         marginRight: '49rem',
         color: '#4B4759',
         fontFamily: 'Poppins',
         fontWeight: '500',
      },

      '& > .input-container': {
         display: 'flex',
         gap: '1.3rem',

         '& > .input-title': {
            background: '#fff',
            width: '43.6rem',
            height: '2.875rem',
            borderRadius: '0.5rem',
            paddingBottom: '3.5rem',
            color: '#4C4859',
         },

         '& > .duration-container': {
            marginTop: '-4.30rem',

            '& > .duration': {
               marginBottom: '1.3rem',
               color: '#4B4759',
            },

            '& > .duration-input': {
               width: '6.5625rem',
               height: '2.875rem',
               borderRadius: '0.5rem',
            },
         },

         '& div > .MuiOutlinedInput-input[type="number"]::-webkit-inner-spin-button':
            {
               display: 'none',
            },
      },

      '& > .type': {
         color: '#4B4759',
         margin: '0.8rem 49rem -0.5rem 0',
      },

      '& > div > .dropdown': {
         borderRadius: '0.5rem',
         width: '823px',
      },
   },
}))
