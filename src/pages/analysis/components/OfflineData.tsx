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
  { label: '0.1', 内容监控信息: 5563, 危险提示信息: 1000, 客户端信息: 1600, 网络允许内容: 2082 },
  { label: '0.2', 内容监控信息: 1900, 危险提示信息: 4880, 客户端信息: 1700, 网络允许内容: 1463 },
  { label: '0.3', 内容监控信息: 1950, 危险提示信息: 1950, 客户端信息: 3800, 网络允许内容: 1075 },
  { label: '0.4', 内容监控信息: 1500, 危险提示信息: 1500, 客户端信息: 1390, 网络允许内容: 2156 },
  { label: '0.5', 内容监控信息: 1234, 危险提示信息: 1234, 客户端信息: 1166, 网络允许内容: 1266 },
  { label: '0.6', 内容监控信息: 1234, 危险提示信息: 2634, 客户端信息: 1666, 网络允许内容: 1254 },
  { label: '0.7', 内容监控信息: 3634, 危险提示信息: 1434, 客户端信息: 1666, 网络允许内容: 1283 },
  { label: '0.8', 内容监控信息: 1234, 危险提示信息: 4284, 客户端信息: 1666, 网络允许内容: 2175 },
  { label: '0.9', 内容监控信息: 1534, 危险提示信息: 1334, 客户端信息: 5236, 网络允许内容: 1281 },
  { label: '1.0', 内容监控信息: 1234, 危险提示信息: 1234, 客户端信息: 786, 网络允许内容:5183 },
  { label: '未评分', 内容监控信息: 1234, 危险提示信息: 1234, 客户端信息: 4666, 网络允许内容: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['内容监控信息', '危险提示信息', '客户端信息','网络允许内容'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  网络允许内容: {
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
            { value: '内容监控信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '危险提示信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '客户端信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '网络允许内容', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '网络允许内容') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '网络允许内容') {
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
            if (value === '检测数量') {
              return '#2b6cbb';
            }
            if (value === '样品数') {
              return '#41a2fc';
            }
            if (value === '危险提示信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*网络允许内容" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
