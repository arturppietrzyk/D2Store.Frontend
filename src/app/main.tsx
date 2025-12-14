import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import RegisterUser from '../features/users/pages/RegisterUser.tsx';
import LoginUser from '../features/users/pages/LoginUser.tsx';
import NotFound from "../shared/pages/NotFound.tsx"; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../features/home/pages/Home.tsx';
import MainLayout from '../shared/layouts/MainLayout.tsx'; // Import MainLayout
import ProductDetailPage from '../features/home/pages/ProductDetailPage.tsx';

const router = createBrowserRouter([
  {
    element: <MainLayout />, // Use MainLayout as the root element for shared components
    children: [
      {path:"/", element:<HomePage/>}, // Home page is an Outlet of MainLayout
      {path:"/products/:id", element:<ProductDetailPage/>},
      {path:"/*", element:<NotFound/>} // Not Found page is also within the MainLayout
    ]
  },
  // Pages without the MainLayout (e.g., full screen login/register)
  {path:"/register", element:<RegisterUser/>},
  {path:"/login", element:<LoginUser/>},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>
);