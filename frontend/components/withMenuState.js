import React from 'react';

export const withMenuState = Component =>
  class SimpleMenu extends React.Component {
    state = {
      anchorEl: null,
    };

    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    render() {
      const { anchorEl } = this.state;

      return (
        <Component
          {...this.props}
          menu={{
            onOpen: this.handleClick,
            onClose: this.handleClose,
            anchorEl,
            open: Boolean(anchorEl),
          }}
        />
      );
    }
  };

export default withMenuState;
