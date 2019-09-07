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
  { label: '0.1', 列车数量: 154, 旅客数量: 80, 票务信息: 45, 发车数量: 100 },
  { label: '0.2', 列车数量: 190, 旅客数量: 80, 票务信息: 13, 发车数量: 81 },
  { label: '0.3', 列车数量: 121, 旅客数量: 90, 票务信息: 90, 发车数量: 101 },
  { label: '0.4', 列车数量: 150, 旅客数量: 50, 票务信息: 39, 发车数量: 52 },
  { label: '0.5', 列车数量: 123, 旅客数量: 24, 票务信息: 50, 发车数量: 65},
  { label: '0.6', 列车数量: 112, 旅客数量: 64, 票务信息: 66, 发车数量: 54 },
  { label: '0.7', 列车数量: 163, 旅客数量: 44, 票务信息: 16, 发车数量: 87 },
  { label: '0.8', 列车数量: 123, 旅客数量: 24, 票务信息: 66, 发车数量: 75 },
  { label: '0.9', 列车数量: 153, 旅客数量: 34, 票务信息: 23, 发车数量: 84 },
  { label: '1.0', 列车数量: 123, 旅客数量: 23, 票务信息: 78, 发车数量: 81 },
  { label: '未评分', 列车数量: 113, 旅客数量: 13, 票务信息: 66, 发车数量: 110 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['列车数量', '旅客数量', '票务信息','发车数量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  发车数量: {
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
            { value: '列车数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '旅客数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '票务信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '发车数量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '发车数量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '发车数量') {
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
            if (value === '汽车数量') {
              return '#2b6cbb';
            }
            if (value === '发车数量') {
              return '#41a2fc';
            }
            if (value === '旅客数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*发车数量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
