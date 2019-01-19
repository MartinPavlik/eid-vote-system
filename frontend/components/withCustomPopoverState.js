import * as React from 'react';

const withCustomPopoverState = (Component) =>
  class WithCustomPopoverState extends React.Component {
    state = {
      anchorEl: null,
    }

    handleOpen = (e) => {
      console.info('on open', e);
      this.setState({ anchorEl: e.target });
    };

    handleClose = () => {
      console.info('on close');
      if (this.props.onClose) {
        this.props.onClose();
      }
      this.setState({ anchorEl: null });
    };

    render() {
      const { control, controlWrapperStyles, ...props } = this.props;
      console.info('with custom pop state::', this.state);
      return (
        <React.Fragment>
          {control &&
            <span onClick={this.handleOpen} style={controlWrapperStyles}>
              {control}
            </span>
          }
          <Component
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            anchorEl={this.state.anchorEl}
            active={Boolean(this.state.anchorEl)}
            {...props}
          />
        </React.Fragment>
      );
    }
  };

export default withCustomPopoverState;
