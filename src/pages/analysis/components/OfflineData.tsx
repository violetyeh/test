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
  { label: '0.1', 生产质检数量: 500, 质检合格数: 400, 生产目标数量:1000, 合格数量: 82 },
  { label: '0.2', 生产质检数量: 900, 质检合格数: 600, 生产目标数量: 1300, 合格数量: 63 },
  { label: '0.3', 生产质检数量: 950, 质检合格数: 950, 生产目标数量: 500, 合格数量: 75 },
  { label: '0.4', 生产质检数量: 500, 质检合格数: 500, 生产目标数量: 390, 合格数量: 56 },
  { label: '0.5', 生产质检数量: 950, 质检合格数: 950, 生产目标数量: 520, 合格数量: 66 },
  { label: '0.6', 生产质检数量: 1950, 质检合格数: 634, 生产目标数量: 520, 合格数量: 54 },
  { label: '0.7', 生产质检数量: 950, 质检合格数: 685, 生产目标数量: 520, 合格数量: 83 },
  { label: '0.8', 生产质检数量: 1000, 质检合格数: 950, 生产目标数量: 520, 合格数量: 75 },
  { label: '0.9', 生产质检数量: 950, 质检合格数: 950, 生产目标数量: 520, 合格数量: 81 },
  { label: '1.0', 生产质检数量: 950, 质检合格数: 950, 生产目标数量: 520, 合格数量: 83 },
  { label: '未评分', 生产质检数量: 950, 质检合格数: 950, 生产目标数量: 520, 合格数量: 64 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['生产质检数量', '质检合格数', '生产目标数量','合格数量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  合格数量: {
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
            { value: '生产质检数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '质检合格数', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '生产目标数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '合格数量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '合格数量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '合格数量') {
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
            if (value === '质检合格数') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*合格数量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
