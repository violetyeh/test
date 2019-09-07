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
  { label: '0.1', 培训司机数量: 55, 培训老师数量: 40, 安全教育培训信息:10, 培训效率: 82 },
  { label: '0.2', 培训司机数量: 20, 培训老师数量: 36, 安全教育培训信息: 13, 培训效率: 63 },
  { label: '0.3', 培训司机数量: 95, 培训老师数量: 39, 安全教育培训信息: 10, 培训效率: 75 },
  { label: '0.4', 培训司机数量: 40, 培训老师数量: 35, 安全教育培训信息: 28, 培训效率: 56 },
  { label: '0.5', 培训司机数量: 95, 培训老师数量: 39, 安全教育培训信息: 48, 培训效率: 66 },
  { label: '0.6', 培训司机数量: 50, 培训老师数量: 34, 安全教育培训信息: 23, 培训效率: 54 },
  { label: '0.7', 培训司机数量: 90, 培训老师数量: 85, 安全教育培训信息: 37, 培训效率: 83 },
  { label: '0.8', 培训司机数量: 40, 培训老师数量: 15, 安全教育培训信息: 46, 培训效率: 75 },
  { label: '0.9', 培训司机数量: 95, 培训老师数量: 35, 安全教育培训信息: 17, 培训效率: 81 },
  { label: '1.0', 培训司机数量: 95, 培训老师数量: 43, 安全教育培训信息: 15, 培训效率: 83 },
  { label: '未评分', 培训司机数量: 90, 培训老师数量: 76, 安全教育培训信息: 56, 培训效率: 64 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['培训司机数量', '培训老师数量', '安全教育培训信息','培训效率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  培训效率: {
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
            { value: '培训司机数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '培训老师数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '安全教育培训信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '培训效率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '培训效率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '培训效率') {
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
            if (value === '培训司机数量') {
              return '#2b6cbb';
            }
            if (value === '培训效率') {
              return '#41a2fc';
            }
            if (value === '培训老师数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*培训效率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
