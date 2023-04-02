import { ChartDrawer } from "@/components/Drawer";
import React, { use, useState } from "react";
import styles from '@/styles/Home.module.css'

import { Segmented, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import { LineChart } from "@/charts/lineChart";
import { ReactFunnelChart } from "@/charts/FunnelChart";
import { BarSeriesChart } from "@/charts/BarSeriesChart";
import { server } from "@/requests";
import axios from "axios";
import { useRouter } from "next/router";



 const Sales:React.FC = () =>{
    let router = useRouter()
    const { inn } = router.query

    const deltaMonths = (new Date().getFullYear()-2019)*12

    const [date, setDate] = useState({
        date:[deltaMonths + new Date().getMonth()-1, deltaMonths + new Date().getMonth()-1],
        datePickerState:[]
    })

    

  
    axios.post('http://10.10.117.156:8080/api/instance1',
    {
        dateStart: date.date[0],
        dateEnd:  date.date[1],
        inn: inn,
    }
    ).then(res=>{
        console.log(res.data)
    })


    const getQuarter = (month:number) =>{
        if (month < 4) {
            return [deltaMonths-3,deltaMonths]
        }
        else{
            let num_quarter = Math.ceil(month / 3)-1
            return [deltaMonths +3*(num_quarter-1), deltaMonths +3*num_quarter]
        }
    }

    let values = {
        'month':[deltaMonths +new Date().getMonth()-1, deltaMonths + new Date().getMonth()-1],
        'quarter': getQuarter( new Date().getMonth()-1),
        'picker': date,
        'all':'all'
    }



    let lineProps = {
        name:"Мои продажи", 
        datasets:[
        {
            name:"Я сейчас", 
            dataY: [2,3,5,8,1],
            dataX: [1,2,3,4,5]
        },
        {
          name:"Я в прошлом", 
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
        name:"Сегменты",
        datasets:[
          {
            name:'Дерево',
            dataX: ['Я сейчас', 'Я в прошлом', 'Предикт'],
            dataY: [5,4,3]
          },
          {
            name:'Деревообработка',
            dataX: ['Я сейчас', 'Я в прошлом', 'Предикт'],
            dataY: [4,5,2]
        },
          {
            name:'Металл',
            dataX: ['Я сейчас', 'Я в прошлом', 'Предикт'],
            dataY: [5,4,3]
        },
          {
            name:'Станки',
            dataX: ['Я сейчас', 'Я в прошлом', 'Предикт'],
            dataY: [5,4,3]
        },
          {
            name:'Работа на подряде',
            dataX: ['Я сейчас', 'Я в прошлом', 'Предикт'],
            dataY: [5,4,3]
        },
        ]
      }

      const [categories, setCategories] = useState({
        categories:['Дерево','Деревообработка','Металл','Станки','Работа на подряде'],
        active:'Дерево'
      }
      )

    
    const change_line_percent =   lineProps.datasets[0].dataY.reduce(function(sum:any, elem:any) {return sum + elem;}, 0)
    /
    lineProps.datasets[1].dataY.reduce(function(sum:any, elem:any) {return sum + elem;}, 0) * 100


    const change_line_percent_2 =   lineProps.datasets[0].dataY.reduce(function(sum:any, elem:any) {return sum + elem;}, 0)
    /
    lineProps.datasets[1].dataY.reduce(function(sum:any, elem:any) {return sum + elem;}, 0) * 100

    const change_funnel_percent = funnelData1[2].value/funnelData2[1].value*100
    
    const change_bar_percent =   barData.datasets[0].dataY.reduce(function(sum:any, elem:any) {return sum + elem;}, 0)
    /
    barData.datasets[1].dataY.reduce(function(sum:any, elem:any) {return sum + elem;}, 0) * 100

    console.log(date)
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
                                        date: e?.map((value)=>(value?.month() != undefined? ((value?.year as any)-2019)*12 + value?.month()+ 1:null)),
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
                            <div>Изменения {change_line_percent < 100? (100-change_line_percent).toFixed(2):(change_line_percent-100).toFixed(2)}% <img src={change_line_percent < 100? '/down.svg':'/up.svg'}></img></div>
                        </div>
                        <LineChart {...lineProps}></LineChart>
                    </div>

                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <div>Сравнительная эффективность участия </div>
                            <div>Изменения {change_funnel_percent < 100? (100-change_funnel_percent).toFixed(2):(change_funnel_percent-100).toFixed(2)}% <img src={change_funnel_percent < 100? '/down.svg':'/up.svg'}></img></div>
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
                            <div>Изменения {change_bar_percent < 100? (100-change_bar_percent).toFixed(2):(change_bar_percent-100).toFixed(2)}% <img src={change_bar_percent < 100? '/down.svg':'/up.svg'}></img></div>
                        </div>
                        <BarSeriesChart {...barData}></BarSeriesChart>
                    </div>




                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <div>Сравнительная аналитика продажи в сегментах</div>
                            <div>Изменения {change_line_percent_2 < 100? (100-change_line_percent_2).toFixed(2):(change_line_percent-100).toFixed(2)}% <img src={change_line_percent < 100? '/down.svg':'/up.svg'}></img></div>
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