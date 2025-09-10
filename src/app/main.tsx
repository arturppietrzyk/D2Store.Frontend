import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
//import App from './App.tsx'
import RegisterUser from '../features/users/pages/RegisterUser.tsx';
import LoginUser from '../features/users/pages/LoginUser.tsx';
import NotFound from "../shared/pages/NotFound.tsx"; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../shared/pages/Home.tsx';

const router = createBrowserRouter([
  {path:"/", element:<HomePage/>},
  {path:"/register", element:<RegisterUser/>},
  {path:"/login", element:<LoginUser/>},
  {path:"/*", element:<NotFound/>}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>
);
