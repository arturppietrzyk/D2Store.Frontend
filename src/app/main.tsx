import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import RegisterUser from '../features/users/pages/RegisterUser.tsx';
import LoginUser from '../features/users/pages/LoginUser.tsx';
import NotFound from "../shared/pages/NotFound.tsx"; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../features/home/pages/Home.tsx';
import MainLayout from '../shared/layouts/MainLayout.tsx';
import ProductDetailPage from '../features/home/pages/ProductDetailPage.tsx';
import Account from '../features/users/pages/Account.tsx';
import { AuthProvider } from '../infrastructure/authContext.tsx'; 

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {path:"/", element:<HomePage/>},
      {path:"/products/:productId", element:<ProductDetailPage/>},
      {path: "/account", element: <Account />},
      {path:"/*", element:<NotFound/>}
    ]
  },
  {path:"/register", element:<RegisterUser/>},
  {path:"/login", element:<LoginUser/>},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>
);