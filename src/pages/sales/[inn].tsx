import { ChartDrawer } from "@/components/Drawer";
import React, { use, useState } from "react";
import styles from '@/styles/Home.module.css'

import { Segmented, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import { LineChart } from "@/charts/lineChart";
import { ReactFunnelChart } from "@/charts/FunnelChart";
import { BarSeriesChart } from "@/charts/BarSeriesChart";

 const Sales:React.FC = () =>{
    const [date, setDate] = useState({
        date:[new Date().getMonth()-1, new Date().getMonth()-1],
        datePickerState:[]
    })

    const getQuarter = (month:number) =>{
        if (month < 4) {
            return [9,12]
        }
        else{
            let num_quarter = Math.ceil(month / 3)-1
            return [3*(num_quarter-1), 3*num_quarter]
        }
    }

    let values = {
        'month':[new Date().getMonth()-1, new Date().getMonth()-1],
        'quarter': getQuarter( new Date().getMonth()-1),
        'picker': date,
        'all':'all'
    }



    let lineProps = {
        name:"Имя графика", 
        datasets:[
        {
        name:"Имя линии", 
        dataY: [2,3,5,8,1],
        dataX: [1,2,3,4,5]
        },
        {
          name:"ТАТТА линии", 
          dataY: [5,6,9,2,3],
          dataX: [1,2,3,4,5]
        }
      ]
     }

     const funnelData1 = [
        { name: 'Все тендеры', value: 252 },
        { name: 'Я участвовал', value: 105 },
        { name: 'Выиграл', value: 84 },
      ]

      const funnelData2 = [
        { name: 'Все тендеры', value: 150 },
        { name: 'Я участвовал', value: 80 },
        { name: 'Выиграл', value: 70 },
      ]


      const barData = {
        name:"БАР СТАКЕД",
        datasets:[
          {
            name:'Выиграл',
            dataX: ['A', 'B', 'C', 'D'],
            dataY: [1,3,7,4]
          },
          {
            name:'Проиграл',
            dataX: ['A', 'B', 'C', 'D'],
            dataY: [4,3,2,1]
          },
        ]
      }

      const [categories, setCategories] = useState({
        categories:['категория1','категория2','категория3','категория4','категория5'],
        active:'kатегория1'
      }
      )
    
    const change_line_percent =   lineProps.datasets[0].dataY.reduce(function(sum:any, elem:any) {return sum + elem;}, 0)
    /
    lineProps.datasets[1].dataY.reduce(function(sum:any, elem:any) {return sum + elem;}, 0) * 100

    const change_funnel_percent = funnelData1[1].value/funnelData1[2].value - funnelData2[1].value/funnelData2[2].value
    
    const change_bar_percent =   barData.datasets[0].dataY.reduce(function(sum:any, elem:any) {return sum + elem;}, 0)
    /
    barData.datasets[1].dataY.reduce(function(sum:any, elem:any) {return sum + elem;}, 0) * 100


    return(
        <main className={styles.main}>
        <ChartDrawer></ChartDrawer>
        <div className={styles.content}>
            <h1>Аналитика продаж</h1>
            <Segmented
            style={{
                background: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '20px',
            }}
                onChange={(e)=>setDate({
                    //@ts-ignore
                    date: values[e.toString()],
                    datePickerState:date.datePickerState
                })}

                options={[
                    {
                        label: 'Месяц',
                        value:  'month'
                    },
                    {
                        label: 'Квартал',
                        value: 'quarter',

                    },
                    {
                    label: (
                            <RangePicker
                            bordered={false}
                            id='1'
                            value={date.datePickerState as any}
                            onChange={(e)=>{  
                                setDate(
                                    {
                                        date: e?.map((value)=>(value?.month() != undefined? value?.month()+ 1:null)),
                                        datePickerState: e == null? []:[dayjs(e[0]?.toDate()), dayjs(e[1]?.toDate())] as any
                                    } as any
                                )
                                
                            }
                        }
                            picker="month" />

                    ),
                    value: 'picker',
                    },
                    {
                        label: 'Все время',
                        value: 'all',
                    },
                ]}
                />
                <div className={styles.cardsWrapper}>
                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <div>Сравнительные продажи во времени</div>
                            <div>Изменения {change_line_percent}% <img src={change_line_percent < 100? '/down.svg':'/up.svg'}></img></div>
                        </div>
                        <LineChart {...lineProps}></LineChart>
                    </div>

                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <div>Сравнительныая эффективность участия </div>
                            <div>Изменения {change_funnel_percent.toFixed(2)}% <img src= {change_funnel_percent > 0? '/up.svg':'/down.svg'}></img></div>
                        </div>
                        <div className={styles.funnelWrapper}>
                            <div className={styles.funnel}>
                                <ReactFunnelChart name='Воронка1' data={funnelData1}></ReactFunnelChart>
                            </div>
                            <div className={styles.funnel}>
                                <ReactFunnelChart name='Воронка2' data={funnelData2}></ReactFunnelChart>
                            </div>
                        </div>
                    </div>



                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <div>Сравнительная аналитика топ 5 сегментов</div>
                            <div>Изменения {change_bar_percent}% <img src={change_bar_percent < 100? '/down.svg':'/up.svg'}></img></div>
                        </div>
                        <BarSeriesChart {...barData}></BarSeriesChart>
                    </div>




                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <div>Сравнительная аналитика продажи в сегментах</div>
                            <div>Изменения</div>
                        </div>
                        <Segmented 
                            style={{
                                background: 'rgba(255, 255, 255, 0.4)',
                                borderRadius: '20px',
                            }}
                            onChange={(e)=>setCategories({
                                categories: categories.categories,
                                active: e.toString()
                            })} 
                            options={categories.categories}
                        ></Segmented>
                        <LineChart {...lineProps}></LineChart>
                    </div>
                </div>
                
    <div>
        
    </div>
    
    </div>
    </main>
    );
}

export default Sales