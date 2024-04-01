import { useSearchParams } from 'react-router-dom'

export const useToggleModal = (query) => {
   const [searchParams, setSearchParams] = useSearchParams()

   const isModalOpen = Boolean(searchParams.get(query))

   const openModalHandler = () => {
      searchParams.set(query, 'open')

      setSearchParams(searchParams)
   }

   const closeModalHandler = () => {
      searchParams.delete(query)

      setSearchParams(searchParams)
   }

   return {
      openModalHandler,
      isModalOpen,
      closeModalHandler,
   }
}
