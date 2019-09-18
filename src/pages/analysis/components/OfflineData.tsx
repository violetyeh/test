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
  { label: '0.1', 法规标准信息: 280, 设计信息: 280, 新增法规: 226, 设计进度: 92 },
  { label: '0.2', 法规标准信息: 180, 设计信息: 180, 新增法规: 130, 设计进度: 83 },
  { label: '0.3', 法规标准信息: 95, 设计信息: 95, 新增法规: 90, 设计进度: 95 },
  { label: '0.4', 法规标准信息: 500, 设计信息: 500, 新增法规: 390, 设计进度: 81 },
  { label: '0.5', 法规标准信息: 170, 设计信息: 170, 新增法规: 150, 设计进度: 93 },
  { label: '0.6', 法规标准信息: 170, 设计信息: 170, 新增法规: 201, 设计进度: 56 },
  { label: '0.7', 法规标准信息: 170, 设计信息: 170, 新增法规: 100, 设计进度: 77 },
  { label: '0.8', 法规标准信息: 170, 设计信息: 170, 新增法规: 100, 设计进度: 84 },
  { label: '0.9', 法规标准信息: 170, 设计信息: 170, 新增法规: 160, 设计进度: 86 },
  { label: '1.0', 法规标准信息: 170, 设计信息: 170, 新增法规: 150, 设计进度: 98 },
  { label: '未评分', 法规标准信息: 170, 设计信息: 170, 新增法规: 100, 设计进度: 72 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['法规标准信息', '设计信息', '新增法规','设计进度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  设计进度: {
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
            { value: '法规标准信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '设计信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '新增法规', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '设计进度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '设计进度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '设计进度') {
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
            if (value === '放款应还本金') {
              return '#2b6cbb';
            }
            if (value === '价格') {
              return '#41a2fc';
            }
            if (value === '收益') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*设计进度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
