import { lazy } from 'react';

import Loadable from 'components/Loadable';
import ClientLayout from 'layout/ClientLayout';

const PracticePage = Loadable(lazy(() => import('views/client-views/practice')));
const OnboardingPage = Loadable(lazy(() => import('views/client-views/onboarding')));

const ClientRoutes = {
    path: '/interview',
    element: <ClientLayout />,
    children: [
        {
            path: ':id',
            element: <OnboardingPage />
        },
        {
            path: ':id/question/:questionId',
            element: <PracticePage />
        },
        {
            path: ':id/practice',
            element: <PracticePage />
        }
    ]
};

export default ClientRoutes;
