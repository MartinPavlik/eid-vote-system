import React from 'react';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class PopoverMenu extends React.Component {
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

    const { control, style, children } = this.props;

    const controlElem = control || <Icon>more_vert</Icon>;

    return (
      <React.Fragment>
        <div onClick={this.handleClick} style={style}>
          {controlElem}
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onClick={this.handleClose}
        >
          {children}
        </Menu>
      </React.Fragment>
    );
  }
}

export { MenuItem };

export default PopoverMenu;
