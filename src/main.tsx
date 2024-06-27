import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './css/index.css'
import userStore from './utils/userStore.ts'
import { BrowserRouter } from 'react-router-dom'

const user = new userStore();

export const Context = createContext<{
  user: userStore
} | null>(null)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{user}}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Context.Provider>
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
