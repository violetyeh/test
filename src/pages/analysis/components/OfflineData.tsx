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
  { label: '0.1', 隧道照明信息: 2563, 隧道长度: 1000, 灯光故障信息 : 1600, 控制设备: 2082 },
  { label: '0.2', 隧道照明信息: 1900, 隧道长度: 2880, 灯光故障信息 : 1700, 控制设备: 1463 },
  { label: '0.3', 隧道照明信息: 1950, 隧道长度: 1950, 灯光故障信息 : 1800, 控制设备: 1075 },
  { label: '0.4', 隧道照明信息: 1500, 隧道长度: 1500, 灯光故障信息 : 1390, 控制设备: 2156 },
  { label: '0.5', 隧道照明信息: 1234, 隧道长度: 1234, 灯光故障信息 : 1166, 控制设备: 1266 },
  { label: '0.6', 隧道照明信息: 1234, 隧道长度: 2634, 灯光故障信息 : 1666, 控制设备: 1254 },
  { label: '0.7', 隧道照明信息: 3634, 隧道长度: 1434, 灯光故障信息 : 1666, 控制设备: 1283 },
  { label: '0.8', 隧道照明信息: 1234, 隧道长度: 4284, 灯光故障信息 : 1666, 控制设备: 2175 },
  { label: '0.9', 隧道照明信息: 1534, 隧道长度: 1334, 灯光故障信息 : 2236, 控制设备: 1281 },
  { label: '1.0', 隧道照明信息: 1234, 隧道长度: 1234, 灯光故障信息 : 786, 控制设备:5183 },
  { label: '未评分', 隧道照明信息: 1234, 隧道长度: 1234, 灯光故障信息 : 4666, 控制设备: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['隧道照明信息', '隧道长度', '灯光故障信息','控制设备'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  控制设备: {
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
            { value: '隧道照明信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '隧道长度', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '灯光故障信息 ', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '控制设备', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '控制设备') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '控制设备') {
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
            if (value === '路灯数量') {
              return '#2b6cbb';
            }
            if (value === '隧道照明信息') {
              return '#41a2fc';
            }
            if (value === '隧道长度') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*控制设备" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
