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
  { label: '0.1', 存储空间大小: 1500, 存储数量: 1400, 分布式存储空间信息:2390, 存储占比: 1000 },
  { label: '0.2', 存储空间大小: 1900, 存储数量: 2600, 分布式存储空间信息: 4113, 存储占比: 1200 },
  { label: '0.3', 存储空间大小: 1950, 存储数量: 3950, 分布式存储空间信息: 3250, 存储占比: 1100 },
  { label: '0.4', 存储空间大小: 5100, 存储数量: 1500, 分布式存储空间信息: 2139, 存储占比: 1500 },
  { label: '0.5', 存储空间大小: 2510, 存储数量: 1950, 分布式存储空间信息: 4652, 存储占比: 900 },
  { label: '0.6', 存储空间大小: 1950, 存储数量: 4634, 分布式存储空间信息: 2252, 存储占比: 3000 },
  { label: '0.7', 存储空间大小: 1950, 存储数量: 1685, 分布式存储空间信息: 1152, 存储占比: 2600 },
  { label: '0.8', 存储空间大小: 1000, 存储数量: 3950, 分布式存储空间信息: 1152, 存储占比: 520 },
  { label: '0.9', 存储空间大小: 2350, 存储数量: 1950, 分布式存储空间信息: 2252, 存储占比: 3100 },
  { label: '1.0', 存储空间大小: 3150, 存储数量: 1950, 分布式存储空间信息: 5112, 存储占比: 1203 },
  { label: '未评分', 存储空间大小: 1150, 存储数量: 1950, 分布式存储空间信息: 52, 存储占比: 1420 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['存储空间大小', '存储数量', '分布式存储空间信息','存储占比'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  存储占比: {
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
            { value: '存储空间大小', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '存储数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '分布式存储空间信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '存储占比', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '存储占比') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '存储占比') {
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
            if (value === '检测数量') {
              return '#2b6cbb';
            }
            if (value === '样品数') {
              return '#41a2fc';
            }
            if (value === '存储数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*存储占比" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
