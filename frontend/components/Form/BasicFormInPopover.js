import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import BasicForm from 'components/Form/BasicForm';
import CustomPopover from 'components/CustomPopover';

class BasicFormInPopover extends React.Component {

  state = {}

  handlePopoverOpen = (e) => {
    this.setState({
      anchorEl: e.target,
    });
  }

  handlePopoverClose = () => {
    this.setState({
      anchorEl: null,
    });
  }

  handleSubmit = (d) => {
    const { onSubmit } = this.props;
    this.handlePopoverClose();
    onSubmit(d);
  }

  render() {
    const { anchorEl } = this.state;
    const { triggerButtonText, fields, submitButtonText } = this.props;
    return (
      <React.Fragment>
        <Button onClick={this.handlePopoverOpen} variant="contained" color="primary">
          {triggerButtonText}
        </Button>
        <CustomPopover
          active={!!anchorEl}
          anchorEl={anchorEl}
          onClose={this.handlePopoverClose}
        >
          <div style={{ padding: '1rem' }}>
            <BasicForm
              fields={fields}
              onSubmit={this.handleSubmit}
              submitButtonText={submitButtonText}
            />
          </div>
        </CustomPopover>
      </React.Fragment>
    );
  }
}

BasicFormInPopover.propTypes = {
  ...BasicForm.propTypes,
  triggerButtonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

BasicFormInPopover.defaultProps = {
  onSubmit: () => {},
};

export default BasicFormInPopover;
