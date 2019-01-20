import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { pipe, sortBy, reverse, take } from 'ramda';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PetitionTable from '../Petition/components/PetitionTable';


const styles = () => ({
  intro: {
    background: 'url(http://www.ucho24.cz/img/_antialias_551f05d2-1dce-4db1-aed0-918dcac959b6_cs_a9899c0b01ae4f151fc310774877e299.jpg) no-repeat center center',
    backgroundSize: '100% 100%',
    height: 400,
    color: 'block',
    fontWeight: 'bold',
    paddingTop: '1em',
    paddingLeft: '1em',
    marginBottom: 25,
  },
  logo: {
    height: 100,
  },
});

class Home extends Component {
  render() {
    const { classes, data: { petitions } } = this.props;

    return (
      <Fragment>

        <div className={classes.intro}>
          <img className={classes.logo} src="/static/logo-black.png" />
        </div>

        <Typography component="h2" variant="display1" gutterBottom>
          Populární
        </Typography>

        <PetitionTable
          rows={
            pipe(
              sortBy(((item) => item.votes.length)),
              reverse,
              take(5),
            )(petitions)
            || []
          }
        />

      </Fragment>
    );
  }
}

const PetitionsQuery = gql`
  query Petitions {
    petitions {
      _id
      title
      description
      from
      to
      votes {
        _id
      }
    }
  }
`;

const withPetitions = graphql(PetitionsQuery);

export default pipe(
  withStyles(styles),
  withPetitions,
)(Home);
