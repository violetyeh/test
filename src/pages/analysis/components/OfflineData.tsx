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
  { label: '0.1', 数据中心数量: 17030, 数据监控数量: 10800, 监控日志信息: 21060, 数据中心容量: 50000 },
  { label: '0.2', 数据中心数量: 15010, 数据监控数量: 14900, 监控日志信息: 10300, 数据中心容量: 30000 },
  { label: '0.3', 数据中心数量: 19530, 数据监控数量: 15950, 监控日志信息: 10900, 数据中心容量: 50000 },
  { label: '0.4', 数据中心数量: 15020, 数据监控数量: 15500, 监控日志信息: 39100, 数据中心容量: 40000 },
  { label: '0.5', 数据中心数量: 45670, 数据监控数量: 21170, 监控日志信息: 30100, 数据中心容量: 50000 },
  { label: '0.6', 数据中心数量: 11370, 数据监控数量: 17270, 监控日志信息: 10010, 数据中心容量: 55000 },
  { label: '0.7', 数据中心数量: 12270, 数据监控数量: 16170, 监控日志信息: 11000, 数据中心容量: 60000 },
  { label: '0.8', 数据中心数量: 31170, 数据监控数量: 14370, 监控日志信息:10300, 数据中心容量: 70000 },
  { label: '0.9', 数据中心数量: 45167, 数据监控数量: 12170, 监控日志信息: 10100, 数据中心容量: 60000 },
  { label: '1.0', 数据中心数量: 42170, 数据监控数量: 42170, 监控日志信息: 10100, 数据中心容量: 55000 },
  { label: '未评分', 数据中心数量: 12170, 数据监控数量: 45170, 监控日志信息: 16100, 数据中心容量: 50000 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['数据中心数量', '数据监控数量', '监控日志信息','数据中心容量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  数据中心容量: {
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
            { value: '数据中心数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '数据监控数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '监控日志信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '数据中心容量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '数据中心容量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '数据中心容量') {
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
            if (value === '数据中心容量') {
              return '#2b6cbb';
            }
            if (value === '监控数据量') {
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
        <Geom type="line" position="label*数据中心容量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
