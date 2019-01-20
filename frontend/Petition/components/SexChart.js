import React, { Component } from 'react';

const Pie = process.browser ? require('react-chartjs-2').Pie : () => null;


class SexChart extends Component {
  render() {
    const { data } = this.props;

    return (
      <div style={{ maxWidth: 200 }}>
        <Pie
          width="100%"
          data={{
            labels: [
              'Ženy',
              'Muži',
            ],
            datasets: [{
              data,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
              ],
            }],
          }}
        />
      </div>
    );
  }
}


export default SexChart;
