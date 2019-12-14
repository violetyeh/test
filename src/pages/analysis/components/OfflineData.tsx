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
  { label: '0.1', 国有土地界: 280, 特殊地区界: 480, 保护区界: 2260, 基本农田界: 1452 },
  { label: '0.2', 国有土地界: 280, 特殊地区界: 180, 保护区界: 1300, 基本农田界: 1543 },
  { label: '0.3', 国有土地界: 250, 特殊地区界: 950, 保护区界: 1900, 基本农田界: 1125 },
  { label: '0.4', 国有土地界: 500, 特殊地区界: 800, 保护区界: 1390, 基本农田界: 1781 },
  { label: '0.5', 国有土地界: 170, 特殊地区界: 170, 保护区界: 1500, 基本农田界: 2643 },
  { label: '0.6', 国有土地界: 170, 特殊地区界: 270, 保护区界: 2010, 基本农田界: 1056 },
  { label: '0.7', 国有土地界: 170, 特殊地区界: 470, 保护区界: 1000, 基本农田界: 1147 },
  { label: '0.8', 国有土地界: 170, 特殊地区界: 470, 保护区界: 1000, 基本农田界: 2274 },
  { label: '0.9', 国有土地界: 170, 特殊地区界: 170, 保护区界: 1600, 基本农田界: 1346 },
  { label: '1.0', 国有土地界: 870, 特殊地区界: 170, 保护区界: 1500, 基本农田界: 1148 },
  { label: '未评分', 国有土地界: 170, 特殊地区界: 770, 保护区界: 1100, 基本农田界: 1012 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['国有土地界', '特殊地区界', '保护区界','基本农田界'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  基本农田界: {
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
            { value: '国有土地界', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '特殊地区界', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '保护区界', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '基本农田界', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '基本农田界') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '基本农田界') {
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
            if (value === '国有土地界') {
              return '#2b6cbb';
            }
            if (value === '质检进度') {
              return '#41a2fc';
            }
            if (value === '汇交进度') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*基本农田界" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
