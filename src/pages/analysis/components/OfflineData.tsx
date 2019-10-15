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
  { label: '0.1', 仓库数量: 156, 物资数量: 1000, 仓储信息: 1600, 仓库占用率: 208 },
  { label: '0.2', 仓库数量: 190, 物资数量: 1880, 仓储信息: 1700, 仓库占用率: 146 },
  { label: '0.3', 仓库数量: 195, 物资数量: 1950, 仓储信息: 1800, 仓库占用率: 107 },
  { label: '0.4', 仓库数量: 150, 物资数量: 1500, 仓储信息: 1390, 仓库占用率: 215 },
  { label: '0.5', 仓库数量: 123, 物资数量: 1234, 仓储信息: 1166, 仓库占用率: 126 },
  { label: '0.6', 仓库数量: 123, 物资数量: 1634, 仓储信息: 1666, 仓库占用率: 125 },
  { label: '0.7', 仓库数量: 164, 物资数量: 1434, 仓储信息: 1666, 仓库占用率: 128 },
  { label: '0.8', 仓库数量: 134, 物资数量: 1284, 仓储信息: 1666, 仓库占用率: 217 },
  { label: '0.9', 仓库数量: 154, 物资数量: 1334, 仓储信息: 1236, 仓库占用率: 128 },
  { label: '1.0', 仓库数量: 124, 物资数量: 1234, 仓储信息: 786, 仓库占用率: 218},
  { label: '未评分', 仓库数量: 134, 物资数量: 1234, 仓储信息: 666, 仓库占用率: 216 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['仓库数量', '物资数量', '仓储信息','仓库占用率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  仓库占用率: {
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
            { value: '仓库数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '物资数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '仓储信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '仓库占用率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '仓库占用率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '仓库占用率') {
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
            if (value === '仓库数量') {
              return '#2b6cbb';
            }
            if (value === '预警信息') {
              return '#41a2fc';
            }
            if (value === '物资数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*仓库占用率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
