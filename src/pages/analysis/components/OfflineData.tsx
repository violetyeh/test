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
  { label: '0.1', 运输货物信息: 280, 运输车辆数量: 280, 增加车辆数量: 226, 调度信息: 200 },
  { label: '0.2', 运输货物信息: 180, 运输车辆数量: 180, 增加车辆数量: 130, 调度信息: 300 },
  { label: '0.3', 运输货物信息: 95, 运输车辆数量: 95, 增加车辆数量: 90, 调度信息: 340 },
  { label: '0.4', 运输货物信息: 500, 运输车辆数量: 500, 增加车辆数量: 390, 调度信息: 100 },
  { label: '0.5', 运输货物信息: 170, 运输车辆数量: 170, 增加车辆数量: 100, 调度信息: 300 },
  { label: '0.6', 运输货物信息: 170, 运输车辆数量: 170, 增加车辆数量: 100, 调度信息: 123 },
  { label: '0.7', 运输货物信息: 170, 运输车辆数量: 370, 增加车辆数量: 100, 调度信息: 251 },
  { label: '0.8', 运输货物信息: 170, 运输车辆数量: 270, 增加车辆数量: 200, 调度信息: 146 },
  { label: '0.9', 运输货物信息: 170, 运输车辆数量: 400, 增加车辆数量: 150, 调度信息: 145 },
  { label: '1.0', 运输货物信息: 170, 运输车辆数量: 170, 增加车辆数量: 100, 调度信息: 102 },
  { label: '未评分', 运输货物信息: 170, 运输车辆数量: 170, 增加车辆数量: 110, 调度信息: 210 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['运输货物信息', '运输车辆数量', '增加车辆数量','调度信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  调度信息: {
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
            { value: '运输货物信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '运输车辆数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '增加车辆数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '调度信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '调度信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '调度信息') {
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
            if (value === '运输车辆数量') {
              return '#2b6cbb';
            }
            if (value === '货物信息') {
              return '#41a2fc';
            }
            if (value === '路线信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*调度信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
