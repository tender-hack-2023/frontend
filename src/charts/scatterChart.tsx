import { ChartDatasetColoredIE, ChartDatasetIE } from "@/interfaces";
import React from "react";
import { CHART_BACKGROUNDS_COLORS, CHART_COLORS, NAMED_BACKGROUNDS_COLORS, NAMED_COLORS } from "@/consts";

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

import { Scatter } from 'react-chartjs-2';

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

export interface ScatterIE{
    name:string,
    dataset:{
        label:string,
        data:{
            x:number,
            y:number,
        }[]
    },
    me:{
        label:string
        data:{
            x:number,
            y:number,
        }[]
    } //data состоит из одной точки - Меня

}

export const ScatterChart:React.FC<ScatterIE> = (props) =>{
  console.log(props)
    const data = {
        datasets:[
            {
                label:props.dataset.label,
                data:props.dataset.data,
                borderColor: 'rgba(255,255,255,1)',
                backgroundColor: 'rgba(255,255,255,0.5)',
                pointRadius: 6,

            },
            {
                label: props.me.label,
                data:props.me.data,
                borderColor: CHART_COLORS.green,
                backgroundColor: CHART_BACKGROUNDS_COLORS.green,
                pointRadius: 12,

            },
        ]
    }

      const quadrants = {
        id: 'quadrants',
        beforeDraw(chart: any, args:any, options:any) {
            const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
            const midX = x.getPixelForValue(0);
            const midY = y.getPixelForValue(0);
            ctx.save();
            ctx.fillStyle = options.topLeft;
            ctx.fillRect(left, top, midX - left, midY - top);
            ctx.fillStyle = options.topRight;
            ctx.fillRect(midX, top, right - midX, midY - top);
            ctx.fillStyle = options.bottomRight;
            ctx.fillRect(midX, midY, right - midX, bottom - midY);
            ctx.fillStyle = options.bottomLeft;
            ctx.fillRect(left, midY, midX - left, bottom - midY);
            ctx.restore();
        }
      };
    
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
          quadrants: {
            topLeft: CHART_BACKGROUNDS_COLORS.purple,
            topRight: CHART_BACKGROUNDS_COLORS.blue,
            bottomRight: CHART_BACKGROUNDS_COLORS.orange,
            bottomLeft: CHART_BACKGROUNDS_COLORS.red,
          }
          
        },
        
      };

    return(
        <div>
            <Scatter plugins={[quadrants]} options={options} data={data} />
        </div>
    );
}