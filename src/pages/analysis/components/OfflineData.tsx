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
  { label: '0.1', 已处理制图数据: 1563, 排版设计信息: 1000, 排版要求: 600, 排版格式: 82 },
  { label: '0.2', 已处理制图数据: 900, 排版设计信息: 880, 排版要求: 700, 排版格式: 63 },
  { label: '0.3', 已处理制图数据: 950, 排版设计信息: 950, 排版要求: 800, 排版格式: 75 },
  { label: '0.4', 已处理制图数据: 500, 排版设计信息: 500, 排版要求: 390, 排版格式: 56 },
  { label: '0.5', 已处理制图数据: 234, 排版设计信息: 234, 排版要求: 1666, 排版格式: 66 },
  { label: '0.6', 已处理制图数据: 1234, 排版设计信息: 634, 排版要求: 666, 排版格式: 54 },
  { label: '0.7', 已处理制图数据: 634, 排版设计信息: 434, 排版要求: 1666, 排版格式: 83 },
  { label: '0.8', 已处理制图数据: 234, 排版设计信息: 284, 排版要求: 666, 排版格式: 75 },
  { label: '0.9', 已处理制图数据: 534, 排版设计信息: 334, 排版要求: 236, 排版格式: 81 },
  { label: '1.0', 已处理制图数据: 234, 排版设计信息: 234, 排版要求: 786, 排版格式: 83 },
  { label: '未评分', 已处理制图数据: 234, 排版设计信息: 234, 排版要求: 666, 排版格式: 64 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['已处理制图数据', '排版设计信息', '排版要求','排版格式'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  排版格式: {
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
            { value: '已处理制图数据', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '排版设计信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '排版要求', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '排版格式', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '排版格式') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '排版格式') {
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
            if (value === '处理数量') {
              return '#2b6cbb';
            }
            if (value === '制图数据') {
              return '#41a2fc';
            }
            if (value === '排版设计信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*排版格式" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
