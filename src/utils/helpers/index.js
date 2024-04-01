import { QUESTION_TITLES, QUESTION_TYPES } from '../constants'

const showErrorSignUp = (errors) => {
   let errorMessage = null

   if (Object.keys(errors).length > 1) {
      errorMessage = 'Please fill in all fields'
   } else if (errors?.firstName) {
      errorMessage = `Incorrect ${errors.firstName}`
   } else if (errors?.lastName) {
      errorMessage = `Incorrect ${errors.lastName}`
   } else if (errors?.email) {
      errorMessage = `Incorrect ${errors.email}`
   } else if (errors?.password) {
      errorMessage = `Incorrect ${errors.password}`
   }

   return errorMessage
}

const showErrorSignIn = (errors) => {
   let errorMessage = null

   if (Object.keys(errors).length > 1) {
      errorMessage = 'Please fill in all fields'
   } else if (errors?.password) {
      errorMessage = `Incorrect ${errors.password}`
   }

   return errorMessage
}

const showErrorForgotPassword = (errors) => {
   let errorMessage = null

   if (Object.keys(errors).length > 1) {
      errorMessage = 'Please fill in the field!'
   } else if (errors?.email) {
      errorMessage = `Incorrect ${errors.email}`
   } else if (errors?.uniqueIdentifier) {
      errorMessage = `Incorrect ${errors.uniqueIdentifier}`
   }

   return errorMessage
}

const showErrorVerification = (errors) => {
   let errorMessage = null

   if (Object.keys(errors).length > 1) {
      errorMessage = 'Please fill in the field!'
   } else if (errors?.uniqueIdentifier) {
      errorMessage = `Incorrect ${errors.uniqueIdentifier}`
   }

   return errorMessage
}

const showErrorChangePassword = (errors) => {
   let errorMessage = null

   if (Object.keys(errors).length > 1) {
      errorMessage = 'Please fill in the field!'
   } else if (errors?.newPassword !== errors?.confirmPassword) {
      errorMessage = 'New password and confirm password do not match'
   }

   return errorMessage
}

const questionTypeHandler = (type) => {
   switch (type) {
      case QUESTION_TITLES.SELECT_MAIN_IDEA:
         return QUESTION_TYPES.SELECT_MAIN_IDEA

      case QUESTION_TITLES.SELECT_THE_BEST_TITLE:
         return QUESTION_TYPES.SELECT_THE_BEST_TITLE

      case QUESTION_TITLES.RECORD_SAYING:
         return QUESTION_TYPES.RECORD_SAYING

      case QUESTION_TITLES.DESCRIBE_IMAGE:
         return QUESTION_TYPES.DESCRIBE_IMAGE

      case QUESTION_TITLES.SELECT_REAL_ENGLISH_WORD:
         return QUESTION_TYPES.SELECT_REAL_ENGLISH_WORD

      case QUESTION_TITLES.LISTEN_AND_SELECT_WORD:
         return QUESTION_TYPES.LISTEN_AND_SELECT_WORD

      case QUESTION_TITLES.TYPE_WHAT_YOU_HEAR:
         return QUESTION_TYPES.TYPE_WHAT_YOU_HEAR

      case QUESTION_TITLES.RESPOND_IN_AT_LEAST_N_WORDS:
         return QUESTION_TYPES.RESPOND_IN_AT_LEAST_N_WORDS

      case QUESTION_TITLES.HIGHLIGHTS_THE_ANSWER:
         return QUESTION_TYPES.HIGHLIGHTS_THE_ANSWER

      default:
         return 'Select the type'
   }
}

const resultsStatusHandler = (status) => {
   switch (status) {
      case 'NOT_EVALUATED':
         return 'Not evaluated'

      case 'EVALUATED':
         return 'Evaluated'

      default:
         return ''
   }
}

const countWords = (text) => {
   const wordsArray = text.split(' ').filter((word) => word !== '')

   return wordsArray?.length
}

export {
   showErrorSignUp,
   showErrorSignIn,
   showErrorForgotPassword,
   showErrorVerification,
   showErrorChangePassword,
   questionTypeHandler,
   resultsStatusHandler,
   countWords,
}
