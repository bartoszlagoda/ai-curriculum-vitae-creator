import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignInPage from './auth/sign-in/index.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    element:<App/>,
    children:[
      {
        path:'/dashboard',
        element:<Dashboard/>,
      }
    ]
  },
  {
    path:'/',
    element:<Home/>,
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
)
