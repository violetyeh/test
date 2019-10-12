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
  { label: '0.1', 工程监理信息: 256, 无人机采用信息: 1300, 监理进度: 1600, 监理工程数据: 2082 },
  { label: '0.2', 工程监理信息: 290, 无人机采用信息: 4880, 监理进度: 1700, 监理工程数据: 1463 },
  { label: '0.3', 工程监理信息: 4950, 无人机采用信息: 1950, 监理进度: 3800, 监理工程数据: 1075 },
  { label: '0.4', 工程监理信息: 150, 无人机采用信息: 1500, 监理进度: 1390, 监理工程数据: 2156 },
  { label: '0.5', 工程监理信息: 1234, 无人机采用信息: 123, 监理进度: 1166, 监理工程数据: 1266 },
  { label: '0.6', 工程监理信息: 3234, 无人机采用信息: 2634, 监理进度: 1666, 监理工程数据: 1254 },
  { label: '0.7', 工程监理信息: 3634, 无人机采用信息: 1434, 监理进度: 166, 监理工程数据: 1283 },
  { label: '0.8', 工程监理信息: 3634, 无人机采用信息: 4284, 监理进度: 1666, 监理工程数据: 175 },
  { label: '0.9', 工程监理信息: 5434, 无人机采用信息: 1334, 监理进度: 2236, 监理工程数据: 1281 },
  { label: '1.0', 工程监理信息: 1234, 无人机采用信息: 1234, 监理进度: 761, 监理工程数据:1183 },
  { label: '未评分', 工程监理信息: 1234, 无人机采用信息: 1234, 监理进度: 666, 监理工程数据: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['工程监理信息', '无人机采用信息', '监理进度','监理工程数据'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  监理工程数据: {
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
            { value: '工程监理信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '无人机采用信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '监理进度', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '监理工程数据', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '监理工程数据') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '监理工程数据') {
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
            if (value === '监理数量') {
              return '#2b6cbb';
            }
            if (value === '工程监理信息') {
              return '#41a2fc';
            }
            if (value === '无人机采用信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*监理工程数据" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
