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
  { label: '0.1', 主机信息: 21563, 审计信息: 1000, 服务状态信息: 1600, 主机状态: 2082 },
  { label: '0.2', 主机信息: 19030, 审计信息: 3880, 服务状态信息: 1700, 主机状态: 1463 },
  { label: '0.3', 主机信息: 19550, 审计信息: 1950, 服务状态信息: 5800, 主机状态: 1075 },
  { label: '0.4', 主机信息: 15040, 审计信息: 1500, 服务状态信息: 1390, 主机状态: 2156 },
  { label: '0.5', 主机信息: 12324, 审计信息: 1234, 服务状态信息: 1166, 主机状态: 1266 },
  { label: '0.6', 主机信息: 12374, 审计信息: 2634, 服务状态信息: 1666, 主机状态: 1254 },
  { label: '0.7', 主机信息: 16364, 审计信息: 1434, 服务状态信息: 1666, 主机状态: 1283 },
  { label: '0.8', 主机信息: 12344, 审计信息: 1284, 服务状态信息: 1666, 主机状态: 2175 },
  { label: '0.9', 主机信息: 15314, 审计信息: 1334, 服务状态信息: 1236, 主机状态: 1281 },
  { label: '1.0', 主机信息: 12354, 审计信息: 1234, 服务状态信息: 1786, 主机状态:3983 },
  { label: '未评分', 主机信息: 12434, 审计信息: 1234, 服务状态信息: 2666, 主机状态: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['主机信息', '审计信息', '服务状态信息','主机状态'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  主机状态: {
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
            { value: '主机信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '审计信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '服务状态信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '主机状态', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '主机状态') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '主机状态') {
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
            if (value === '主机数量') {
              return '#2b6cbb';
            }
            if (value === '服务信息') {
              return '#41a2fc';
            }
            if (value === '审计信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*主机状态" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
