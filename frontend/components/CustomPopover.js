// @flow
import * as React from 'react';
import Popover from '@material-ui/core/Popover';

type PropsType = {
  children: ?React.Node,
  onClose: () => void,
  active: ?boolean
};

type StateType = {

};

class CustomPopover extends React.Component<PropsType, StateType> {
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render(): React.Node {
    const { children, anchorEl, active } = this.props;
    return (
      <Popover
        open={active}
        anchorEl={anchorEl}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {active && children}
      </Popover>
    );
  }
}

export default CustomPopover;
