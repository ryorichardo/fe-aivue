import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonBase } from '@mui/material';

import config from 'configs';
import Logo from 'components/Logo';
import { MENU_OPEN } from 'store/actions';

const LogoSection = ({ homePath }) => {
    const defaultId = useSelector((state) => state.customization.defaultId);
    const dispatch = useDispatch();
    return (
        <ButtonBase
            disableRipple
            onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
            component={Link}
            to={homePath || config.defaultPath}
        >
            <Logo />
        </ButtonBase>
    );
};

LogoSection.propTypes = {
    homePath: PropTypes.string
};

export default LogoSection;
