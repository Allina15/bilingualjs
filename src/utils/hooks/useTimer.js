import { useState, useEffect, useCallback } from 'react'

export const useTimer = (durationInMinutes, timeIsUp, count) => {
   const durationInSeconds = durationInMinutes * 60

   const storageKey = `question-durations`

   const storedDurationsString = sessionStorage.getItem(storageKey)
   const storedDurations = storedDurationsString
      ? storedDurationsString.split(',')
      : []

   const initialDuration = storedDurations[count]
      ? parseInt(storedDurations[count], 10)
      : durationInSeconds

   const [time, setTime] = useState(initialDuration)
   const [percent, setPercent] = useState(0)

   const updateStoredDurations = (index, duration) => {
      storedDurations[index] = duration.toString()
      sessionStorage.setItem(storageKey, storedDurations.join(','))
   }

   useEffect(() => {
      const timer = setInterval(() => {
         updateStoredDurations(count, time)
      }, 1000)

      return () => clearInterval(timer)
   }, [time, count])

   useEffect(() => {
      setTime(initialDuration)
   }, [durationInSeconds, count, initialDuration])

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
