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
  { label: '0.1', 计重车辆数量: 1563, 今日计重车辆数量: 1000, 货车数量: 600, 计重单价: 80 },
  { label: '0.2', 计重车辆数量: 900, 今日计重车辆数量: 880, 货车数量: 700, 计重单价: 60 },
  { label: '0.3', 计重车辆数量: 950, 今日计重车辆数量: 950, 货车数量: 800, 计重单价: 70 },
  { label: '0.4', 计重车辆数量: 500, 今日计重车辆数量: 500, 货车数量: 390, 计重单价: 50 },
  { label: '0.5', 计重车辆数量: 234, 今日计重车辆数量: 234, 货车数量: 166, 计重单价: 60 },
  { label: '0.6', 计重车辆数量: 1234, 今日计重车辆数量: 634, 货车数量: 666, 计重单价: 50 },
  { label: '0.7', 计重车辆数量: 634, 今日计重车辆数量: 434, 货车数量: 766, 计重单价: 80 },
  { label: '0.8', 计重车辆数量: 234, 今日计重车辆数量: 284, 货车数量: 666, 计重单价: 75},
  { label: '0.9', 计重车辆数量: 534, 今日计重车辆数量: 334, 货车数量: 236, 计重单价: 80 },
  { label: '1.0', 计重车辆数量: 234, 今日计重车辆数量: 234, 货车数量: 786, 计重单价: 85 },
  { label: '未评分', 计重车辆数量: 234, 今日计重车辆数量: 234, 货车数量: 666, 计重单价: 65 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['计重车辆数量', '今日计重车辆数量', '货车数量','计重单价'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  计重单价: {
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
            { value: '计重车辆数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '今日计重车辆数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '货车数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '计重单价', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '计重单价') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '计重单价') {
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
            if (value === '车辆数量') {
              return '#2b6cbb';
            }
            if (value === '计重价格') {
              return '#41a2fc';
            }
            if (value === '今日计重车辆数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*计重单价" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
