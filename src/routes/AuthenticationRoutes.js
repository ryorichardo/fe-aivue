import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('views/auth/Login')));

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'interview',
            children: [
                {
                    path: 'login',
                    element: <AuthLogin isClient />
                }
            ]
        }
    ]
};

export default AuthenticationRoutes;
