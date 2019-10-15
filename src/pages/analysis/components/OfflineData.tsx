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
  { label: '0.1', 船舶数量: 154, 航线信息: 80, 物流信息: 45, 货物信息: 100 },
  { label: '0.2', 船舶数量: 190, 航线信息: 80, 物流信息: 13, 货物信息: 81 },
  { label: '0.3', 船舶数量: 121, 航线信息: 90, 物流信息: 90, 货物信息: 101 },
  { label: '0.4', 船舶数量: 150, 航线信息: 50, 物流信息: 39, 货物信息: 52 },
  { label: '0.5', 船舶数量: 123, 航线信息: 24, 物流信息: 50, 货物信息: 65},
  { label: '0.6', 船舶数量: 112, 航线信息: 64, 物流信息: 66, 货物信息: 54 },
  { label: '0.7', 船舶数量: 163, 航线信息: 44, 物流信息: 16, 货物信息: 87 },
  { label: '0.8', 船舶数量: 123, 航线信息: 24, 物流信息: 66, 货物信息: 75 },
  { label: '0.9', 船舶数量: 153, 航线信息: 34, 物流信息: 23, 货物信息: 84 },
  { label: '1.0', 船舶数量: 123, 航线信息: 23, 物流信息: 78, 货物信息: 82 },
  { label: '未评分', 船舶数量: 113, 航线信息: 13, 物流信息: 66, 货物信息: 100 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['船舶数量', '航线信息', '物流信息','货物信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  货物信息: {
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
            { value: '船舶数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '航线信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '物流信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '货物信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '货物信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '货物信息') {
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
            if (value === '船只数量') {
              return '#2b6cbb';
            }
            if (value === '货物信息') {
              return '#41a2fc';
            }
            if (value === '航线信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*货物信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
