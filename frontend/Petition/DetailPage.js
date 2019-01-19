import React, { Component, Fragment } from 'react';
import { pipe, prop, head, defaultTo } from 'ramda';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import withTransformProps from 'lib/withTransformProps';


const styles = () => ({
  row: {
    marginBottom: '1.5em',
  },
});

class DetailPage extends Component {
  render() {
    const { classes, petition } = this.props;

    console.log(this.props);
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

DetailPage.defaultProps = {
  petition: {
    title: '',
    description: '',
    from: '',
    to: '',
  },
};


const PetitionByIdQuery = gql`
  query Petitions($id: ID!) {
    petitions(_id: $id) {
      _id
      title
      description
      from
      to
    }
  }
`;

const withPetitions = graphql(PetitionByIdQuery, {
  options: ({ petitionId }) => ({
    variables: {
      id: petitionId,
    },
  }),
});

export default pipe(
  withStyles(styles),
  withTransformProps(ownProps => ({
    ...ownProps,
    petition: pipe(
      prop('data'),
      prop('petitions'),
      defaultTo([]),
      head,
    )(ownProps),
  })),
  withPetitions,
)(DetailPage);
