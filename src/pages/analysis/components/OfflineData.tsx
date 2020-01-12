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
  { label: '0.1', 提取物数量: 154, 深加工数量: 80, 分离纯化数量: 45, PID控制程序信息: 100 },
  { label: '0.2', 提取物数量: 190, 深加工数量: 80, 分离纯化数量: 13, PID控制程序信息: 81 },
  { label: '0.3', 提取物数量: 121, 深加工数量: 90, 分离纯化数量: 90, PID控制程序信息: 101 },
  { label: '0.4', 提取物数量: 150, 深加工数量: 50, 分离纯化数量: 39, PID控制程序信息: 52 },
  { label: '0.5', 提取物数量: 123, 深加工数量: 24, 分离纯化数量: 50, PID控制程序信息: 65},
  { label: '0.6', 提取物数量: 112, 深加工数量: 64, 分离纯化数量: 66, PID控制程序信息: 54 },
  { label: '0.7', 提取物数量: 163, 深加工数量: 44, 分离纯化数量: 16, PID控制程序信息: 87 },
  { label: '0.8', 提取物数量: 123, 深加工数量: 24, 分离纯化数量: 66, PID控制程序信息: 75 },
  { label: '0.9', 提取物数量: 153, 深加工数量: 34, 分离纯化数量: 23, PID控制程序信息: 84 },
  { label: '1.0', 提取物数量: 123, 深加工数量: 23, 分离纯化数量: 78, PID控制程序信息: 81 },
  { label: '未评分', 提取物数量: 113, 深加工数量: 13, 分离纯化数量: 66, PID控制程序信息: 110 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['提取物数量', '深加工数量', '分离纯化数量','PID控制程序信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  PID控制程序信息: {
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
            { value: '提取物数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '深加工数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '分离纯化数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: 'PID控制程序信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === 'PID控制程序信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== 'PID控制程序信息') {
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
            if (value === '分离数量') {
              return '#2b6cbb';
            }
            if (value === 'PID控制程序信息') {
              return '#41a2fc';
            }
            if (value === '深加工数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*PID控制程序信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
