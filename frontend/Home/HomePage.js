import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { pipe, sortBy, reverse, take, defaultTo } from 'ramda';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PetitionTable from '../Petition/components/PetitionTable';


const styles = () => ({
  intro: {
    background: 'url(https://facingtoday.facinghistory.org/hs-fs/hubfs/Listenwise%20Lower%20Voting%20Age.jpg?width=4606&name=Listenwise%20Lower%20Voting%20Age.jpg&fbclid=IwAR1QDTCMwVPbXY_9XhzPPYs9GGmIf7s1eBRyVe6k6fonsgploK9RVQB8k2w) no-repeat center center',
    backgroundSize: '100% 100%',
    height: 400,
    color: 'block',
    fontWeight: 'bold',
    paddingTop: '1em',
    paddingLeft: '1em',
    marginBottom: 25,
    borderRadius: '5px',
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
              defaultTo([]),
              sortBy(((item) => item.votes.length)),
              reverse,
              take(5),
            )(petitions)
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
