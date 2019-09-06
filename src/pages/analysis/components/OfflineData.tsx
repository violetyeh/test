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
  { label: '0.1', 微信售票数量: 156, 今日微信售票数量: 100, 发车数量: 60, 票价: 8 },
  { label: '0.2', 微信售票数量: 90, 今日微信售票数量: 88, 发车数量: 70, 票价: 6 },
  { label: '0.3', 微信售票数量: 95, 今日微信售票数量: 90, 发车数量: 80, 票价: 7 },
  { label: '0.4', 微信售票数量: 50, 今日微信售票数量: 50, 发车数量: 39, 票价: 5 },
  { label: '0.5', 微信售票数量: 23, 今日微信售票数量: 34, 发车数量: 166, 票价: 6 },
  { label: '0.6', 微信售票数量: 123, 今日微信售票数量: 34, 发车数量: 66, 票价: 5 },
  { label: '0.7', 微信售票数量: 63, 今日微信售票数量: 34, 发车数量: 166, 票价: 8 },
  { label: '0.8', 微信售票数量: 23, 今日微信售票数量: 84, 发车数量: 66, 票价: 75},
  { label: '0.9', 微信售票数量: 53, 今日微信售票数量: 34, 发车数量: 26, 票价: 8 },
  { label: '1.0', 微信售票数量: 43, 今日微信售票数量: 24, 发车数量: 76, 票价: 8 },
  { label: '未评分', 微信售票数量: 43, 今日微信售票数量: 34, 发车数量: 66, 票价: 6 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['微信售票数量', '今日微信售票数量', '发车数量','票价'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  票价: {
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
            { value: '微信售票数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '今日微信售票数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '发车数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '票价', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '票价') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '票价') {
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
            if (value === '售票价格') {
              return '#41a2fc';
            }
            if (value === '今日微信售票数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*票价" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
