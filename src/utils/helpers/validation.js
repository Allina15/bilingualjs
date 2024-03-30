import * as Yup from 'yup'

const passwordRegex = '^(?=.*[A-Z])(?=.*\\d).*$'
const gmailRegex = /@gmail\.com$/

const VALIDATION_SIGN_IN = Yup.object().shape({
   email: Yup.string().email('Invalid email').required('Email is required'),
   password: Yup.string()
      .min(6, 'Password must be 6 characters long')
      .max(100)
      .matches(passwordRegex, 'Password requires a capital letter/number')
      .required('Password is required'),
})

const VALIDATION_SIGN_UP = Yup.object().shape({
   firstName: Yup.string().required('First name is required'),
   lastName: Yup.string().required('Last name is required'),
   email: Yup.string().email('Invalid email').required('Email is required'),
   password: Yup.string()
      .min(6, 'Password must be 6 characters long')
      .max(100)
      .matches(passwordRegex, 'Password requires a capital letter/number')
      .required('Password is required'),
})

const VALIDATION_FORGOT_PASSWORD = Yup.object().shape({
   email: Yup.string()
      .email('Invalid email')
      .required('Email is required')
      .matches(gmailRegex, 'Email must contain @gmail.com'),
})

const VALIDATION_VERIFICATION = Yup.object().shape({
   uniqueIdentifier: Yup.string().required('Code is required'),
})

const VALIDATION_CHANGE_PASSWORD = Yup.object().shape({
   newPassword: Yup.string()
      .matches(
         passwordRegex,
         'Password must contain at least 1 uppercase letter and at least one number'
      )
      .required('New password is required'),
   confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})

export {
   VALIDATION_SIGN_IN,
   VALIDATION_SIGN_UP,
   VALIDATION_FORGOT_PASSWORD,
   VALIDATION_VERIFICATION,
   VALIDATION_CHANGE_PASSWORD,
}
