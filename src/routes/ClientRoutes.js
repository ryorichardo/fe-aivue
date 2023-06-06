import { lazy } from 'react';

import Loadable from 'components/Loadable';
import ClientLayout from 'layout/ClientLayout';

const AnswerPage = Loadable(lazy(() => import('views/client-views/answer')));
const PracticePage = Loadable(lazy(() => import('views/client-views/practice')));
const OnboardingPage = Loadable(lazy(() => import('views/client-views/onboarding')));
const RatingPage = Loadable(lazy(() => import('views/client-views/rating')));

const ClientRoutes = {
    path: '/interview',
    element: <ClientLayout />,
    children: [
        {
            path: ':id',
            element: <OnboardingPage />
        },
        {
            path: ':interviewId/question/:questionId',
            element: <AnswerPage />
        },
        {
            path: ':id/practice',
            element: <PracticePage />
        },
        {
            path: ':id/finish',
            element: <RatingPage />
        }
    ]
};

export default ClientRoutes;
