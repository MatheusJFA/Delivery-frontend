import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from './pages/app/Dashboard'
import { SignIn } from './pages/auth/sign-in'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { SignUp } from './pages/auth/sign-up'
import { Orders } from './pages/app/orders'
import { NotFound } from './pages/app/notFound'

export const router = createBrowserRouter([
    {
        path: "/", element: <AppLayout />, errorElement: <NotFound />, children: [
            { path: '/', element: <Dashboard /> },
            { path: 'orders', element: <Orders /> },
        ]
    }
    ,
    {
        path: "/", element: <AuthLayout />, children: [
            { path: 'sign-in', element: <SignIn /> },
            { path: 'sign-up', element: <SignUp /> },
        ]
    },
    { path: 'terms', element: <div>Terms</div> },
    { path: 'privacy', element: <div>Privacy</div> },

])
