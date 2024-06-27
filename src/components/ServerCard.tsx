import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../css/serverCard.css';
import defaultServerImage from '../assets/default-server-image.svg'; // Default image path

interface ServerCardProps {
  name: string;
  id: number;
}

const ServerCard: React.FC<ServerCardProps> = ({ name, id }) => {
  const [image, setImage] = useState<string | undefined>(undefined); // Используем undefined вместо null
  const location = useLocation()
  useEffect(() => {
    const getServerImage = async () => {
      try {
        const imagePath = await window.electron.ipcRenderer.invoke('get-image', name);
        setImage(imagePath);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    getServerImage();

    return () => {

    };
  }, [name]);
  console.log(location.pathname)
  return (
    <>
      <NavLink className='serverCard' to={`server/${id}`}>
        {image !== undefined ? (
          <img src={image} alt={name} />
        ) : (
          <img src={defaultServerImage} alt={name} />
        )}
        <div>
          <b style={{margin: 0}}>{name}</b>
        </div>
      </NavLink>
    </>
  );
};

export default ServerCard;
