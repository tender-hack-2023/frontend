import { ChartDrawer } from "@/components/Drawer";
import React, { use, useState } from "react";
import styles from '@/styles/Home.module.css'

import { Segmented, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import { LineChart } from "@/charts/lineChart";
import { ReactFunnelChart } from "@/charts/FunnelChart";
import { BarSeriesChart } from "@/charts/BarSeriesChart";
import { PieChart } from "@/charts/pieChart";
import { TreeChart } from "@/charts/TreeChart";

 const Market:React.FC = () =>{
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

    const points = [
        {
            id: '1',
            name: 'Центральный ФО',
        },
        {
            id: '2',
            name: 'Дальневосточный ФО',
        },
        {
            id: '3',
            name: 'Сибирский ФО',
        },
        {
            id: '2_1',
            name: '2_1',
            parent:'2',
        },
        {
            id: '2_2',
            name: '2_2',
            parent:'2',
        },
        {
            id: '1_1',
            name: '1_1',
            parent:'1',
        },
        {
            id: '3_1',
            name: '3_1',
            parent:'3',
        },
        {
            id: '2_1_1',
            name: '2_1_1',
            parent:'2_1',
            value: 1
        },
        {
            id: '2_1_2',
            name: '2_1_2',
            parent:'2_1',
            value: 2
        },
        {
            id: '2_1_3',
            name: '',
            parent:'2_1',
            value: 3
        },
        {
            id: '2_2_1',
            name: '2_2_1',
            parent:'2_2',
            value: 3
        },
        {
            id: '2_2_2',
            name:  '',
            parent:'2_2',
            value: 18
        },
        {
            id: '3_1_1',
            name: '3_1_1',
            parent:'3_1',
            value: 9
        },
        {
            id: '1_1_1',
            name: 'Сибирский ФО',
            parent:'1_1',
            value: 10
        },
      
      ]

      const pieData = {
        labels: ['Дерево рынок', 'Дерево я', 'Деревообработка рынок', 'Деревообработка я', 'Металл рынок', 'Металл я', 'Станки рынок', 'Станки я', 'Работа на подряде рынок', 'Работа на подряде я'],
        datasets: [
            {
            data: [21, 79]
            },
            {
            data: [33, 67]
            },
            {
            data: [20, 80]
            },
            {
            data: [10, 90]
            },
            {
                data: [45, 55]
                }
        ]
    }

    return(
        <main className={styles.main}>
        <ChartDrawer></ChartDrawer>
        <div className={styles.content}>
            <h1>Аналитика рынка</h1>
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
                                <div>Доля компании на рынке по сегментам</div>
                                <div>Изменения</div>
                            </div>
                            <PieChart data={pieData} name='Доля компании на рынке по сегментам'></PieChart>
                        </div>

                        <div className={styles.chartCard}>
                            <div className={styles.chartHeader}>
                                <div>Территориальная доля сегментов</div>
                                <div>Изменения</div>
                            </div>
                            <div className={styles.treeChart}>
                                <TreeChart points={points as any} name='Территориальная доля сегментов'></TreeChart>

                            </div>
                        </div>

                        <div className={styles.widget}>
                            <div className={styles.widgetTitle}>Объем сегмента</div>
                            <div className={styles.widgetValue}>₽ 10,260,560 <img src='/up.svg'></img></div>
                            <div className={styles.widgetDescr}> изменения в сегменте 12% <img src='/up.svg'></img></div>
                            <div className={styles.widgetDescr}>общий оборот рынка 3% <img src='/down.svg'></img></div>
                        </div>
                       
                    
                    </div>
                <div>
            </div>
        </div>
    </main>
    );
}

export default Market