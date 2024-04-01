import { lazy } from 'react'
import { Navigate } from 'react-router'
import Suspense from './Suspense'
import { ROUTES } from './routes'

const PracticeTest = lazy(() => import('../pages/user/PracticeTest'))
const TestComplete = lazy(() => import('../pages/user/TestComplete'))
const InnerTest = lazy(() => import('../components/user/tests/InnerTest'))
const TestsList = lazy(() => import('../pages/user/tests/TestList'))
const Results = lazy(() => import('../pages/user/results/Results'))

export const USER_ROUTES = [
   {
      path: ROUTES.USER.INDEX,
      element: <Navigate to={ROUTES.USER.TESTS} />,
   },

   {
      path: `${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}`,
      element: (
         <Suspense>
            <TestsList />
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/:${ROUTES.USER.TEST_ID}`,
      element: (
         <Suspense>
            <InnerTest />
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/:${ROUTES.USER.TEST_ID}/${ROUTES.USER.PRACTICE_TEST}`,
      element: (
         <Suspense>
            <PracticeTest />,
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.USER.INDEX}/${ROUTES.USER.TESTS}/:${ROUTES.USER.TEST_ID}/${ROUTES.USER.PRACTICE_TEST}/${ROUTES.USER.COMPLETE}`,
      element: (
         <Suspense>
            <TestComplete />,
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.USER.INDEX}/${ROUTES.USER.RESULTS}`,
      element: (
         <Suspense>
            <Results />
         </Suspense>
      ),
   },
]
