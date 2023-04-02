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
  BarElement,

} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,

);

export interface BarChartIE{
    name:string,
    datasets:ChartDatasetIE[]
}

export const BarSeriesChart:React.FC<BarChartIE> = (props) =>{
    const options = {
        plugins: {
          title: {
            display: true,
            text: props.name,
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };
    
    let labels = props.datasets[0].dataX
    let datasets = props.datasets
    const data = {
        labels,
        datasets: datasets.map((value, index)=>{
            return {
                    label: value.name,
                    data: value.dataY,
                    backgroundColor: NAMED_COLORS[index%NAMED_COLORS.length]
                } 
            
            
            
        }),
      };

   

    return(
        <div>
            <Bar options={options} data={data as any} />
        </div>
    );
}