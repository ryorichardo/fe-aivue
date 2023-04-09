import { useRoutes } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import ClientRoutes from './ClientRoutes';

export default function ThemeRoutes() {
    return useRoutes([ClientRoutes, MainRoutes, AuthenticationRoutes]);
}
