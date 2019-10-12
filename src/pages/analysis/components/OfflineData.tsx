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
  { label: '0.1', 监理业务数量: 563,监理业务监理信息: 1000, 工程监理数据: 1600, 监理进度: 2082 },
  { label: '0.2', 监理业务数量: 1900,监理业务监理信息: 880, 工程监理数据: 1700, 监理进度: 1463 },
  { label: '0.3', 监理业务数量: 950,监理业务监理信息: 950, 工程监理数据: 800, 监理进度: 1075 },
  { label: '0.4', 监理业务数量: 500,监理业务监理信息: 500, 工程监理数据: 1390, 监理进度: 2156 },
  { label: '0.5', 监理业务数量: 631,监理业务监理信息: 631, 工程监理数据: 1166, 监理进度: 1266 },
  { label: '0.6', 监理业务数量: 631,监理业务监理信息: 2634, 工程监理数据: 2021, 监理进度: 1254 },
  { label: '0.7', 监理业务数量: 1634,监理业务监理信息: 1434, 工程监理数据: 1021, 监理进度: 1283 },
  { label: '0.8', 监理业务数量: 631,监理业务监理信息: 1284, 工程监理数据: 1021, 监理进度: 2175 },
  { label: '0.9', 监理业务数量: 1534,监理业务监理信息: 1334, 工程监理数据: 1236, 监理进度: 1281 },
  { label: '1.0', 监理业务数量: 631,监理业务监理信息: 631, 工程监理数据: 786, 监理进度:983 },
  { label: '未评分', 监理业务数量: 631,监理业务监理信息: 631, 工程监理数据: 666, 监理进度: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['监理业务数量', '监理业务监理信息', '工程监理数据','监理进度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  监理进度: {
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
            { value: '监理业务数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '监理业务监理信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '工程监理数据', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '监理进度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '监理进度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '监理进度') {
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
            if (value === '工程信息') {
              return '#41a2fc';
            }
            if (value === '监理业务监理信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*监理进度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
