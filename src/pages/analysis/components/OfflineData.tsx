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
  { label: '0.1', 纯化水信息: 60, 在线监测数据: 123, 监测进度: 60, 制水速度: 99 },
  { label: '0.2', 纯化水信息: 70, 在线监测数据: 90, 监测进度: 30, 制水速度: 63 },
  { label: '0.3', 纯化水信息: 50, 在线监测数据: 50, 监测进度: 54, 制水速度: 75 },
  { label: '0.4', 纯化水信息: 23, 在线监测数据: 13, 监测进度: 90, 制水速度: 56 },
  { label: '0.5', 纯化水信息: 84, 在线监测数据: 54, 监测进度: 58, 制水速度: 66 },
  { label: '0.6', 纯化水信息: 14, 在线监测数据: 56, 监测进度: 66, 制水速度: 54 },
  { label: '0.7', 纯化水信息: 56, 在线监测数据: 34, 监测进度: 58, 制水速度: 83 },
  { label: '0.8', 纯化水信息: 75, 在线监测数据: 84, 监测进度: 66, 制水速度: 75 },
  { label: '0.9', 纯化水信息: 53, 在线监测数据: 69, 监测进度: 36, 制水速度: 81 },
  { label: '1.0', 纯化水信息: 84, 在线监测数据: 84, 监测进度: 86, 制水速度: 83 },
  { label: '未评分', 纯化水信息: 54, 在线监测数据: 54, 监测进度: 66, 制水速度: 64 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['纯化水信息', '在线监测数据', '监测进度','制水速度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  制水速度: {
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
      <Chart height={400} width={123} forceFit data={dv} scale={scale} padding="auto" onGetG2Instance={getG2Instance}>
        <Legend
          custom
          allowAllCanceled
          items={[
            { value: '纯化水信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '在线监测数据', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '监测进度', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '制水速度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '制水速度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '制水速度') {
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
            if (value === '监测数量') {
              return '#2b6cbb';
            }
            if (value === '纯化水样品数') {
              return '#41a2fc';
            }
            if (value === '在线监测数据') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*制水速度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
