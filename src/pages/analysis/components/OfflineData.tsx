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
  { label: '0.1', 规划辅助: 2563, 辅助编制数量: 1300, 编制进度: 1600, 辅助详细信息: 2082 },
  { label: '0.2', 规划辅助: 2900, 辅助编制数量: 4880, 编制进度: 1700, 辅助详细信息: 1463 },
  { label: '0.3', 规划辅助: 4950, 辅助编制数量: 1950, 编制进度: 3800, 辅助详细信息: 1075 },
  { label: '0.4', 规划辅助: 1500, 辅助编制数量: 1500, 编制进度: 1390, 辅助详细信息: 2156 },
  { label: '0.5', 规划辅助: 1234, 辅助编制数量: 1234, 编制进度: 1166, 辅助详细信息: 1266 },
  { label: '0.6', 规划辅助: 3234, 辅助编制数量: 2634, 编制进度: 1666, 辅助详细信息: 1254 },
  { label: '0.7', 规划辅助: 3634, 辅助编制数量: 1434, 编制进度: 1666, 辅助详细信息: 1283 },
  { label: '0.8', 规划辅助: 3634, 辅助编制数量: 4284, 编制进度: 1666, 辅助详细信息: 2175 },
  { label: '0.9', 规划辅助: 5434, 辅助编制数量: 1334, 编制进度: 2236, 辅助详细信息: 1281 },
  { label: '1.0', 规划辅助: 1234, 辅助编制数量: 1234, 编制进度: 7861, 辅助详细信息:1183 },
  { label: '未评分', 规划辅助: 1234, 辅助编制数量: 1234, 编制进度: 4666, 辅助详细信息: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['规划辅助', '辅助编制数量', '编制进度','辅助详细信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  辅助详细信息: {
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
            { value: '规划辅助', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '辅助编制数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '编制进度', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '辅助详细信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '辅助详细信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '辅助详细信息') {
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
            if (value === '规划辅助') {
              return '#41a2fc';
            }
            if (value === '辅助编制数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*辅助详细信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
