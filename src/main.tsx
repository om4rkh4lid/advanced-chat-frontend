import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='788804500894-1q4ti2bcv95de4h56ffcb1112onig42t.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
