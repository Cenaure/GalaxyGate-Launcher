import './css/App.css'

import Navbar from './components/Navbar'
import AppRouter from './components/AppRouter'
import TitleBar from './components/TitleBar'

interface ComponentProps {

}

const App: React.FC<ComponentProps> = () => {

  return(
    <div className='viewArea'>
      <TitleBar />
      <div className='container'>
        <Navbar />
        <AppRouter />
      </div>
    </div>
  )
}

export default App
