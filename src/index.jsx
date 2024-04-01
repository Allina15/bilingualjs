import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { injectStore } from './configs/axiosInstance'
import { fileInjectStore } from './configs/axiosInstanceFile'
import store, { persistor } from './store/store'
import App from './App'
import Themes from './components/Themes'
import Loading from './components/Loading'
import Notification from './components/Notification'
import './index.css'

injectStore(store)
fileInjectStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
   <StrictMode>
      <Provider store={store}>
         <PersistGate loading={<Loading />} persistor={persistor}>
            <Themes>
               <Notification />

               <App />
            </Themes>
         </PersistGate>
      </Provider>
   </StrictMode>
)
