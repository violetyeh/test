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
  { label: '0.1', 高速公路桥梁健康监测信息: 3563, 高速公路桥梁数量: 1000, 健康监测设置信息: 1600, 监测效率: 282 },
  { label: '0.2', 高速公路桥梁健康监测信息: 1900, 高速公路桥梁数量: 1880, 健康监测设置信息: 1700, 监测效率: 143 },
  { label: '0.3', 高速公路桥梁健康监测信息: 1950, 高速公路桥梁数量: 1950, 健康监测设置信息: 1800, 监测效率: 105 },
  { label: '0.4', 高速公路桥梁健康监测信息: 1500, 高速公路桥梁数量: 1500, 健康监测设置信息: 1390, 监测效率: 216 },
  { label: '0.5', 高速公路桥梁健康监测信息: 2034, 高速公路桥梁数量: 2034, 健康监测设置信息: 1166, 监测效率: 166 },
  { label: '0.6', 高速公路桥梁健康监测信息: 2034, 高速公路桥梁数量: 1634, 健康监测设置信息: 1666, 监测效率: 154 },
  { label: '0.7', 高速公路桥梁健康监测信息: 1634, 高速公路桥梁数量: 1434, 健康监测设置信息: 1666, 监测效率: 183 },
  { label: '0.8', 高速公路桥梁健康监测信息: 2034, 高速公路桥梁数量: 1284, 健康监测设置信息: 1666, 监测效率: 275 },
  { label: '0.9', 高速公路桥梁健康监测信息: 1534, 高速公路桥梁数量: 1334, 健康监测设置信息: 1236, 监测效率: 181 },
  { label: '1.0', 高速公路桥梁健康监测信息: 2034, 高速公路桥梁数量: 2034, 健康监测设置信息: 786, 监测效率: 213 },
  { label: '未评分', 高速公路桥梁健康监测信息: 2034, 高速公路桥梁数量: 2034, 健康监测设置信息: 666, 监测效率: 264 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['高速公路桥梁健康监测信息', '高速公路桥梁数量', '健康监测设置信息','监测效率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  监测效率: {
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
            { value: '高速公路桥梁健康监测信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '高速公路桥梁数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '健康监测设置信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '监测效率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '监测效率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '监测效率') {
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
            if (value === '高速公路桥梁数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*监测效率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
