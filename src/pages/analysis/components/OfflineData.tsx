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
  { label: '0.1', 规划设计总面积: 3563, 已规划面积: 1000, 景观区域信息: 1600, 设计进度: 2082 },
  { label: '0.2', 规划设计总面积: 1900, 已规划面积: 1880, 景观区域信息: 1700, 设计进度: 1463 },
  { label: '0.3', 规划设计总面积: 1950, 已规划面积: 1950, 景观区域信息: 1800, 设计进度: 1075 },
  { label: '0.4', 规划设计总面积: 1500, 已规划面积: 1500, 景观区域信息: 1390, 设计进度: 2156 },
  { label: '0.5', 规划设计总面积: 2034, 已规划面积: 2034, 景观区域信息: 1166, 设计进度: 1266 },
  { label: '0.6', 规划设计总面积: 2034, 已规划面积: 1634, 景观区域信息: 1666, 设计进度: 1254 },
  { label: '0.7', 规划设计总面积: 1634, 已规划面积: 1434, 景观区域信息: 1666, 设计进度: 1283 },
  { label: '0.8', 规划设计总面积: 2034, 已规划面积: 1284, 景观区域信息: 1666, 设计进度: 2175 },
  { label: '0.9', 规划设计总面积: 1534, 已规划面积: 1334, 景观区域信息: 1236, 设计进度: 1281 },
  { label: '1.0', 规划设计总面积: 2034, 已规划面积: 2034, 景观区域信息: 786, 设计进度: 2183 },
  { label: '未评分', 规划设计总面积: 2034, 已规划面积: 2034, 景观区域信息: 666, 设计进度: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['规划设计总面积', '已规划面积', '景观区域信息','设计进度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  设计进度: {
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
            { value: '规划设计总面积', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '已规划面积', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '景观区域信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '设计进度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '设计进度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '设计进度') {
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
            if (value === '规划数量') {
              return '#2b6cbb';
            }
            if (value === '设计信息') {
              return '#41a2fc';
            }
            if (value === '已规划面积') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*设计进度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
