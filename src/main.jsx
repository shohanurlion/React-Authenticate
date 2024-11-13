import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Componnet/Root/Root.jsx';
import Home from './Componnet/Home/Home.jsx'
import About from './Componnet/About/About.jsx';
import Contact from './Componnet/Contact/Contact.jsx';
import Service from './Componnet/Service/Service.jsx';
import Login from './Componnet/Login/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element:<Root></Root>,
    children: [
      {
        path: '/',
        element:<Home></Home>
      }, 
      {
        path: '/about',
        element:<About></About>
      },
      {
        path: '/contact',
        element:<Contact></Contact>
      },
      {
        path: '/service',
        element:<Service></Service>
      },
      {
        path: '/login',
        element:<Login></Login>
      },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
