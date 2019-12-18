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
  { label: '0.1', 影院信息: 1280, 订票人数: 280, 退票人数: 260, 销售数量: 312 },
  { label: '0.2', 影院信息: 180, 订票人数: 180, 退票人数: 1300, 销售数量: 413 },
  { label: '0.3', 影院信息: 950, 订票人数: 950, 退票人数: 900, 销售数量: 415 },
  { label: '0.4', 影院信息: 500, 订票人数: 500, 退票人数: 390, 销售数量: 511 },
  { label: '0.5', 影院信息: 233, 订票人数: 233, 退票人数: 1500, 销售数量:123 },
  { label: '0.6', 影院信息: 233, 订票人数: 233, 退票人数: 2010, 销售数量: 156 },
  { label: '0.7', 影院信息: 233, 订票人数: 233, 退票人数: 1000, 销售数量: 1117 },
  { label: '0.8', 影院信息: 370, 订票人数: 270, 退票人数: 1500, 销售数量: 724 },
  { label: '0.9', 影院信息: 233, 订票人数: 233, 退票人数: 1600, 销售数量: 516 },
  { label: '1.0', 影院信息: 233, 订票人数: 233, 退票人数: 1500, 销售数量: 118 },
  { label: '未评分', 影院信息: 233, 订票人数: 233, 退票人数: 100, 销售数量: 512 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['影院信息', '订票人数', '退票人数','销售数量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  销售数量: {
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
            { value: '影院信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '订票人数', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '退票人数', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '销售数量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '销售数量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '销售数量') {
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
            if (value === '影院信息') {
              return '#2b6cbb';
            }
            if (value === '客服人数') {
              return '#41a2fc';
            }
            if (value === '效率') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*销售数量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
