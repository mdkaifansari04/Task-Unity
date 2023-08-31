import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Bar, Line, Radar, Doughnut } from 'react-chartjs-2'


function MyChart(props) {

    const { chartType, label, graphData, graphParameter } = props

    const data = {
        labels: graphParameter,
        datasets: [
            {
                id: 1,
                label: label,
                data: graphData,
                backgroundColor: "#727CF4",
                borderColor: '#7481CF',
                hoverBackgroundColor :"#949df9"
            },
        ],
    }

    const pieData = {
        labels: graphParameter,
        datasets: [{
            label: label,
            data: graphData,
            backgroundColor: [
                '#6973E3',
                '#6FE8C8',
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
        }]
    };

    return (
        <div>

            {chartType === 'bar' && <Bar
                datasetIdKey='id'
                height={520}
                width={600}
                data={data}
            />}

            {chartType === 'line' && <Line
                datasetIdKey='id'
                height={500}
                width={900}
                data={data}
            />}

            {chartType === 'doughnut' && <Doughnut
                datasetIdKey='id'
                height={500}
                width={500}
                data={pieData}
            />}

        </div>
    );
}

export default MyChart;
