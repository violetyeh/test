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
  { label: '0.1', 收费站数量: 35, 道路车辆数: 1000, 收费信息: 1600, 收费收益: 2082 },
  { label: '0.2', 收费站数量: 19, 道路车辆数: 1880, 收费信息: 1700, 收费收益: 1463 },
  { label: '0.3', 收费站数量: 19, 道路车辆数: 1950, 收费信息: 1800, 收费收益: 1075 },
  { label: '0.4', 收费站数量: 15, 道路车辆数: 1500, 收费信息: 1390, 收费收益: 2156 },
  { label: '0.5', 收费站数量: 20, 道路车辆数: 2034, 收费信息: 1166, 收费收益: 1266 },
  { label: '0.6', 收费站数量: 20, 道路车辆数: 1634, 收费信息: 1666, 收费收益: 1254 },
  { label: '0.7', 收费站数量: 16, 道路车辆数: 1434, 收费信息: 1666, 收费收益: 1283 },
  { label: '0.8', 收费站数量: 20, 道路车辆数: 1284, 收费信息: 1666, 收费收益: 2175 },
  { label: '0.9', 收费站数量: 15, 道路车辆数: 1334, 收费信息: 1236, 收费收益: 1281 },
  { label: '1.0', 收费站数量: 20, 道路车辆数: 2034, 收费信息: 786, 收费收益: 2183 },
  { label: '未评分', 收费站数量: 20, 道路车辆数: 2034, 收费信息: 666, 收费收益: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['收费站数量', '道路车辆数', '收费信息','收费收益'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  收费收益: {
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
            { value: '收费站数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '道路车辆数', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '收费信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '收费收益', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '收费收益') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '收费收益') {
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
            if (value === '预警信息') {
              return '#41a2fc';
            }
            if (value === '道路车辆数') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*收费收益" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
