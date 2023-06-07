import Notification from 'components/Notification';
import { Outlet } from 'react-router-dom';

const MinimalLayout = () => (
    <>
        <Outlet />
        <Notification />
    </>
);

export default MinimalLayout;
