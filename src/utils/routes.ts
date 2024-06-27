import MainPage from "../pages/mainPage";
import ServerPage from "../pages/ServerPage";

interface Route {
  path: string,
  element: React.ComponentType
}

export const authRoutes: Route[] = [
  {
    path: '/',
    element: MainPage,
  },
  {
    path: '/server/:id',
    element: ServerPage
  }
]

export const publicRoutes: Route[] = [
  {
    path: '/',
    element: MainPage
  },
]

export const adminRoutes: Route[] = [
  {
    path: '/',
    element: MainPage
  },
]