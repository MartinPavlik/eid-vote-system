import * as React from 'react';
import PropTypes from 'prop-types';
import fSet from 'lodash/fp/set';
import {
  find,
  propEq,
  propOr,
  path,
  pipe,
} from 'ramda';
import Button from '@material-ui/core/Button';

class BasicForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  getInitialValue = fieldName =>
    pipe(
      propOr([], 'fields'),
      find(propEq('name', fieldName)),
      propOr('', 'initialValue'),
    )(this.props);

  getValue = fieldName => {
    const v = path([fieldName, 'value'], this.state);
    if (v) return v;
    return this.getInitialValue(fieldName);
  }

  handleChange = fieldName => value => {
    this.setState({
      ...fSet([fieldName, 'value'], value, this.state),
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, fields } = this.props;

    const data = fields.reduce((result, f) => {
      return {
        ...result,
        [f.name]: this.getValue(f.name),
      };
    }, {});

    onSubmit(data);
  }

  renderField = (f) => {
    const { name, label, type } = f;

    const fieldProps = {
      name,
      label,
      type,
      value: this.getValue(name),
      onChange: this.handleChange(name),
    };

    if (f.component) {
      return (
        <div style={{ marginBottom: '1rem' }}>
          <f.component {...fieldProps} />
        </div>
      );
    }

    console.warn(`Missing component for field with name ${f.name}, field not rendered`, f);
    return null;
    /*
    return (
      <div key={name}>
        <TextField
          type={type}
          label={label}
          value={value}
          onChange={this.handleChange(name)}
          margin="normal"
        />
      </div>
    );

    */
  }

  render() {
    const { fields, submitButtonText } = this.props;
    return (
      <form
        noValidate
        onSubmit={this.handleSubmit}
      >
        {
          fields.map(this.renderField)
        }
        <Button
          type="submit"
          variant="contained"
        >
          {submitButtonText}
        </Button>
      </form>
    );
  }
}

BasicForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.oneOf(['text']),
      label: PropTypes.stirng,
      validate: PropTypes.func,
    }),
  ),
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
};

BasicForm.defaultProps = {
  fields: [],
  onSubmit: (d) => { console.info(d); },
  submitButtonText: 'Submit',
};

export default BasicForm;
