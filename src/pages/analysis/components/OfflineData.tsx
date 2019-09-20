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
  { label: '0.1', 路线数据: 127, 路标类别数量: 108, 规划设计信息: 160, 设计进度: 105 },
  { label: '0.2', 路线数据: 123, 路标类别数量: 149, 规划设计信息: 300, 设计进度: 310 },
  { label: '0.3', 路线数据: 195, 路标类别数量: 159, 规划设计信息: 900, 设计进度: 105 },
  { label: '0.4', 路线数据: 111, 路标类别数量: 153, 规划设计信息: 393, 设计进度: 410 },
  { label: '0.5', 路线数据: 456, 路标类别数量: 154, 规划设计信息: 303, 设计进度: 105 },
  { label: '0.6', 路线数据: 113, 路标类别数量: 172, 规划设计信息: 310, 设计进度: 530 },
  { label: '0.7', 路线数据: 222, 路标类别数量: 161, 规划设计信息: 105, 设计进度: 610 },
  { label: '0.8', 路线数据: 311, 路标类别数量: 362, 规划设计信息:300, 设计进度: 710 },
  { label: '0.9', 路线数据: 167, 路标类别数量: 244, 规划设计信息: 203, 设计进度: 610 },
  { label: '1.0', 路线数据: 434, 路标类别数量: 412, 规划设计信息: 103, 设计进度: 530 },
  { label: '未评分', 路线数据: 212, 路标类别数量: 147, 规划设计信息: 163, 设计进度: 105 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['路线数据', '路标类别数量', '规划设计信息','设计进度'], // 展开字段集
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
      <Chart height={400} width={3} forceFit data={dv} scale={scale} padding="auto" onGetG2Instance={getG2Instance}>
        <Legend
          custom
          allowAllCanceled
          items={[
            { value: '路线数据', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '路标类别数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '规划设计信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
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
            if (value === '设计进度') {
              return '#2b6cbb';
            }
            if (value === '规划信息') {
              return '#41a2fc';
            }
            if (value === '出错数量') {
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
