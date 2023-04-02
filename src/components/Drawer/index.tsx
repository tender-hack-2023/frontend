import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from './drawer.module.css'


export const ChartDrawer: React.FC = () =>{
    let router = useRouter()
    let path = router.pathname.split('/')[router.pathname.split('/').length-2]
    const { inn } = router.query




    const setActiveBtn = (btn:string) =>{
        router.push("/" + btn+'/' + inn)
    }

    return(
        <div className={styles.drawerWrapper}>
            <img className={styles.logo} onClick={()=>router.push('/')} src='/logo.png'></img>

            <div className={styles.menuWrapper}>
                <div className={styles.analWrapper}>
                    <img src='/analytics.svg' ></img>
                    <div>Аналитика</div>
                </div>
                <div onClick={()=>setActiveBtn('sales')} className={ path == 'sales'?  styles.activeBtn:styles.btn}>
                    Продажи
                </div>
                <div onClick={()=>setActiveBtn('market')} className={ path  == 'market'?  styles.activeBtn:styles.btn}>
                    Рынок
                </div>
                <div onClick={()=>setActiveBtn('competitors')} className={ path  == 'competitors'?  styles.activeBtn:styles.btn}>
                    Конкуренты
                </div>
            
            </div> 

        </div>
    );
}
