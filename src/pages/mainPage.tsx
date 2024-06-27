import '../css/App.css'

interface ComponentProps {

}

const MainPage: React.FC<ComponentProps> = () => {
  //let location = useLocation()

  /*
  const handleLaunch = async () => {
    const response = await window.electron.launchMinecraft();
    console.log(response);
  };
  */

  /*
  const func = async () => {
    const response = await window.electron.ping()
    console.log(response) // prints out 'pong'
  }
  */

  return (
    <div className='mainPageContainer'>
      Выберите сервер для игры
      {/*<button onClick={handleLaunch}>Запустить шарманку (помолитесь а то не всегда работає)</button>*/}
      {/*<p>{location.pathname}</p>*/}
    </div>
  )
}

export default MainPage
