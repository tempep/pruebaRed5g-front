import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { PublicLayout } from '../layouts/PublicLayout';
import { PrivateLayout } from "../layouts/PrivateLayout";
import { Disbursements } from "../pages/Disbursements";




export const router = createBrowserRouter([
    {
        path:'',
        element: <Navigate to={'/login'} replace />

    },
    {
        /// Public Routes
        path: '/login',
        element: <PublicLayout />,
        children: [
            {
                path: '',
                element: <LoginPage />
            }
        ]

    },
    /// Private Routes
    {
        path: '/sufipay/disbursements',
        element: <PrivateLayout />,
        children: [
            {
                path: '',
                element: <Disbursements />
            }
        ]
    },

    /// Wrong routes
    {
        path:'*',
        element: <Navigate to={'/'} replace={true} />
    }
])