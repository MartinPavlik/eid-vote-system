import React, { Component, Fragment } from 'react';
import { pipe, prop, head, defaultTo } from 'ramda';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import withTransformProps from 'lib/withTransformProps';
import withCurrentUserId from 'Auth/withCurrentUserId';
import Link from 'components/Link';
import moment from 'moment';
import { parseIsoDateToString } from './utils';
import SexChart from './components/SexChart';
import AgeChart from './components/AgeChart';


const styles = () => ({
  row: {
    marginBottom: '1.5em',
  },
  signed: {
    background: 'red',
  },
  voteHeader: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: '1.25em',
  },
  info: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

class DetailPage extends Component {
  parseVotes = (votes) => {
    const ret = {
      sex: [0, 0],
      count: 0,
      ages: [0, 0, 0, 0, 0],
    };

    for (let i = 0; i < votes.length; i++) {
      const vote = votes[i];
      if (vote.user.sex === 'M') {
        ret.sex[1]++;
      } else {
        ret.sex[0]++;
      }

      if (vote.age < 25) {
        ret.ages[0]++;
      } else if (vote.age < 35) {
        ret.ages[1]++;
      } else if (vote.age < 50) {
        ret.ages[2]++;
      } else if (vote.age < 65) {
        ret.ages[3]++;
      } else {
        ret.ages[4]++;
      }
    }

    return ret;
  }

  handleSign = () => {
    const { petition: { _id }, onVote } = this.props;
    onVote(_id);
  }

  renderVoteButton = () => {
    const { currentUserId, petition } = this.props;

    // const dateTo = new Date(petition.to);
    // const now = new Date();

    const expired = moment() >= moment(petition.to);
    if (expired) {
      return (
        <Chip label="Hlasování jíž skončilo." color="secondary" />
      );
    }

    if (!currentUserId) {
      return (
        <Typography>
          Pokud chcete hlasovat, <Link href="/login">přihlašte se</Link>.
        </Typography>
      );
    }

    if (petition && petition.userHasAlreadyVoted) {
      return (
        <div>
          <Chip label="Již podepsáno" color="primary" />
        </div>
      );
    }

    return (
      <Button
        onClick={this.handleSign}
        variant="contained"
        color="primary"
      >
        Podepsat
      </Button>
    );
  }

  render() {
    const { classes, petition } = this.props;

    const from = parseIsoDateToString(petition.from);
    const to = parseIsoDateToString(petition.to);


    const chartData = this.parseVotes(petition.votes);

    console.log(this.props);
    return (
      <Fragment>

        <Typography component="h2" variant="display2" gutterBottom>
          {petition.title}
        </Typography>

        <div className={classes.row}>
          <div className={classes.info}>Popis</div>
          <div>{petition.description}</div>
        </div>

        <div className={classes.row}>
          <div className={classes.info}>Hlasování od</div>
          <div>{from}</div>
        </div>

        <div className={classes.row}>
          <div className={classes.info}>Hlasování do</div>
          <div>{to}</div>
        </div>


        <div className={classes.row}>
          {this.renderVoteButton()}
        </div>

        <Typography component="h2" variant="display1" gutterBottom>
          Průběžné výsledky
        </Typography>

        <div className={classes.row}>
          <div className={classes.voteHeader}>
            Podepsalo celkem
          </div>
          <div>
            {petition.votes.length}
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.voteHeader}>
            Věk
          </div>
          <AgeChart
            data={chartData.ages}
          />
        </div>

        <div className={classes.row}>
          <div className={classes.voteHeader}>
            Pohlaví
          </div>
          <SexChart
            data={chartData.sex}
          />
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
    votes: [],
  },
};

const PetitionFragment = gql`
  fragment PetitionFragment on Petition {
    _id
    title
    description
    from
    to
    userHasAlreadyVoted
    votes {
      _id
      petitionId
      age
      userId
      user {
        sex
      }
    }
  }
`;

const PetitionByIdQuery = gql`
  query Petitions($id: ID!) {
    petitions(_id: $id) {
      ...PetitionFragment
    }
  }
  ${PetitionFragment}
`;

const VoteMutation = gql`
  mutation vote($petitionId: ID!) {
    vote(petitionId: $petitionId) {
      ...PetitionFragment
    }
  }
  ${PetitionFragment}
`;

const withPetitions = graphql(PetitionByIdQuery, {
  options: ({ petitionId }) => ({
    variables: {
      id: petitionId,
    },
  }),
});

const withVote = graphql(VoteMutation, {
  props: (({ mutate }) => ({
    onVote: (petitionId) => mutate({ variables: { petitionId } }),
  })),
});

export default pipe(
  withStyles(styles),
  withVote,
  withCurrentUserId,
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
