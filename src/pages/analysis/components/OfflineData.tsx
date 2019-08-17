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
  { label: '0.1', 政务数量: 50, 政务处理目标: 40, 办公目标:10, 办公进度: 82 },
  { label: '0.2', 政务数量: 20, 政务处理目标: 6, 办公目标: 13, 办公进度: 63 },
  { label: '0.3', 政务数量: 90, 政务处理目标: 9, 办公目标: 10, 办公进度: 75 },
  { label: '0.4', 政务数量: 10, 政务处理目标: 5, 办公目标: 8, 办公进度: 56 },
  { label: '0.5', 政务数量: 95, 政务处理目标: 9, 办公目标: 8, 办公进度: 66 },
  { label: '0.6', 政务数量: 50, 政务处理目标: 34, 办公目标: 3, 办公进度: 54 },
  { label: '0.7', 政务数量: 90, 政务处理目标: 85, 办公目标: 7, 办公进度: 83 },
  { label: '0.8', 政务数量: 10, 政务处理目标: 15, 办公目标: 6, 办公进度: 75 },
  { label: '0.9', 政务数量: 95, 政务处理目标: 35, 办公目标: 17, 办公进度: 81 },
  { label: '1.0', 政务数量: 95, 政务处理目标: 43, 办公目标: 15, 办公进度: 83 },
  { label: '未评分', 政务数量: 90, 政务处理目标: 76, 办公目标: 56, 办公进度: 64 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['政务数量', '政务处理目标', '办公目标','办公进度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  办公进度: {
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
            { value: '政务数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '政务处理目标', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '办公目标', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '办公进度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '办公进度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '办公进度') {
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
            if (value === '政务数量') {
              return '#2b6cbb';
            }
            if (value === '办公进度') {
              return '#41a2fc';
            }
            if (value === '政务处理目标') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*办公进度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
