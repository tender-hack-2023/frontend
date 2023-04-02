
//интерфейс конкретной линии на графики, либо Баров/круговых диаграмм, где:
// по Y - их высота\занимаемая область (можно значени), а по X - название
//Если строить stackedBar, то надо каждый "слой" этого бара отдельным датасетом, сначала нижний, потом верхний и тд
export interface ChartDatasetIE{   
    name: string, 
    dataY: number[],
    dataX: number[] | string[],
} 

export interface ChartDatasetColoredIE extends ChartDatasetIE{
    borderColor:string,
    backgroundColor:string,
    fill?: boolean
} //это для front отображения

//Интерфейс TreeMap диаграммы
export interface  TreeMapChartIE{
    name:string,
    points: {
        id:string, 
        name:string,
        parent:string, //значение поле id родительского объекта
        value?:number, //это поле указывается только у конечного "листа" дерева объектов, т.е у закупки
    }[]
}







