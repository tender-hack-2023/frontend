import { ChartDatasetColoredIE, ChartDatasetIE } from "@/interfaces";
import React from "react";
import { NAMED_BACKGROUNDS_COLORS, NAMED_COLORS } from "@/consts";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export interface LineChartIE{
    name:string,
    datasets:ChartDatasetIE[]
}

export const LineChart:React.FC<LineChartIE> = (props) =>{
    let datasets = new Array()
    let labels = new Array()

    for (let i:number = 0; i < props.datasets.length; i++){
        labels = props.datasets[i].dataX
        datasets.push(
            {
                borderColor:NAMED_COLORS[i],
                backgroundColor: NAMED_BACKGROUNDS_COLORS[i],
                label: props.datasets[i].name,
                data: props.datasets[i].dataY,
                fill: true,
                lineTension: 0.3,        

            }
        )
    }


    const data = {
        labels,
        datasets:datasets
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: props.name,
          },
        },
      };

    return(
        <div>
            <Line options={options} data={data} />
        </div>
    );
}