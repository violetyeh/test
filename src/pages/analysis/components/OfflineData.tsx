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
  { label: '0.1', 云主机信息: 3563, 内存容量: 1000, 资源池信息 : 1600, 机房信息 : 3082 },
  { label: '0.2', 云主机信息: 1900, 内存容量: 2880, 资源池信息 : 1700, 机房信息 : 1463 },
  { label: '0.3', 云主机信息: 1950, 内存容量: 1950, 资源池信息 : 1800, 机房信息 : 1075 },
  { label: '0.4', 云主机信息: 1500, 内存容量: 1500, 资源池信息 : 1390, 机房信息 : 2156 },
  { label: '0.5', 云主机信息: 4215, 内存容量: 4215, 资源池信息 : 1166, 机房信息 : 1266 },
  { label: '0.6', 云主机信息: 4215, 内存容量: 2634, 资源池信息 : 2010, 机房信息 : 1254 },
  { label: '0.7', 云主机信息: 3634, 内存容量: 1434, 资源池信息 : 2010, 机房信息 : 1283 },
  { label: '0.8', 云主机信息: 4215, 内存容量: 4284, 资源池信息 : 2010, 机房信息 : 2175 },
  { label: '0.9', 云主机信息: 1534, 内存容量: 1334, 资源池信息 : 2236, 机房信息 : 1281 },
  { label: '1.0', 云主机信息: 4215, 内存容量: 3234, 资源池信息 : 786, 机房信息 :1183 },
  { label: '未评分', 云主机信息: 2234, 内存容量: 4234, 资源池信息 : 2010, 机房信息 : 3164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['云主机信息', '内存容量', '资源池信息','机房信息' ], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  机房信息 : {
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
            { value: '云主机信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '内存容量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '资源池信息 ', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '机房信息' , marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value ===  '机房信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '机房信息') {
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
            if (value === '网卡数量') {
              return '#2b6cbb';
            }
            if (value === '资源池') {
              return '#41a2fc';
            }
            if (value === '内存容量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*机房信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
