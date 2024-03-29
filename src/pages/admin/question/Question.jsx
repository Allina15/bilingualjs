import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useLocation } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'
import TestType from '../../../components/admin/TestType'
import Input from '../../../components/UI/Input'
import Dropdown from '../../../components/UI/Dropdown'
import TestContainer from '../../../components/UI/TestContainer'
import { QUESTION_ACTIONS } from '../../../store/slices/admin/question/questionSlice'
import { OPTIONS } from '../../../utils/constants'
import { questionTypeHandler } from '../../../utils/helpers'

const Question = () => {
   const { options } = useSelector((state) => state.question)

   const dispatch = useDispatch()

   const { state } = useLocation()

   const [title, setTitle] = useState(state?.title || '')
   const [duration, setDuration] = useState(state?.duration || 0)
   const [selectType, setSelectType] = useState(
      questionTypeHandler(state?.questionType) || ''
   )

   const [searchParams, setSearchParams] = useSearchParams()

   useEffect(() => {
      const typeParam = searchParams.get('type')
      if (typeParam) {
         setSelectType(typeParam)
      }
   }, [searchParams])

   const changeSelecTypeHandler = (e) => {
      const newSelectType = e.target.value

      setSearchParams({ type: newSelectType })

      setSelectType(newSelectType)
   }

   const changeTitleHandler = (e) => {
      setTitle(e.target.value)

      if (state?.title.trim() !== e.target.value.trim()) {
         dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
      }
   }

   const changeDurationHandler = (e) => {
      let newValue = e.target.value.replace(/\D/g, '')
      newValue = newValue.slice(0, 2)

      const value = parseInt(newValue, 10)
      if (value > 15) {
         newValue = '15'
      }

      setDuration(newValue)

      if (
         state?.duration === e.target.value ||
         e.target.value === '0' ||
         e.target.value === ''
      ) {
         dispatch(QUESTION_ACTIONS.changeIsdisabled(true))
      } else {
         dispatch(QUESTION_ACTIONS.changeIsdisabled(false))
      }
   }

   useEffect(() => {
      dispatch(QUESTION_ACTIONS.updateOptions(options || []))
   }, [])

   useEffect(() => {
      const handleBeforeUnload = (event) => {
         event.preventDefault()
         event.returnValue = ''
      }

      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
         window.removeEventListener('beforeunload', handleBeforeUnload)
      }
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
                        Duration <br /> (in minutes)
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
               onChange={changeSelecTypeHandler}
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
