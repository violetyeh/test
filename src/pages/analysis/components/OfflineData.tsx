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
  { label: '0.1', 项目工程监理数量: 563, 项目工程参数信息: 1000, 监理信息: 1600, 监理进度: 208 },
  { label: '0.2', 项目工程监理数量: 1900, 项目工程参数信息: 1880, 监理信息: 1700, 监理进度: 146 },
  { label: '0.3', 项目工程监理数量: 1950, 项目工程参数信息: 1950, 监理信息: 1800, 监理进度: 107 },
  { label: '0.4', 项目工程监理数量: 1500, 项目工程参数信息: 1500, 监理信息: 1390, 监理进度: 216 },
  { label: '0.5', 项目工程监理数量: 2034, 项目工程参数信息: 2034, 监理信息: 1166, 监理进度: 126 },
  { label: '0.6', 项目工程监理数量: 2034, 项目工程参数信息: 1634, 监理信息: 1666, 监理进度: 1254 },
  { label: '0.7', 项目工程监理数量: 1634, 项目工程参数信息: 1434, 监理信息: 1666, 监理进度: 128 },
  { label: '0.8', 项目工程监理数量: 2034, 项目工程参数信息: 1284, 监理信息: 1666, 监理进度: 275 },
  { label: '0.9', 项目工程监理数量: 1534, 项目工程参数信息: 1334, 监理信息: 1236, 监理进度: 181 },
  { label: '1.0', 项目工程监理数量: 2034, 项目工程参数信息: 2034, 监理信息: 786, 监理进度: 213 },
  { label: '未评分', 项目工程监理数量: 2034, 项目工程参数信息: 2034, 监理信息: 666, 监理进度: 264 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['项目工程监理数量', '项目工程参数信息', '监理信息','监理进度'], // 展开字段集
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
            { value: '项目工程监理数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '项目工程参数信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '监理信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
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
            if (value === '预警信息') {
              return '#41a2fc';
            }
            if (value === '项目工程参数信息') {
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
