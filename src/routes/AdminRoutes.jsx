import { lazy } from 'react'
import { Navigate } from 'react-router'
import { ROUTES } from './routes'
import Suspense from './Suspense'
import Loading from '../components/Loading'
import InnerResults from '../pages/admin/results/InnerResults'
import TestQuestion from '../components/UI/TestQuestion'

const AdminResults = lazy(() => import('../pages/admin/results/AdminResults'))
const CreateTest = lazy(() => import('../pages/admin/create-test/CreateTest'))
const AdminTests = lazy(() => import('../pages/admin/tests/AdminTests'))
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
      path: `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.TESTS}/${ROUTES.ADMIN.QUESTIONS}/:${ROUTES.ADMIN.TEST_ID}/${ROUTES.ADMIN.UPDATE_QUESTION}`,
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
         <Suspense fallback={<Loading />}>
            <InnerResults />
         </Suspense>
      ),
   },

   {
      path: `${ROUTES.ADMIN.INDEX}/${ROUTES.ADMIN.RESULTS}/:${ROUTES.ADMIN.RESULT_ID}/${ROUTES.ADMIN.EVALUATIONS}/:${ROUTES.ADMIN.ANSWER_ID}`,
      element: (
         <Suspense fallback={<Loading />}>
            <TestQuestion />
         </Suspense>
      ),
   },
]
