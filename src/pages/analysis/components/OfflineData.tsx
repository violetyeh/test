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
  { label: '0.1', 公路工程数量: 2800, 地理信息: 2800, 增加公路信息数量: 2260, 已完善地理信息数量: 2000 },
  { label: '0.2', 公路工程数量: 1800, 地理信息: 1800, 增加公路信息数量: 1300, 已完善地理信息数量: 3000 },
  { label: '0.3', 公路工程数量: 950, 地理信息: 950, 增加公路信息数量: 900, 已完善地理信息数量: 5000 },
  { label: '0.4', 公路工程数量: 500, 地理信息: 500, 增加公路信息数量: 390, 已完善地理信息数量: 1000 },
  { label: '0.5', 公路工程数量: 170, 地理信息: 170, 增加公路信息数量: 100, 已完善地理信息数量: 3000 },
  { label: '0.6', 公路工程数量: 170, 地理信息: 170, 增加公路信息数量: 100, 已完善地理信息数量: 1234 },
  { label: '0.7', 公路工程数量: 170, 地理信息: 170, 增加公路信息数量: 100, 已完善地理信息数量: 5213 },
  { label: '0.8', 公路工程数量: 170, 地理信息: 170, 增加公路信息数量: 100, 已完善地理信息数量: 6868 },
  { label: '0.9', 公路工程数量: 170, 地理信息: 170, 增加公路信息数量: 100, 已完善地理信息数量: 1452 },
  { label: '1.0', 公路工程数量: 170, 地理信息: 170, 增加公路信息数量: 100, 已完善地理信息数量: 1023 },
  { label: '未评分', 公路工程数量: 170, 地理信息: 170, 增加公路信息数量: 100, 已完善地理信息数量: 2103 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['公路工程数量', '地理信息', '增加公路信息数量','已完善地理信息数量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  已完善地理信息数量: {
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
            { value: '公路工程数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '地理信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '增加公路信息数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '已完善地理信息数量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '已完善地理信息数量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '已完善地理信息数量') {
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
            if (value === '道路车道数') {
              return '#2b6cbb';
            }
            if (value === '车道长度') {
              return '#41a2fc';
            }
            if (value === '路面宽度') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*已完善地理信息数量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
