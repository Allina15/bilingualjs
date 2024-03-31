import { useEffect, useRef, useState } from 'react'
import { Box, Tooltip, Typography, styled } from '@mui/material'
import { Howl, Howler } from 'howler'
import Checkbox from './Checkbox'
import Radio from './Radio'
import { AnimationSoundIcon, SoundIcon, TrashIcon } from '../../assets/icons'

const Option = ({
   icon,
   index,
   option,
   checked,
   isRadio,
   deletion,
   toggleModal,
   setOptionId,
   checkedHandler,
   selectedOptionId,
   setSelectedOptionId,
}) => {
   const { optionId, fileUrl, optionTitle: title, isCorrectOption } = option

   const [isChecked, setIsChecked] = useState(isCorrectOption)
   const [isPlaying, setIsPlaying] = useState(false)

   useEffect(() => {
      setIsChecked(isCorrectOption)
   }, [isCorrectOption])

   const audioRef = useRef(null)

   const toggleRadioHandler = () => {
      setSelectedOptionId(optionId)

      checkedHandler(optionId)
   }

   const toggleCheckboxHandler = () => {
      setIsChecked((prev) => !prev)

      checkedHandler(optionId)
   }

   const stopSoundHandler = () => {
      Howler.stop()

      setIsPlaying(false)
   }

   const startSoundHandler = () => {
      if (!isPlaying) stopSoundHandler()

      const sound = new Howl({
         src: fileUrl,
         html5: true,
         onend: () => setIsPlaying(false),
         onstop: () => setIsPlaying(false),
         onplay: () => setIsPlaying(true),
      })

      sound.play()

      setIsPlaying(true)
   }

   const deleteHandler = () => {
      toggleModal((prev) => !prev)

      setOptionId(optionId)
      stopSoundHandler()
   }

   return (
      <StyledContainer className="option">
         <Box className="content">
            <Typography>{index + 1}</Typography>

            {icon &&
               (isPlaying ? (
                  <AnimationSoundIcon
                     onClick={stopSoundHandler}
                     className="animation-sound"
                  />
               ) : (
                  <SoundIcon onClick={startSoundHandler} className="sound" />
               ))}

            <audio
               ref={audioRef}
               src={fileUrl}
               className="audio"
               type="audio/mp3"
               controls
            >
               <track src="captions.vtt" kind="captions" label="English" />
            </audio>
         </Box>

         <Tooltip title={title}>
            <Typography className="title-option">{title}</Typography>
         </Tooltip>

         <Box className="actions">
            {isRadio ? (
               <Radio
                  onClick={checked ? null : toggleRadioHandler}
                  checked={checked || optionId === selectedOptionId}
               />
            ) : (
               <Checkbox
                  onClick={checked ? null : toggleCheckboxHandler}
                  checked={isChecked}
               />
            )}

            {deletion === true ? (
               <TrashIcon className="trash" onClick={deleteHandler} />
            ) : null}
         </Box>
      </StyledContainer>
   )
}

export default Option

const StyledContainer = styled(Box)(() => ({
   gap: '2rem',
   border: '1.8px solid #BDBDBD',
   padding: '0.6rem 1rem 0.6rem 1rem ',
   display: 'flex',
   alignItems: 'center',
   borderRadius: '8px',
   justifyContent: 'flex-start',
   overflow: 'hidden',
   textOverflow: 'ellipsis',

   '& > .content': {
      gap: '0.85rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',

      '& > .title-option': {
         overflow: 'hidden',
         textOverflow: 'ellipsis',
         wordBreak: 'break-word',
      },

      '& > .audio': {
         display: 'none',
      },

      '& > .sound': {
         cursor: 'pointer',
      },

      '& > .animation-sound': {
         cursor: 'pointer',
         marginTop: '-2px',
      },
   },

   '& > .actions': {
      gap: '0.5rem',
      display: 'flex',
      alignItems: 'center',

      '& > .trash': {
         cursor: 'pointer',
      },
   },

   '& > div > .trash:hover': {
      '& > path ': {
         stroke: '#F61414',
      },
   },

   '& > .play-pause': {
      cursor: 'pointer',
   },
}))
