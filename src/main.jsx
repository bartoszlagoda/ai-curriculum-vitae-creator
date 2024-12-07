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
import EditResume from './dashboard/resume/[resumeid]/edit/index.jsx'
import ViewResume from './my-resume/[resumeid]/view/index.jsx'

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
      },
      {
        path:'/dashboard/resume/:resumeid/edit',
        element:<EditResume/>,
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
  },
  {
    path:'/my-resume/:resumeid/view',
    element:<ViewResume/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
)
