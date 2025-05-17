import { lazy } from "react";


const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import ('./pages/Settings'));
const Login = lazy(() => import ('./pages/auth/Login'));
const SignUp = lazy(() => import ('./pages/auth/SignUp'));

const routes = [
    {
        path: '/',
        element : Home,
        name: 'home',
        exact: true
    },
    {
        path: '/profile',
        element : Profile,
        name: 'profile',
        exact: true
    },
    {
        path: '/settings',
        element : Settings,
        name: 'settings',
        exact: true
    },
    {
        path: '/login',
        element : Login,
        name: 'login',
        exact: true
    },
    {
        path: '/signUp',
        element : SignUp,
        name: 'signUp',
        exact: true
    },

]

export default routes