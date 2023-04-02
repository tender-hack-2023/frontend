import React, { useEffect, useRef } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsTreeChart from "highcharts/modules/treemap";
import HighchartsData from "highcharts/modules/data";
import { TreeMapChartIE } from "@/interfaces";
import { NAMED_COLORS } from "@/consts";
import styles from '@/styles/Home.module.css'

if (typeof Highcharts === 'object') {
    HighchartsData(Highcharts);
    HighchartsHeatmap(Highcharts);
    HighchartsTreeChart(Highcharts);
    HighchartsExporting(Highcharts);
}




export const TreeChart:React.FC<TreeMapChartIE> = (props) =>{
    let points = props.points

    const options = {
        series: [
            {
              type: "treemap",
              layoutAlgorithm: "squarified",
              allowDrillToNode: true,
              animation: false,
              dataLabels: {
                enabled: true
              },
              levelIsConstant: false,
              levels: [
                {
                  level: 1,
                  dataLabels: {
                    enabled: true
                  },
                  borderWidth: 3
                }
              ],
              data:   points.map((value, index)=>{
                return value.parent == undefined? {
                  id: value.id,
                  name: value.name,
                  color: NAMED_COLORS[index%NAMED_COLORS.length]
                }: value 
                // : {
                //   id: value.id,
                //   value: value.value,
                //   parent: value.parent,
                //   name: value.name,
                //   color: NAMED_COLORS[index%NAMED_COLORS.length]
                // }
              })

            }
          ],
          title: {
            text: props.name
          },          
          credits: false
    }
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    return(
        <div id='tree_container'>
            <HighchartsReact
                containerProps={{ className: styles.treeChart }}
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
            />
        </div>
    )
}