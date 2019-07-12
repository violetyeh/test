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
  { label: '0.1', 无机元素信息: 660, 食品检测数量: 123, 检测价格: 260, 合格率: 99 },
  { label: '0.2', 无机元素信息: 700, 食品检测数量: 980, 检测价格: 300, 合格率: 63 },
  { label: '0.3', 无机元素信息: 950, 食品检测数量: 950, 检测价格: 154, 合格率: 75 },
  { label: '0.4', 无机元素信息: 123, 食品检测数量: 123, 检测价格: 390, 合格率: 56 },
  { label: '0.5', 无机元素信息: 854, 食品检测数量: 854, 检测价格: 458, 合格率: 66 },
  { label: '0.6', 无机元素信息: 1854, 食品检测数量: 756, 检测价格: 666, 合格率: 54 },
  { label: '0.7', 无机元素信息: 756, 食品检测数量: 434, 检测价格: 458, 合格率: 83 },
  { label: '0.8', 无机元素信息: 756, 食品检测数量: 284, 检测价格: 666, 合格率: 75 },
  { label: '0.9', 无机元素信息: 534, 食品检测数量: 369, 检测价格: 236, 合格率: 81 },
  { label: '1.0', 无机元素信息: 854, 食品检测数量: 854, 检测价格: 786, 合格率: 83 },
  { label: '未评分', 无机元素信息: 854, 食品检测数量: 854, 检测价格: 666, 合格率: 64 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['无机元素信息', '食品检测数量', '检测价格','合格率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  合格率: {
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
      <Chart height={400} width={123} forceFit data={dv} scale={scale} padding="auto" onGetG2Instance={getG2Instance}>
        <Legend
          custom
          allowAllCanceled
          items={[
            { value: '无机元素信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '食品检测数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '检测价格', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '合格率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '合格率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '合格率') {
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
            if (value === '样品数') {
              return '#41a2fc';
            }
            if (value === '食品检测数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*合格率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
