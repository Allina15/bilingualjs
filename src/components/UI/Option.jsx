import { useRef, useState } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { Howl, Howler } from 'howler'
import Checkbox from './Checkbox'
import Radio from './Radio'
import { AnimationSoundIcon, SoundIcon, TrashIcon } from '../../assets/icons'

const Option = ({
   icon,
   index,
   option,
   isRadio,
   toggleModal,
   setOptionId,
   checkedHandler,
   selectedOptionId,
   setSelectedOptionId,
}) => {
   const { id, fileUrl, optionTitle: title, isCorrectOption } = option

   const [isChecked, setIsChecked] = useState(isCorrectOption)
   const [isPlaying, setIsPlaying] = useState(false)

   const audioRef = useRef(null)

   const toggleRadioHandler = () => {
      setSelectedOptionId(id)

      checkedHandler(id)
   }

   const toggleCheckboxHandler = () => {
      setIsChecked((prev) => !prev)

      checkedHandler(id)
   }

   const stopSoundHandler = () => {
      Howler.stop()
      setIsPlaying(false)
   }

   const startSoundHandler = () => {
      if (!isPlaying) {
         stopSoundHandler()
      }

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

      setOptionId(id)

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

         <Typography className="title-option">{title}</Typography>

         <Box className="actions">
            {isRadio ? (
               <Radio
                  onClick={toggleRadioHandler}
                  checked={id === selectedOptionId}
               />
            ) : (
               <Checkbox onClick={toggleCheckboxHandler} checked={isChecked} />
            )}

            <TrashIcon className="trash" onClick={deleteHandler} />
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
