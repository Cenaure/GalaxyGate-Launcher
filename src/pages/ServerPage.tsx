import { useEffect, useState } from 'react';
import '../css/serverPage.css'
interface ServerPageProps {
  
}
 
interface StatusTask {
  type: string;
  task: number;
  total: number;
}
const ServerPage: React.FC<ServerPageProps> = () => {
  const [statusTask, setStatusTask] = useState<StatusTask | null>(null)

  useEffect(() => {
    const handleProgressUpdate = (status: StatusTask) => {
      setStatusTask(status)
    };

    window.electron.ipcRenderer.on('progress-update', handleProgressUpdate);

    return () => {
      window.electron.ipcRenderer.off('progress-update', handleProgressUpdate);
    };
  }, []);

  const handleLaunch = async () => {
    const response = await window.electron.launchMinecraft();
    console.log(response);
  };

  return(
    <div className="serverPageContainer">
      <div className="content">Content</div>
      <div className="footer">
        <div className='progressBar'>
          {statusTask && <div className='progressText'>{statusTask.task} / {statusTask.total} | {Math.round(statusTask.task/statusTask.total*100)}%</div>}
          <progress max={statusTask?.total} value={statusTask?.task} />
        </div>
        
        <button className='playBtn' onClick={handleLaunch}>Играть</button>
      </div>
    </div>
  )
}
 
export default ServerPage;