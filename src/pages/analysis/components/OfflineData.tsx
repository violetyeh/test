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
  { label: '0.1', 主机信息: 3563, 网口信息: 1000, CPU信息 : 1600, 端口繁忙度 : 3082 },
  { label: '0.2', 主机信息: 1900, 网口信息: 2880, CPU信息 : 1700, 端口繁忙度 : 1463 },
  { label: '0.3', 主机信息: 1950, 网口信息: 1950, CPU信息 : 1800, 端口繁忙度 : 1075 },
  { label: '0.4', 主机信息: 1500, 网口信息: 1500, CPU信息 : 1390, 端口繁忙度 : 2156 },
  { label: '0.5', 主机信息: 1234, 网口信息: 1234, CPU信息 : 1166, 端口繁忙度 : 1266 },
  { label: '0.6', 主机信息: 1234, 网口信息: 2634, CPU信息 : 1666, 端口繁忙度 : 1254 },
  { label: '0.7', 主机信息: 3634, 网口信息: 1434, CPU信息 : 1666, 端口繁忙度 : 1283 },
  { label: '0.8', 主机信息: 1234, 网口信息: 4284, CPU信息 : 1666, 端口繁忙度 : 2175 },
  { label: '0.9', 主机信息: 1534, 网口信息: 1334, CPU信息 : 2236, 端口繁忙度 : 1281 },
  { label: '1.0', 主机信息: 1234, 网口信息: 3234, CPU信息 : 786, 端口繁忙度 :1183 },
  { label: '未评分', 主机信息: 2234, 网口信息: 4234, CPU信息 : 1666, 端口繁忙度 : 3164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['主机信息', '网口信息', 'CPU信息','端口繁忙度' ], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  端口繁忙度 : {
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
            { value: '主机信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '网口信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: 'CPU信息 ', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '端口繁忙度' , marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value ===  '端口繁忙度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '端口繁忙度') {
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
            if (value === 'IP数量') {
              return '#2b6cbb';
            }
            if (value === 'IP池') {
              return '#41a2fc';
            }
            if (value === '网口信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*I/O繁忙度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
