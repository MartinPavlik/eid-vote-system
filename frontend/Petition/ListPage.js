import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PetitionTable from './components/PetitionTable';


const styles = () => ({
  row: {
    marginBottom: '1.5em',
  },
});

class ListPage extends Component {
  handleClickRow = (id) => {
    console.log(id);
  }


  render() {
    const { classes } = this.props;

    return (
      <Fragment>

        <Typography component="h2" variant="display2" gutterBottom>
          Seznam peticí
        </Typography>

        <div className={classes.row}>
          <PetitionTable
            handleClickRow={this.handleClickRow}
            rows={[
              {
                _id: 'dasd',
                title: 'pepa',
                description: '',
                from: 'dare',
                to: 'sss',
              },
              {
                _id: 'davxcvsd',
                title: 'pepa',
                description: '',
                from: 'dare',
                to: 'sss',
              },
              {
                _id: 'dsdafasd',
                title: 'pepa',
                description: '',
                from: 'dare',
                to: 'sss',
              },
              {
                _id: 'dadasdgfdsd',
                title: 'pepa',
                description: '',
                from: 'dare',
                to: 'sss',
              },
            ]}
          />
        </div>

      </Fragment>
    );
  }
}


export default withStyles(styles)(ListPage);
