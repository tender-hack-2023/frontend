import { ChartDatasetColoredIE, ChartDatasetIE } from "@/interfaces";
import React from "react";
import { CHART_BACKGROUNDS_COLORS, NAMED_BACKGROUNDS_COLORS, NAMED_COLORS } from "@/consts";

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
  ArcElement
} from 'chart.js';

import { Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

export interface PieChartIE{
    name:string,
    data:{
        labels: string[], //название категорий
        datasets: {
            data: number[] //два значени: сумма всех продаж в категории + сумма твоих продаж в категории
        }[] //длина списка равна количеству категорий
    }
}

export const PieChart:React.FC<PieChartIE> = (props) =>{


    

    const data = {
        labels:props.data.labels,
        datasets: props.data.datasets.map((value, index)=>{
            return {
                data: value.data,
                backgroundColor: [NAMED_BACKGROUNDS_COLORS[index], NAMED_COLORS[index]],
            }
        })
    }




          



    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
            labels: {
              generateLabels: function(chart:any ) {

                // Get the default label list
                const original = ChartJS.overrides.pie.plugins.legend.labels.generateLabels;
                const labelsOriginal = original.call(this, chart);
    
                // Build an array of colors used in the datasets of the chart
                let datasetColors = chart.data.datasets.map(function(e:any) {
                  return e.backgroundColor;
                });
                datasetColors = datasetColors.flat();
    
                // Modify the color and hide state of each label
                labelsOriginal.forEach((label:any) => {
                  // There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
                  label.datasetIndex = (label.index - label.index % 2) / 2;
    
                  // The hidden state must match the dataset's hidden state
                  label.hidden = !chart.isDatasetVisible(label.datasetIndex);
    
                  // Change the color to match the dataset
                  label.fillStyle = datasetColors[label.index];
                });
    
                return labelsOriginal;
              }
            },
            onClick: function(mouseEvent:any, legendItem:any, legend:any) {
              // toggle the visibility of the dataset from what it currently is
              legend.chart.getDatasetMeta(
                legendItem.datasetIndex
              ).hidden = legend.chart.isDatasetVisible(legendItem.datasetIndex);
              legend.chart.update();
            }
          },
          tooltip: {
            callbacks: {
              label: function(context:any) {
                const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
                return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue;
              }
            }
          },

          title: {
            display: true,
            text: props.name,
          },
        },
      };

    return(
        <div>
            <Pie options={options} data={data} />
        </div>
    );
}