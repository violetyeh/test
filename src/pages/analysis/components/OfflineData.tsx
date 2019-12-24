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
  { label: '0.1', 眼科医生人数: 355, 病人人数: 140, 测量评估信息:10, 评估效率: 308 },
  { label: '0.2', 眼科医生人数: 320, 病人人数: 236, 测量评估信息: 13, 评估效率: 406 },
  { label: '0.3', 眼科医生人数: 395, 病人人数: 139, 测量评估信息: 10, 评估效率: 307 },
  { label: '0.4', 眼科医生人数: 340, 病人人数: 235, 测量评估信息: 28, 评估效率: 305 },
  { label: '0.5', 眼科医生人数: 395, 病人人数: 139, 测量评估信息: 48, 评估效率: 306 },
  { label: '0.6', 眼科医生人数: 350, 病人人数: 234, 测量评估信息: 23, 评估效率: 305 },
  { label: '0.7', 眼科医生人数: 390, 病人人数: 185, 测量评估信息: 37, 评估效率: 208 },
  { label: '0.8', 眼科医生人数: 340, 病人人数: 215, 测量评估信息: 46, 评估效率: 307 },
  { label: '0.9', 眼科医生人数: 395, 病人人数: 135, 测量评估信息: 17, 评估效率: 308 },
  { label: '1.0', 眼科医生人数: 395, 病人人数: 243, 测量评估信息: 15, 评估效率: 308 },
  { label: '未评分', 眼科医生人数: 390, 病人人数: 176, 测量评估信息: 56, 评估效率: 306 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['眼科医生人数', '病人人数', '测量评估信息','评估效率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  评估效率: {
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
            { value: '眼科医生人数', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '病人人数', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '测量评估信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '评估效率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '评估效率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '评估效率') {
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
            if (value === '眼科医生人数') {
              return '#2b6cbb';
            }
            if (value === '评估效率') {
              return '#41a2fc';
            }
            if (value === '病人人数') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*评估效率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
