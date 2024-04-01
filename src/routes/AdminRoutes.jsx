import { lazy } from 'react'
import { Navigate } from 'react-router'
import { ROUTES } from './routes'
import Suspense from './Suspense'

const AdminResults = lazy(() => import('../pages/admin/results/AdminResults'))
const InnerResults = lazy(
   () => import('../components/admin/results/InnerResults')
)
const TestQuestion = lazy(() => import('../components/UI/TestQuestion'))
const AdminTests = lazy(() => import('../pages/admin/tests/AdminTests'))
const CreateTest = lazy(() => import('../pages/admin/create-test/CreateTest'))
const Questions = lazy(() => import('../pages/admin/questions/Questions'))
const Question = lazy(() => import('../pages/admin/question/Question'))

export const ADMIN_ROUTES = [
   {
      path: ROUTES.ADMIN.INDEX,
      element: <Navigate to={ROUTES.ADMIN.TESTS} />,
   },
   {
      path: `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}`,
      element: (
         <Suspense>
            <AdminTests />
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.CREATE_TEST}`,
      element: (
         <Suspense>
            <CreateTest />
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.UPDATE_TEST}/:${ROUTES.ADMIN.ID}`,
      element: (
         <Suspense>
            <CreateTest />
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/:${ROUTES.ADMIN.TEST_ID}`,
      element: (
         <Suspense>
            <Questions />
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/:${ROUTES.ADMIN.TEST_ID}/${ROUTES.ADMIN.CREATE_QUESTION}`,
      element: (
         <Suspense>
            <Question />
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/:${ROUTES.ADMIN.TEST_ID}/${ROUTES.ADMIN.UPDATE_QUESTION}/:${ROUTES.ADMIN.QUESTION_ID}`,
      element: (
         <Suspense>
            <Question />
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.RESULTS}`,
      element: (
         <Suspense>
            <AdminResults />
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.RESULTS}/:${ROUTES.ADMIN.RESULT_ID}/${ROUTES.ADMIN.EVALUATIONS}`,
      element: (
         <Suspense>
            <InnerResults />
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.RESULTS}/:${ROUTES.ADMIN.RESULT_ID}/${ROUTES.ADMIN.EVALUATIONS}/:${ROUTES.ADMIN.ANSWER_ID}`,
      element: (
         <Suspense>
            <TestQuestion />
         </Suspense>
      ),
   },
]
