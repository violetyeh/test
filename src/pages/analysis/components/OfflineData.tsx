import React from 'react';
import { Card, Tabs, Row, Col } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Charts from './Charts';
import styles from '../style.less';
import NumberInfo from './NumberInfo';
import { IOfflineData, IOfflineChartData } from '../data';
import DataSet from '@antv/data-set';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';


// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [
  { label: '0.1',大数据采集数量: 7810, 大数据采集来源信息: 5180, 采集智能分析信息: 1610, 数据分析信息: 1010 },
  { label: '0.2',大数据采集数量: 8920, 大数据采集来源信息: 6280, 采集智能分析信息: 1230, 数据分析信息: 208 },
  { label: '0.3',大数据采集数量: 6935, 大数据采集来源信息: 7190, 采集智能分析信息: 4190, 数据分析信息: 310 },
  { label: '0.4',大数据采集数量: 5510, 大数据采集来源信息: 1250, 采集智能分析信息: 4329, 数据分析信息: 505 },
  { label: '0.5',大数据采集数量: 2223, 大数据采集来源信息: 2124, 采集智能分析信息: 1166, 数据分析信息: 406},
  { label: '0.6',大数据采集数量: 1233, 大数据采集来源信息: 1264, 采集智能分析信息: 626, 数据分析信息: 525 },
  { label: '0.7',大数据采集数量: 1613, 大数据采集来源信息: 4144, 采集智能分析信息: 1266, 数据分析信息: 438 },
  { label: '0.8',大数据采集数量: 1223, 大数据采集来源信息: 3224, 采集智能分析信息: 5626, 数据分析信息: 527 },
  { label: '0.9',大数据采集数量: 1533, 大数据采集来源信息: 5134, 采集智能分析信息: 2213, 数据分析信息: 128 },
  { label: '1.0',大数据采集数量: 1213, 大数据采集来源信息: 1223, 采集智能分析信息: 1178, 数据分析信息: 428 },
  { label: '未评分',大数据采集数量: 1223, 大数据采集来源信息: 1123, 采集智能分析信息: 1166, 数据分析信息: 1010 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['大数据采集数量', '大数据采集来源信息', '采集智能分析信息','数据分析信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  数据分析信息: {
    type: 'linear',
    min: 0,
    max: 10,
  },
};

let chartIns = null;

const getG2Instance = (chart) => {
  chartIns = chart;
};

const { TabPane } = Tabs;

const OfflineData = ({
  activeKey,
  loading,
  offlineData,
  offlineChartData,
  handleTabChange,
}: {
  activeKey: string;
  loading: boolean;
  offlineData: IOfflineData[];
  offlineChartData: IOfflineChartData[];
  handleTabChange: (activeKey: string) => void;
}) => (
    <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginTop: 32 }}>
      <Chart height={400} width={500} forceFit data={dv} scale={scale} padding="auto" onGetG2Instance={getG2Instance}>
        <Legend
          custom
          allowAllCanceled
          items={[
            { value: '大数据采集数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '大数据采集来源信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '采集智能分析信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '数据分析信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '数据分析信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '数据分析信息') {
                geom.getShapes().map((shape) => {
                  if (shape._cfg.origin._origin.type == value) {
                    shape._cfg.visible = !shape._cfg.visible;
                  }
                  shape.get('canvas').draw();
                  return shape;
                });
              }
            }
          }}
        />
        <Axis name="label" />
        <Axis name="value" position={'left'} />
        <Tooltip />
        <Geom
          type="interval"
          position="label*value"
          color={['type', (value) => {
            if (value === '分析数量') {
              return '#2b6cbb';
            }
            if (value === '采集数据') {
              return '#41a2fc';
            }
            if (value === '大数据采集来源信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*数据分析信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
