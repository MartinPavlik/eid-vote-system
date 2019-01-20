import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';


class AgeChart extends Component {
  render() {
    const { data } = this.props;

    return (
      <div style={{ width: 400, height: 200 }}>
        <Bar
          data={{
            labels: ['18-25', '25-35', '35-50', '50-65', '65+'],
            datasets: [
              {
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data,
              },
            ],
          }}
          options={{
            legend: {
              display: false,
            },
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Podpisů',
                },
                ticks: {
                  min: 0,
                },
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Věk',
                },
              }],
            },
          }}
        />
      </div>
    );
  }
}


export default AgeChart;
