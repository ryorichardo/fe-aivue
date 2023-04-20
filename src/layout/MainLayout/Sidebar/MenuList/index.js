import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import { menuItems, menuItemsAdmin } from '../MenuItems';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = ({ isSuperAdmin }) => {
    const menu = isSuperAdmin ? menuItemsAdmin : menuItems;
    const navItems = menu.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

MenuList.propTypes = {
    isSuperAdmin: PropTypes.bool
};
export default MenuList;
