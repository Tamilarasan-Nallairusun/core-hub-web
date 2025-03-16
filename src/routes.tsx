import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';

// Lazy Load Pages for Performance Optimization
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

const routes: RouteObject[] = [
    {
        path:'',
        element:<AuthLayout/>,
        children:[
            {
                path:'',
                element:<Login/>,
                handle:{
                    title : 'Login'
                }
            },
            {
                path:'login',
                element:<Login/>,
                handle:{
                    title : 'Login'
                }
            },
            {
                path:'register',
                element:<Register/>,
                handle:{
                    title : 'Register'
                }
            }
        ]
    }
];

export default routes;
