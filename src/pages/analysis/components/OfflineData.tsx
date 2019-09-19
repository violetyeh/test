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
  { label: '0.1', 道路信息: 280, 规划设计信息: 480, 总车流量: 2260, 直行车流量: 1452 },
  { label: '0.2', 道路信息: 280, 规划设计信息: 180, 总车流量: 1300, 直行车流量: 1543 },
  { label: '0.3', 道路信息: 250, 规划设计信息: 950, 总车流量: 1900, 直行车流量: 1125 },
  { label: '0.4', 道路信息: 500, 规划设计信息: 800, 总车流量: 1390, 直行车流量: 1781 },
  { label: '0.5', 道路信息: 170, 规划设计信息: 170, 总车流量: 1500, 直行车流量: 2643 },
  { label: '0.6', 道路信息: 170, 规划设计信息: 270, 总车流量: 2010, 直行车流量: 1056 },
  { label: '0.7', 道路信息: 170, 规划设计信息: 470, 总车流量: 1000, 直行车流量: 1147 },
  { label: '0.8', 道路信息: 170, 规划设计信息: 470, 总车流量: 1000, 直行车流量: 2274 },
  { label: '0.9', 道路信息: 170, 规划设计信息: 170, 总车流量: 1600, 直行车流量: 1346 },
  { label: '1.0', 道路信息: 870, 规划设计信息: 170, 总车流量: 1500, 直行车流量: 1148 },
  { label: '未评分', 道路信息: 170, 规划设计信息: 770, 总车流量: 1100, 直行车流量: 1012 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['道路信息', '规划设计信息', '总车流量','直行车流量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  直行车流量: {
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
            { value: '道路信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '规划设计信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '总车流量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '直行车流量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '直行车流量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '直行车流量') {
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
            if (value === '道路信息') {
              return '#2b6cbb';
            }
            if (value === '直行车流') {
              return '#41a2fc';
            }
            if (value === '左转车流') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*直行车流量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
