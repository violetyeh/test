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
  { label: '0.1', 网络拓扑数量: 54, 容器信息: 80, 容器镜像信息: 45, 对接效率: 10 },
  { label: '0.2', 网络拓扑数量: 90, 容器信息: 80, 容器镜像信息: 13, 对接效率: 8 },
  { label: '0.3', 网络拓扑数量: 62, 容器信息: 90, 容器镜像信息: 90, 对接效率: 10 },
  { label: '0.4', 网络拓扑数量: 50, 容器信息: 50, 容器镜像信息: 39, 对接效率: 5 },
  { label: '0.5', 网络拓扑数量: 23, 容器信息: 24, 容器镜像信息: 50, 对接效率: 6},
  { label: '0.6', 网络拓扑数量: 12, 容器信息: 64, 容器镜像信息: 66, 对接效率: 5 },
  { label: '0.7', 网络拓扑数量: 63, 容器信息: 44, 容器镜像信息: 16, 对接效率: 8 },
  { label: '0.8', 网络拓扑数量: 23, 容器信息: 24, 容器镜像信息: 66, 对接效率: 7 },
  { label: '0.9', 网络拓扑数量: 53, 容器信息: 34, 容器镜像信息: 23, 对接效率: 8 },
  { label: '1.0', 网络拓扑数量: 23, 容器信息: 23, 容器镜像信息: 78, 对接效率: 8 },
  { label: '未评分', 网络拓扑数量: 13, 容器信息: 13, 容器镜像信息: 66, 对接效率: 10 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['网络拓扑数量', '容器信息', '容器镜像信息','对接效率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  对接效率: {
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
            { value: '网络拓扑数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '容器信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '容器镜像信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '对接效率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '对接效率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '对接效率') {
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
            if (value === '镜像数量') {
              return '#2b6cbb';
            }
            if (value === '对接效率') {
              return '#41a2fc';
            }
            if (value === '容器信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*对接效率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
