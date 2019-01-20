import React, { Component, Fragment } from 'react';
import { pipe } from 'ramda';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PetitionTable from './components/PetitionTable';


const styles = () => ({
  row: {
    marginBottom: '1.5em',
  },
});

class ListPage extends Component {
  render() {
    const { classes, data: { petitions } } = this.props;

    return (
      <Fragment>

        <Typography component="h2" variant="display2" gutterBottom>
          Seznam peticí
        </Typography>
        <div className={classes.row}>
          <PetitionTable
            rows={petitions || []}
          />
        </div>

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
)(ListPage);
