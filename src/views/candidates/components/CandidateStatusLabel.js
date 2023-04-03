import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { INTERVIEW_STATUS } from 'config/constant';
import { Chip } from '@mui/material';

function CandidateStatusLabel({ label }) {
    const theme = useTheme();
    let bgColor = '';
    let color = '';

    switch (label) {
        case INTERVIEW_STATUS.EXPIRED:
            bgColor = theme.palette.status.bgExpired;
            color = theme.palette.status.expired;
            break;
        case INTERVIEW_STATUS.ONHOLD:
            bgColor = theme.palette.status.bgOnhold;
            color = theme.palette.status.onhold;
            break;
        case INTERVIEW_STATUS.REJECTED:
            bgColor = theme.palette.status.bgRejected;
            color = theme.palette.status.rejected;
            break;
        case INTERVIEW_STATUS.SELECTED:
            bgColor = theme.palette.status.bgSelected;
            color = theme.palette.status.selected;
            break;
        case INTERVIEW_STATUS.SENT:
            bgColor = theme.palette.status.bgSent;
            color = theme.palette.status.sent;
            break;
        case INTERVIEW_STATUS.WAITING:
            bgColor = theme.palette.status.bgWaiting;
            color = theme.palette.status.waiting;
            break;
        default:
            bgColor = theme.palette.success.light;
            color = theme.palette.success.main;
    }

    return (
        <Chip
            variant="contained"
            label={label.charAt(0).toUpperCase() + label.toLowerCase().slice(1)}
            sx={{ backgroundColor: bgColor, color: color, fontSize: '12px' }}
            size="small"
        />
    );
}

CandidateStatusLabel.propTypes = {
    label: PropTypes.string
};

export default CandidateStatusLabel;
