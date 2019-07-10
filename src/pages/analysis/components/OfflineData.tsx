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
  { label: '0.1', 架构信息: 280, 设计信息: 280, 架构价格: 2260, 总收益率: 12 },
  { label: '0.2', 架构信息: 180, 设计信息: 180, 架构价格: 1300, 总收益率: 13 },
  { label: '0.3', 架构信息: 950, 设计信息: 950, 架构价格: 900, 总收益率: 15 },
  { label: '0.4', 架构信息: 500, 设计信息: 500, 架构价格: 390, 总收益率: 11 },
  { label: '0.5', 架构信息: 170, 设计信息: 170, 架构价格: 1500, 总收益率: 23 },
  { label: '0.6', 架构信息: 170, 设计信息: 170, 架构价格: 2010, 总收益率: 56 },
  { label: '0.7', 架构信息: 170, 设计信息: 170, 架构价格: 1000, 总收益率: 17 },
  { label: '0.8', 架构信息: 170, 设计信息: 170, 架构价格: 1000, 总收益率: 24 },
  { label: '0.9', 架构信息: 170, 设计信息: 170, 架构价格: 1600, 总收益率: 16 },
  { label: '1.0', 架构信息: 170, 设计信息: 170, 架构价格: 1500, 总收益率: 18 },
  { label: '未评分', 架构信息: 170, 设计信息: 170, 架构价格: 100, 总收益率: 12 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['架构信息', '设计信息', '架构价格'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  总收益率: {
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
            { value: '架构信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '设计信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '架构价格', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '总收益率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '总收益率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '总收益率') {
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
            if (value === '放款应还本金') {
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
        <Geom type="line" position="label*总收益率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
