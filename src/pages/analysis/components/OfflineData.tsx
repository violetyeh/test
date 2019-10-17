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
  { label: '0.1', 客户数量: 1563, 今日客户数量: 1000, 用水数量: 600, 用水单价: 8 },
  { label: '0.2', 客户数量: 900, 今日客户数量: 880, 用水数量: 700, 用水单价: 6 },
  { label: '0.3', 客户数量: 950, 今日客户数量: 950, 用水数量: 800, 用水单价: 7 },
  { label: '0.4', 客户数量: 500, 今日客户数量: 500, 用水数量: 390, 用水单价: 5 },
  { label: '0.5', 客户数量: 234, 今日客户数量: 234, 用水数量: 1666, 用水单价: 6 },
  { label: '0.6', 客户数量: 1234, 今日客户数量: 634, 用水数量: 666, 用水单价: 5 },
  { label: '0.7', 客户数量: 634, 今日客户数量: 434, 用水数量: 1666, 用水单价: 8 },
  { label: '0.8', 客户数量: 234, 今日客户数量: 284, 用水数量: 666, 用水单价: 75},
  { label: '0.9', 客户数量: 534, 今日客户数量: 334, 用水数量: 236, 用水单价: 8 },
  { label: '1.0', 客户数量: 234, 今日客户数量: 234, 用水数量: 786, 用水单价: 8 },
  { label: '未评分', 客户数量: 234, 今日客户数量: 234, 用水数量: 666, 用水单价: 6 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['客户数量', '今日客户数量', '用水数量','用水单价'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  用水单价: {
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
            { value: '客户数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '今日客户数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '用水数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '用水单价', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '用水单价') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '用水单价') {
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
            if (value === '用户数量') {
              return '#2b6cbb';
            }
            if (value === '水费价格') {
              return '#41a2fc';
            }
            if (value === '今日客户数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*用水单价" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
