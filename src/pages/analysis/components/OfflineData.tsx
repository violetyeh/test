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
  { label: '0.1', 预防信息: 2563, DDOS攻击警报信息: 1000, 警报数量: 1600, 预防效率: 2082 },
  { label: '0.2', 预防信息: 1900, DDOS攻击警报信息: 880, 警报数量: 1700, 预防效率: 1463 },
  { label: '0.3', 预防信息: 1950, DDOS攻击警报信息: 1950, 警报数量: 800, 预防效率: 1075 },
  { label: '0.4', 预防信息: 2250, DDOS攻击警报信息: 2250, 警报数量: 1390, 预防效率: 2156 },
  { label: '0.5', 预防信息: 2021, DDOS攻击警报信息: 2021, 警报数量: 1166, 预防效率: 1266 },
  { label: '0.6', 预防信息: 2021, DDOS攻击警报信息: 2634, 警报数量: 987, 预防效率: 1254 },
  { label: '0.7', 预防信息: 1634, DDOS攻击警报信息: 1434, 警报数量: 987, 预防效率: 1283 },
  { label: '0.8', 预防信息: 2021, DDOS攻击警报信息: 1284, 警报数量: 987, 预防效率: 2175 },
  { label: '0.9', 预防信息: 1534, DDOS攻击警报信息: 1334, 警报数量: 1236, 预防效率: 1281 },
  { label: '1.0', 预防信息: 2021, DDOS攻击警报信息: 2021, 警报数量: 786, 预防效率:983 },
  { label: '未评分', 预防信息: 2021, DDOS攻击警报信息: 2021, 警报数量: 2666, 预防效率: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['预防信息', 'DDOS攻击警报信息', '警报数量','预防效率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  预防效率: {
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
            { value: '预防信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: 'DDOS攻击警报信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '警报数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '预防效率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '预防效率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '预防效率') {
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
            if (value === '预防效率') {
              return '#41a2fc';
            }
            if (value === 'DDOS攻击警报信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*预防效率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
