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
  { label: '0.1', 椭球参数: 280, 投影参数: 280, 七参数: 2260, 高程拟合参数: 12 },
  { label: '0.2', 椭球参数: 180, 投影参数: 180, 七参数: 1300, 高程拟合参数: 13 },
  { label: '0.3', 椭球参数: 950, 投影参数: 950, 七参数: 1900, 高程拟合参数: 15 },
  { label: '0.4', 椭球参数: 500, 投影参数: 500, 七参数: 1390, 高程拟合参数: 11 },
  { label: '0.5', 椭球参数: 170, 投影参数: 170, 七参数: 1500, 高程拟合参数: 23 },
  { label: '0.6', 椭球参数: 170, 投影参数: 170, 七参数: 2010, 高程拟合参数: 56 },
  { label: '0.7', 椭球参数: 170, 投影参数: 170, 七参数: 1000, 高程拟合参数: 17 },
  { label: '0.8', 椭球参数: 170, 投影参数: 170, 七参数: 1000, 高程拟合参数: 24 },
  { label: '0.9', 椭球参数: 170, 投影参数: 170, 七参数: 1600, 高程拟合参数: 16 },
  { label: '1.0', 椭球参数: 170, 投影参数: 170, 七参数: 1500, 高程拟合参数: 18 },
  { label: '未评分', 椭球参数: 170, 投影参数: 170, 七参数: 1100, 高程拟合参数: 12 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['椭球参数', '投影参数', '七参数','高程拟合参数'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  高程拟合参数: {
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
            { value: '椭球参数', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '投影参数', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '七参数', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '高程拟合参数', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '高程拟合参数') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '高程拟合参数') {
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
            if (value === '公路里程数') {
              return '#2b6cbb';
            }
            if (value === '养护里程数') {
              return '#41a2fc';
            }
            if (value === '完成公路数') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*高程拟合参数" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
