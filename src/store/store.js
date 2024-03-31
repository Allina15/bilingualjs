import storageSession from 'redux-persist/lib/storage/session'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { submitedResultsSlice } from './slices/admin/results/submitedResultsSlice'
import { practiceTestSlice } from './slices/user/practice-test/practiceTestSlice'
import { testsListSlice } from './slices/user/tests/testsListSlice'
import { questionSlice } from './slices/admin/question/questionSlice'
import { resultsSlice } from './slices/user/results/resultsSlice'
import { answerSlice } from './slices/admin/answer/answerSlice'
import { testsSlice } from './slices/admin/tests/testsSlice'
import { authSlice } from './slices/auth/authSlice'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [testsSlice.name]: testsSlice.reducer,
   [answerSlice.name]: answerSlice.reducer,
   [resultsSlice.name]: resultsSlice.reducer,
   [questionSlice.name]: questionSlice.reducer,
   [testsListSlice.name]: testsListSlice.reducer,
   [practiceTestSlice.name]: practiceTestSlice.reducer,
   [submitedResultsSlice.name]: submitedResultsSlice.reducer,
})

const persistConfig = {
   key: 'BILINGUAL',
   storage: storageSession,
   whitelist: [authSlice.name],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   reducer: persistedReducer,

   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
})

export const persistor = persistStore(store)

export default store
