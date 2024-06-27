import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from '../utils/routes'; 
import PageNotFound from '../pages/PageNotFound';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';

interface AppRouterProps {
  path: string;
  element: React.ComponentType;
}

const AppRouter: React.FC = () => {
  const context = useContext(Context);

  if (!context) {
    // Context is null, handle accordingly
    return <div>Error: User context not found</div>;
  }

  const { user } = context;

  return (
    <Routes>
      {user.isAuth && user.info.role === 'ADMIN' && adminRoutes.map(({ path, element: Component }: AppRouterProps) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {user.isAuth && authRoutes.map(({ path, element: Component }: AppRouterProps) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {publicRoutes.map(({ path, element: Component }: AppRouterProps) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default observer(AppRouter);
