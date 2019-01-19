import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PetitionTable from '../Petition/components/PetitionTable';


const styles = () => ({
  intro: {
    background: 'url(http://www.ucho24.cz/img/_antialias_551f05d2-1dce-4db1-aed0-918dcac959b6_cs_a9899c0b01ae4f151fc310774877e299.jpg) no-repeat center center',
    backgroundSize: '100% 100%',
    height: 400,
    color: 'block',
    fontSize: '4em',
    fontWeight: 'bold',
    paddingTop: '1em',
    paddingLeft: '1em',
    marginBottom: 25,
  },
});


class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>

        <div className={classes.intro}>
          Petice
        </div>

        <Typography component="h2" variant="display1" gutterBottom>
          Populární
        </Typography>

        <PetitionTable
          rows={[]}
        />

      </Fragment>
    );
  }
}


export default withStyles(styles)(Home);
