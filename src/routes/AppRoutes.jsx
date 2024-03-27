import { lazy } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { ROLES, ROUTES } from './routes'
import { ADMIN_ROUTES } from './AdminRoutes'
import { USER_ROUTES } from './UserRoutes'
import ProtectedRoute from './ProtectedRoute'
import Suspense from './Suspense'

const Verification = lazy(() => import('../pages/verification/Verification'))
const AdminLayout = lazy(() => import('../layout/admin/AdminLayout'))
const UserLayout = lazy(() => import('../layout/user/UserLayout'))
const NotFound = lazy(() => import('../layout/NotFound'))
const SignIn = lazy(() => import('../pages/sign-in/SignIn'))
const SignUp = lazy(() => import('../pages/sign-up/SignUp'))
const Home = lazy(() => import('../pages/home/Home'))
const ForgotPassword = lazy(
   () => import('../pages/forgot-password/ForgotPassword')
)
const ChangePassword = lazy(
   () => import('../pages/password-change/ChangePassword')
)

const AppRoutes = () => {
   const router = createHashRouter([
      {
         path: '/',
         element: (
            <ProtectedRoute
               roles={[ROLES.USER, ROLES.GUEST]}
               fallbackPath={ROUTES.ADMIN.INDEX}
               Component={
                  <Suspense>
                     <Home />
                  </Suspense>
               }
            />
         ),
      },

      {
         path: ROUTES.SIGN_IN,
         element: (
            <Suspense>
               <SignIn />
            </Suspense>
         ),
      },

      {
         path: ROUTES.SIGN_UP,
         element: (
            <Suspense>
               <SignUp />
            </Suspense>
         ),
      },

      {
         path: ROUTES.FORGOT_PASSWORD.INDEX,
         element: (
            <Suspense>
               <ForgotPassword />
            </Suspense>
         ),
      },

      {
         path: `${ROUTES.FORGOT_PASSWORD.INDEX}/${ROUTES.FORGOT_PASSWORD.VERIFICATION}`,
         element: (
            <Suspense>
               <Verification />
            </Suspense>
         ),
      },

      {
         path: `${ROUTES.FORGOT_PASSWORD.INDEX}/${ROUTES.FORGOT_PASSWORD.VERIFICATION}/${ROUTES.FORGOT_PASSWORD.PASSWORD_CHANGE}`,
         element: (
            <Suspense>
               <ChangePassword />
            </Suspense>
         ),
      },

      {
         path: ROUTES.ADMIN.INDEX,
         element: (
            <ProtectedRoute
               roles={[ROLES.ADMIN]}
               fallbackPath="/"
               Component={
                  <Suspense>
                     <AdminLayout />
                  </Suspense>
               }
            />
         ),

         children: ADMIN_ROUTES,
      },

      {
         path: ROUTES.USER.INDEX,
         element: (
            <ProtectedRoute
               roles={[ROLES.USER]}
               fallbackPath="/"
               Component={
                  <Suspense>
                     <UserLayout />
                  </Suspense>
               }
            />
         ),

         children: USER_ROUTES,
      },

      {
         path: '*',
         element: (
            <Suspense>
               <NotFound />
            </Suspense>
         ),
      },
   ])

   return <RouterProvider router={router} />
}

export default AppRoutes
