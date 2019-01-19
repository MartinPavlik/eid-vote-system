import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import fClamp from 'lodash/fp/clamp';
import moment from 'moment';
import SmallCalendar from 'components/Calendar/SmallCalendar';

const clampTo60 = fClamp(0, 60);

class TimePicker extends React.Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  createChangeHandler = (name) => (e) => {
    const { target: { value } } = e;
    const fixedValue = clampTo60(value);

    const nextValue = moment(this.props.value);

    nextValue.set(name, fixedValue);

    this.props.onChange(nextValue);
  }

  render() {
    const { value } = this.props;

    return (
      <div className="time-picker">
        <style jsx>
          {`
            .time-picker{ 
              display: grid;
              padding: 1rem;
              grid-template: 'a a a';
              grid-template-columns: 50px 50px 50px;
              grid-column-gap: 1rem;
              justify-content: center;
              align-content: center;
            }
          `}
        </style>
        <TextField
          label="Hours"
          type="number"
          value={value.format('HH')}
          onChange={this.createChangeHandler('hours')}
        />
        <TextField
          label="Minutes"
          type="number"
          value={value.format('mm')}
          onChange={this.createChangeHandler('minutes')}
        />
        <TextField
          label="Seconds"
          type="number"
          value={value.format('ss')}
          onChange={this.createChangeHandler('seconds')}
        />
      </div>
    );
  }
}


class DateTimePicker extends React.Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onlyTakeIncomingValueOnMount: PropTypes.bool,
  }

  static defaultProps = {
    onlyTakeIncomingValueOnMount: false,
  }

  constructor(props, context) {
    super(props, context);
    this.state = { currentValue: props.value };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.onlyTakeIncomingValueOnMount && nextProps.value !== this.props.value) {
      this.setState({
        currentValue: nextProps.value,
      });
    }
  }

  handleDateChange = (date) => {
    const newDate = moment(this.state.currentValue);

    newDate.date(date.date()); // day in month
    newDate.month(date.month());
    newDate.year(date.year());

    this.setState({
      currentValue: newDate,
    });
    this.props.onChange(newDate);
  }

  handleTimeChange = (date) => {
    const newDate = moment(this.state.currentValue);

    newDate.hours(date.hours()); // day in month
    newDate.minutes(date.minutes());
    newDate.seconds(date.seconds());

    this.setState({
      currentValue: newDate,
    });
    this.props.onChange(newDate);
  }

  render() {
    const { currentValue } = this.state;
    return (
      <React.Fragment>
        <SmallCalendar
          date={currentValue}
          selectedDate={currentValue}
          onDayClick={this.handleDateChange}
        />
        <TimePicker
          value={currentValue}
          onChange={this.handleTimeChange}
        />
      </React.Fragment>
    );
  }
}

export default DateTimePicker;
