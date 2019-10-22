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
  { label: '0.1', 收费车辆数量: 563, 今日收费车辆数量: 1000, 车道车辆数量: 600, 收费车辆单价: 38 },
  { label: '0.2', 收费车辆数量: 900, 今日收费车辆数量: 880, 车道车辆数量: 700, 收费车辆单价: 26 },
  { label: '0.3', 收费车辆数量: 950, 今日收费车辆数量: 950, 车道车辆数量: 800, 收费车辆单价: 17 },
  { label: '0.4', 收费车辆数量: 500, 今日收费车辆数量: 500, 车道车辆数量: 390, 收费车辆单价: 25 },
  { label: '0.5', 收费车辆数量: 234, 今日收费车辆数量: 234, 车道车辆数量: 666, 收费车辆单价: 26 },
  { label: '0.6', 收费车辆数量: 234, 今日收费车辆数量: 634, 车道车辆数量: 666, 收费车辆单价: 25 },
  { label: '0.7', 收费车辆数量: 634, 今日收费车辆数量: 434, 车道车辆数量: 566, 收费车辆单价: 28 },
  { label: '0.8', 收费车辆数量: 234, 今日收费车辆数量: 284, 车道车辆数量: 666, 收费车辆单价: 45},
  { label: '0.9', 收费车辆数量: 534, 今日收费车辆数量: 334, 车道车辆数量: 236, 收费车辆单价: 38 },
  { label: '1.0', 收费车辆数量: 234, 今日收费车辆数量: 234, 车道车辆数量: 786, 收费车辆单价: 38 },
  { label: '未评分', 收费车辆数量: 234, 今日收费车辆数量: 234, 车道车辆数量: 666, 收费车辆单价: 26 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['收费车辆数量', '今日收费车辆数量', '车道车辆数量','收费车辆单价'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  收费车辆单价: {
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
            { value: '收费车辆数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '今日收费车辆数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '车道车辆数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '收费车辆单价', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '收费车辆单价') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '收费车辆单价') {
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
            if (value === '车辆数量') {
              return '#2b6cbb';
            }
            if (value === '收费车辆价格') {
              return '#41a2fc';
            }
            if (value === '今日收费车辆数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*收费车辆单价" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
