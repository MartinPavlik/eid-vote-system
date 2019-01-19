import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = () => ({
  row: {
    marginBottom: '1.5em',
  },
});

class DetailPage extends Component {
  state = {
    petition: {
      id: 'asdad',
      title: 'Title',
      description: 'Desc',
      from: 'date',
      to: 'date',
    },
  }

  render() {
    const { classes } = this.props;
    const { petition } = this.state;

    return (
      <Fragment>

        <Typography component="h2" variant="display2" gutterBottom>
          {petition.title}
        </Typography>

        <div className={classes.row}>
          <div>Popis</div>
          <div>{petition.description}</div>
        </div>

        <div className={classes.row}>
          <div>Hlasování od</div>
          <div>{petition.from}</div>
        </div>

        <div className={classes.row}>
          <div>Hlasování do</div>
          <div>{petition.to}</div>
        </div>

        <div className={classes.row}>
          <Button onClick={this.handleCongirm} variant="contained" color="primary">
            Podepsat
          </Button>
        </div>

      </Fragment>
    );
  }
}


export default withStyles(styles)(DetailPage);
