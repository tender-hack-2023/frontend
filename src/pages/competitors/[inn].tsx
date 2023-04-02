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
import { Button, Dropdown, Space} from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { faker } from '@faker-js/faker'
import { ScatterChart } from "@/charts/scatterChart";

 const Competitors:React.FC = () =>{
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

    const items: MenuProps['items'] = [
        {
          label: 'Категория 1',
          key: 'Категория 1',
        },
        {
            label: 'Категория 2',
            key: 'Категория 2',
        },
        {
            label: 'Категория 3',
            key: 'Категория 3',
        },
        {
            label: 'Категория 4',
            key: 'Категория 4',
        },
    ]

    const dataset = 
    {
      label: 'DDDDDD',
      data: Array.from({ length: 100 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
      })),
    }

    const me = {
        label:'FUCKING ME',
        data:[{
        x:0,
        y:0
        }]
    }


    const [selectedCategory, setSelectedCategory] = useState(items[0].label) //использовать для запроса

    const handleMenuClick: MenuProps['onClick'] = (e:any) => {
       console.log('click', e);
       setSelectedCategory(e.key)
    };


    const menuProps = {
        items,
        onClick: handleMenuClick,
      };


    return(
        <main className={styles.main}>
        <ChartDrawer></ChartDrawer>
        <div className={styles.content}>
            <h1>Аналитика рынка</h1>
            <div className={styles.toolsWrapper}>
                <Dropdown menu={menuProps}>
                    <Button style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: '20px',
                    height:'36px',
                    border: 'none',
                }}>
                        <Space>
                        {selectedCategory}
                        <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
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
            </div>
           
                    <div className={styles.cardsWrapper}>
                        <div style={{width:"100%"}} className={styles.chartCard}>
                            <div className={styles.chartHeader}>
                                <div>Доля компании на рынке по сегментам</div>
                                <div>Изменения</div>
                            </div>
                            <ScatterChart dataset={dataset} me={me} name='ИМЯ СКАТЕРА' ></ScatterChart>
                        </div>

                        

                        <div className={styles.widget}>
                            <div className={styles.widgetTitle}>оборот сегмента</div>
                            <div className={styles.widgetValue}>₽ 10,260,560 <img src='/up.svg'></img></div>
                            <div className={styles.widgetDescr}> изменения в сегменте 12% <img src='/up.svg'></img></div>
                            <div className={styles.widgetDescr}>общий оборот рынка 3% <img src='/down.svg'></img></div>
                        </div>
                        <div className={styles.widget}>
                            <div className={styles.widgetTitle}>оборот сегмента</div>
                            <div className={styles.widgetValue}>₽ 10,260,560 <img src='/up.svg'></img></div>
                            <div className={styles.widgetDescr}> изменения в сегменте 12% <img src='/up.svg'></img></div>
                            <div className={styles.widgetDescr}>общий оборот рынка 3% <img src='/down.svg'></img></div>
                        </div>
                        <div className={styles.widget}>
                            <div className={styles.widgetTitle}>оборот сегмента</div>
                            <div className={styles.widgetValue}>₽ 10,260,560 <img src='/up.svg'></img></div>
                            <div className={styles.widgetDescr}> изменения в сегменте 12% <img src='/up.svg'></img></div>
                            <div className={styles.widgetDescr}>общий оборот рынка 3% <img src='/down.svg'></img></div>
                        </div>
                        <div className={styles.widget}>
                            <div className={styles.widgetTitle}>оборот сегмента</div>
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

export default Competitors