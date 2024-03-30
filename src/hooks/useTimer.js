import { useState, useEffect, useCallback } from 'react'

const useTimer = (durationInMinutes, timeIsUp, count) => {
   const durationInSeconds = durationInMinutes * 60

   const [time, setTime] = useState(durationInSeconds)
   const [percent, setPercent] = useState(0)

   useEffect(() => {
      setTime(durationInSeconds)
   }, [durationInSeconds, count])

   const calculatePercentage = useCallback(() => {
      const percent = (1 - time / durationInSeconds) * 100

      setPercent(percent)
   }, [durationInSeconds, time])

   useEffect(() => {
      calculatePercentage()
   }, [calculatePercentage])

   useEffect(() => {
      let timer = null

      const interval = 1000

      timer = setInterval(() => {
         setTime((prevTime) => {
            if (prevTime <= 0) {
               clearInterval(timer)
               timeIsUp()

               return 0
            }
            return prevTime - 1
         })
      }, interval)

      return () => clearInterval(timer)
   }, [durationInSeconds, timeIsUp])

   const minutes = Math.floor(time / 60)
   const seconds = Math.floor(time % 60)

   const timeObject = {
      minute: minutes.toString(),
      seconds: seconds.toString().padStart(2, '0'),
      percent,
   }

   return timeObject
}

export default useTimer
