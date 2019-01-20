import React, { Component, Fragment } from 'react';
import { pipe } from 'ramda';
import Link from 'components/Link';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import redirect from 'lib/redirect';
import withCurrentUserId from 'Auth/withCurrentUserId';

const styles = () => ({
  row: {
    marginBottom: '1.5em',
  },
});

class CreatePetitionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        title: {
          name: 'title',
          label: 'Název',
          type: 'text',
          required: true,
          error: false,
          errorMessage: '',
        },
        description: {
          name: 'description',
          label: 'Popis',
          type: 'text',
          required: false,
          error: false,
          errorMessage: '',
        },
        from: {
          name: 'from',
          label: 'Hlasovaní od',
          type: 'date',
          required: true,
          error: false,
          errorMessage: '',
        },
        to: {
          name: 'to',
          label: 'Hlasovaní do',
          type: 'date',
          required: true,
          error: false,
          errorMessage: '',
        },
      },
      values: {
        title: '',
        description: '',
        from: '',
        to: '',
      },
    };
  }

  validateForm = (input, value) => {
    if (input.required && value === '') {
      return {
        error: true,
        errorMessage: 'Prosím vyplňte.',
      };
    }

    return {
      error: false,
      errorMessage: '',
    };
  }

  handleOnChange = (name, value) => {
    const { form, values } = this.state;
    const error = this.validateForm(form[name], value);
    console.log(value);
    this.setState({
      form: {
        ...form,
        [name]: {
          ...form[name],
          ...error,
        },
      },
      values: {
        ...values,
        [name]: value,
      },
    });
  }

  handleConfirm = () => {
    const { onSubmit } = this.props;
    const { form, values } = this.state;

    const newForm = { ...form };
    const keys = Object.keys(form);

    let hasError = false;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const error = this.validateForm(newForm[key], values[key]);

      if (error.error) {
        hasError = true;
      }

      newForm[key] = {
        ...newForm[key],
        ...error,
      };
    }

    this.setState({
      form: newForm,
    });


    const newFrom = new Date(values.from);
    const newTo = new Date(values.to);

    if (hasError) return;

    onSubmit({
      ...values,
      from: newFrom.toISOString(),
      to: newTo.toISOString(),
    }).then(petition => {
      redirect(`/petition/${petition._id}`);
    });
  }

  render() {
    const { values, form } = this.state;
    const { classes, currentUserId } = this.props;

    console.log('this.props: ', this.props); // eslint-disable-line

    // TODO - ui
    if (!currentUserId) {
      return (
        <Typography>
          Only logged in users can create petitions, please{' '}
          <Link href="/login">login</Link>.
        </Typography>
      );
    }


    return (
      <Fragment>

        <Typography component="h2" variant="display2" gutterBottom>
          Nová petice
        </Typography>

        <div className={classes.row}>
          <FormControl
            required={form.title.required}
            error={form.title.error}
            aria-describedby="component-title"
          >
            <InputLabel htmlFor="component-input-title" shrink>{form.title.label}</InputLabel>
            <Input
              id="component-input-title"
              value={values.title}
              onChange={(e) => this.handleOnChange(form.title.name, e.target.value)}
            />
            { form.title.error && (
              <FormHelperText id="component-title-text">{form.title.errorMessage}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div className={classes.row}>
          <FormControl required={form.description.required} error={form.description.error} aria-describedby="component-description">
            <InputLabel htmlFor="component-input-description" shrink>{form.description.label}</InputLabel>
            <Input
              id="component-input-description"
              value={values.description}
              onChange={(e) => this.handleOnChange(form.description.name, e.target.value)}
              multiline
              rowsMax="30"
            />
            { form.description.error && (
              <FormHelperText id="component-description-text">{form.description.errorMessage}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div className={classes.row}>
          <FormControl required={form.from.required} error={form.from.error} aria-describedby="component-from">
            <InputLabel htmlFor="component-input-from" shrink>{form.from.label}</InputLabel>
            <Input
              id="component-input-from"
              value={values.from}
              onChange={(e) => this.handleOnChange(form.from.name, e.target.value)}
              type="date"
            />
            { form.from.error && (
              <FormHelperText id="component-from-text">{form.from.errorMessage}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div className={classes.row}>
          <FormControl required={form.to.required} error={form.to.error} aria-describedby="component-to">
            <InputLabel htmlFor="component-input-to" shrink>{form.to.label}</InputLabel>
            <Input
              id="component-input-to"
              value={values.to}
              onChange={(e) => this.handleOnChange(form.to.name, e.target.value)}
              type="date"
            />
            { form.to.error && (
              <FormHelperText id="component-to-text">{form.to.errorMessage}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div className={classes.row}>
          <Button onClick={this.handleConfirm} variant="contained" color="primary">
            Vytvořit
          </Button>
        </div>

      </Fragment>
    );
  }
}

const createPetitionMutation = gql`
  mutation createPetition($input: PetitionInput!) {
    createPetition(input: $input) {
      _id
      title
      description
      from
      to
    }
  }
`;

export default pipe(
  withCurrentUserId,
  withStyles(styles),
  graphql(
    createPetitionMutation,
    {
      props: ({ mutate, ...rest }) => ({
        ...rest,
        onSubmit: input =>
          mutate({
            variables: {
              input,
            },
          })
            .then(({ data: { createPetition } }) => createPetition),
      }),
    },
  ),
)(CreatePetitionForm);
