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
  { label: '0.1', 装配式建筑数量: 113, 监理设备数量: 222, 建筑信息: 260, 监理效率: 412 },
  { label: '0.2', 装配式建筑数量: 180, 监理设备数量: 180, 建筑信息: 300, 监理效率: 413 },
  { label: '0.3', 装配式建筑数量: 450, 监理设备数量: 950, 建筑信息: 900, 监理效率: 415 },
  { label: '0.4', 装配式建筑数量: 330, 监理设备数量: 500, 建筑信息: 390, 监理效率: 511 },
  { label: '0.5', 装配式建筑数量: 634, 监理设备数量: 634, 建筑信息: 150, 监理效率:123 },
  { label: '0.6', 装配式建筑数量: 634, 监理设备数量: 634, 建筑信息: 200, 监理效率: 156 },
  { label: '0.7', 装配式建筑数量: 634, 监理设备数量: 634, 建筑信息: 100, 监理效率: 117 },
  { label: '0.8', 装配式建筑数量: 370, 监理设备数量: 270, 建筑信息: 150, 监理效率: 724 },
  { label: '0.9', 装配式建筑数量: 634, 监理设备数量: 634, 建筑信息: 470, 监理效率: 516 },
  { label: '1.0', 装配式建筑数量: 634, 监理设备数量: 634, 建筑信息: 260, 监理效率: 118 },
  { label: '未评分', 装配式建筑数量: 634, 监理设备数量: 634, 建筑信息: 100, 监理效率: 512 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['装配式建筑数量', '监理设备数量', '建筑信息','监理效率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  监理效率: {
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
            { value: '装配式建筑数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '监理设备数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '建筑信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '监理效率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '监理效率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '监理效率') {
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
            if (value === '监理量') {
              return '#2b6cbb';
            }
            if (value === '价格') {
              return '#41a2fc';
            }
            if (value === '收益') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*监理效率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
