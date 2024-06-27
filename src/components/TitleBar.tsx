import React from 'react';
import closeIcon from '../assets/closeIcon.svg';
import maximizeIcon from '../assets/maximizeIcon.svg';
import minimizeIcon from '../assets/minimizeIcon.svg';

interface TitleBarProps {}

const TitleBar: React.FC<TitleBarProps> = () => {
  const closeWindow = () => {
    window.electron.ipcRenderer.invoke('close-window');
  };

  const maximizeWindow = () => {
    window.electron.ipcRenderer.invoke('maximize-window');
  };

  const minimizeWindow = () => {
    window.electron.ipcRenderer.invoke('minimize-window');
  };

  return (
    <div className="titleBarContainer">
      <button
        className='titleBarBtn'
        onClick={closeWindow}
        style={{ backgroundImage: `url(${closeIcon})` }}
      />
      <button
        className='titleBarBtn'
        onClick={maximizeWindow}
        style={{ backgroundImage: `url(${maximizeIcon})` }}
      />
      <button
        className="titleBarBtn"
        onClick={minimizeWindow}
        style={{ backgroundImage: `url(${minimizeIcon})` }}
      />
    </div>
  );
};

export default TitleBar;
