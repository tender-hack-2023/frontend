import { CHART_COLORS, NAMED_COLORS } from '@/consts'
import React, { Component } from 'react'

import { FunnelChart } from 'react-funnel-pipeline'
import 'react-funnel-pipeline/dist/index.css'


interface FunnelChartIE{
    name:string,
    data:{
        name:string,
        value:number
    }[]
}

export const ReactFunnelChart: React.FC<FunnelChartIE> = (props) =>{

    return (
        <div>
            <FunnelChart 
                data={props.data}
                title={props.name}
                pallette={NAMED_COLORS.slice(0, props.data.length)}
               />
        </div>
    );
}