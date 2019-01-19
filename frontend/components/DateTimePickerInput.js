import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import CustomPopover from 'components/CustomPopover';
import fFlow from 'lodash/fp/flow';
import withCustomPopoverState from './withCustomPopoverState';
import DateTimePicker from './DateTimePicker';

const styles = (theme) => ({
  editIcon: {
    marginLeft: theme.spacing.unit,
    fontSize: '1rem',
  },
  editButton: {
    fontSize: '1.2rem',
  },
  popoverWrapper: {
    padding: theme.spacing.unit * 2,
  },
});

class DateTimePickerInput extends React.Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    anchorEl: PropTypes.node,
    active: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
  }

  static defaultProps = {
    anchorEl: null,
    active: false,
  }

  constructor(props, context) {
    super(props, context);
    this.state = { currentValue: props.value };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        currentValue: nextProps.value,
      });
    }
  }

  handleSave = () => {
    this.props.onChange(this.state.currentValue);
    this.props.onClose();
  }

  handleChange = (time) => {
    this.setState({
      currentValue: time,
    });
  }

  handleDocumentKey = (e) => {
    if (e.keyCode === 13) {
      this.handleSave();
    }
  }

  render() {
    const { currentValue } = this.state;
    const {
      label,
      anchorEl,
      active,
      onClose,
      onOpen,
      classes,
    } = this.props;
    return (
      <div>
        <Typography>{label}</Typography>
        <Button className={classes.editButton} onClick={onOpen}>
          {currentValue.format('DD-MM-YYYY HH:mm:ss')}
          <Icon className={classes.editIcon}>edit</Icon>
        </Button>
        <CustomPopover
          anchorEl={anchorEl}
          active={active}
          onClose={onClose}
        >
          <div className={classes.popoverWrapper}>
            <DateTimePicker
              value={currentValue}
              onChange={this.handleChange}
            />
            <div className={classes.saveButtonWrapper}>
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleSave}
              >
                Ok
              </Button>
            </div>
          </div>
        </CustomPopover>
      </div>
    );
  }
}

export default fFlow(
  withStyles(styles),
  withCustomPopoverState,
)(DateTimePickerInput);
