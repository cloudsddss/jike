import {useEffect, useRef} from "react";
import * as echarts from 'echarts';

const BarChart = ({title, nameData, highData, style = { width: 300, height: 300 }}) => {
    const chartRef = useRef(null);
    useEffect(() => {
        //保证dom可以用,再绘制图表
        const chartDom = chartRef.current;
        // 初始化echarts实例
        const myChart = echarts.init(chartDom);
        // 指定图表的配置项和数据
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: nameData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: highData,
                    type: 'bar'
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        option && myChart.setOption(option);
        // 销毁图表，防止内存泄漏
        return () => {
            myChart.dispose();
        };
    }, [highData, nameData, title]);
    return (
        <div>
            <div ref={chartRef} style={style}></div>
        </div>
    );
}
export default BarChart;
