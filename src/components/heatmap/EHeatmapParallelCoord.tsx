import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import type { HeatmapConfig, WarpingPair } from './Heatmap.types';
import { exampleScales } from '../colorscales';
import React from 'react';

type auxProps = {
    refHmapConfig: HeatmapConfig[];
    targetHmapConfig: HeatmapConfig[];
    warpingPairs: WarpingPair[];
    textColor: string;
}

function getColor(value: number){
    let red: number;
    let green: number;
    let blue: number;
    if(value < 0){
        red = Math.max(0, Math.min(255, 112*value+239));
        green = Math.max(0, Math.min(255, 90*value+255));
        blue = Math.max(0, Math.min(255, 100*value+268));
    } else {
        red = Math.max(0, Math.min(255, 239-value));
        green = Math.max(0, Math.min(255, 255-98*value));
        blue = Math.max(0, Math.min(255, 166-46*value));
    }
    return "rgb("+red+","+green+","+blue+")";
}

export default function EHeatmapParallelCoord({refHmapConfig, targetHmapConfig, warpingPairs, textColor}: auxProps){
    const refVisualMapSpacing = 13 / Math.max(refHmapConfig.length, 1);
    const targetVisualMapSpacing = 13 / Math.max(targetHmapConfig.length, 1);
    const warpingValues = warpingPairs.map((pair) => pair.d_o_g);
    const warpingMin = Math.min(...warpingValues);
    const warpingMax = Math.max(...warpingValues);
    const warpingColorScale = useMemo(() => {
        const colorSteps = 33;
        return Array.from({ length: colorSteps }, (_, index) => {
            const ratio = index / (colorSteps - 1);
            return getColor(warpingMin + (warpingMax - warpingMin) * ratio);
        });
    }, [warpingMin, warpingMax]);

    const getRefHmap = useMemo(() => {
        return refHmapConfig.map((config) => ({            
                        id: "ref"+config.name,
                        type: 'heatmap',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: config.data.map((value, index) => [index, config.name, value]),
                        animation: false,
                        emphasis: {
                            itemStyle: {
                                borderColor: textColor,
                                borderWidth: 0.5,
                                shadowBlur: 10,             // Sombra para dar efecto de elevación
                                shadowColor: 'rgba(0,0,0,0.5)'
                            },
                        },
                        blur: {
                            itemStyle: {
                                opacity: 0.15               // Mantiene el contexto atenuando el resto
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: function(params: any){
                                return `
                                    <b>Time from Reference: ${params.value[0]}</b>
                                    <p>${params.value[1]}: <span style="color:${params.color}">█</span> ${params.value[2]}</p>                             
                                    `
                            }
                        }
                    }));
    }, [refHmapConfig, textColor]);

    const getTargetHmap = useMemo(() => {
        return targetHmapConfig.map((config) => ({            
                        id: "target"+config.name,
                        type: 'heatmap',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        data: config.data.map((value, index) => [index, config.name, value]),
                        animation: false,
                        emphasis: {
                            itemStyle: {
                                borderColor: textColor,
                                borderWidth: 1,
                            },
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: function(params: any){
                                return `
                                    <b>Time from Target: ${params.value[0]}</b>
                                    <p>${params.value[1]}: <span style="color:${params.color}">█</span> ${params.value[2]}</p>                             
                                    `
                            }
                        }
                    }));
    }, [targetHmapConfig, textColor]);

    const getWarpingChart = useMemo(() => {
        return warpingPairs.map((pair) => ({
                        type: 'line',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [
                            [pair.n + 0.5,1],[pair.f_n + 0.5,0]
                        ],
                        lineStyle: { width: 1.5 },
                        color: getColor(pair.d_o_g),
                        symbol: 'circle',
                        symbolSize: 2,
                        animation: false
                    }))
    }, [warpingPairs]);

    const getRefVisualMaps = useMemo(() => {
        return refHmapConfig.map((config) => ({
                    id: "VMref"+config.name,
                    type: 'continuous',
                    seriesId: "ref"+config.name,
                    min: config.min,
                    max: config.max,
                    calculable: false,
                    realtime: false,
                    show: true,
                    orient: 'horizontal',
                    textStyle: { color: textColor },
                    left: '15%',
                    top: (2 + refVisualMapSpacing * config.id).toString() + '%',
                    text: ["",config.name],
                    inRange: {
                    color: exampleScales[config.scaleIndex].scale,
                    },
                    formatter: function (value: string) {
                    return value;
                    }
                }));
    }, [refHmapConfig, textColor]);

    const getTargetVisualMaps = useMemo(() => {
        return targetHmapConfig.map((config) => ({
                    id: "VMtarget"+config.name,
                    type: 'continuous',
                    seriesId: "target"+config.name,
                    min: config.min, 
                    max: config.max,
                    calculable: false,
                    realtime: false,
                    show: true,
                    orient: 'horizontal',
                    textStyle: { color: textColor },
                    left: '15%',
                    bottom: (2 + targetVisualMapSpacing * config.id).toString() + '%',
                    text: ["",config.name],
                    inRange: {
                        color: exampleScales[config.scaleIndex].scale,
                    },
                    formatter: function (value: string) {
                        return value;
                    }
                }))
    }, [targetHmapConfig, textColor])

    const getWarpingLegendVisualMap = useMemo(() => {
        return {
            id: 'VMwarpingLegend',
            type: 'continuous',
            seriesIndex: [],
            min: warpingMin,
            max: warpingMax,
            calculable: false,
            realtime: false,
            show: true,
            orient: 'vertical',
            textStyle: { color: textColor },
            left: '2%',
            top: '36%',
            text: ['Early', 'Late'],
            textGap: 8,
            itemHeight: 180,
            inRange: {
                color: warpingColorScale,
            },
        };
    }, [warpingMin, warpingMax, warpingColorScale, textColor]);

    const getOption = useMemo(() => {
        if(getRefHmap.length > 0 && getTargetHmap.length > 0 && getWarpingChart.length > 0){
            return ({
                tooltip: {},
                textStyle: { color: textColor },
                grid: [
                    { top: '17%', height: '25%' },
                    { top: '36%', height: '25%'},
                    { bottom: '20%', height: '25%' }

                ], 
                xAxis: [
                    {gridIndex: 0, type: 'category', data: getRefHmap[0]?.data.map((_, index) => index), axisLabel: {show: false}},
                    {gridIndex: 1, type: 'value', min: 0, max: getWarpingChart.length, splitLine:{show:false}, axisLabel: {show: false}},
                    {gridIndex: 2, type: 'category', data: getTargetHmap[0]?.data.map((_, index) => index), axisLabel: { color: textColor }}
                ],
                yAxis: [
                    {gridIndex: 0, type: 'category', axisLabel: { color: textColor }},
                    {gridIndex: 1, type: 'category', data: ['Target', 'Reference'], axisLabel: { color: textColor }},
                    {gridIndex: 2, type: 'category', axisLabel: { color: textColor }}
                ],
                visualMap: [...getRefVisualMaps, ...getTargetVisualMaps, getWarpingLegendVisualMap],
                series: [...getRefHmap, ...getTargetHmap, ...getWarpingChart]
            } as Object);
        }
        return null;
    }, [getRefVisualMaps, getTargetVisualMaps, getWarpingLegendVisualMap, getRefHmap, getTargetHmap, getWarpingChart, textColor]);    

    return (<>
    {getOption && <div style={{ width: "100%", height: "100%" }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '45em' }}>
                <ReactECharts option={getOption} style={{ height: '100%', flex: 1, minWidth: 0 }} notMerge={true} opts={{renderer: 'svg'}}/>
            </div>
        </div> }             
    </>);
}
