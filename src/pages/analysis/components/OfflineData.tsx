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
  { label: '0.1', 可视化交通枢纽数量: 227, 高速公路数量: 108, 可视化安全信息: 106, 交通畅通占比: 10 },
  { label: '0.2', 可视化交通枢纽数量: 123, 高速公路数量: 149, 可视化安全信息: 310, 交通畅通占比: 31 },
  { label: '0.3', 可视化交通枢纽数量: 195, 高速公路数量: 159, 可视化安全信息: 90, 交通畅通占比: 10 },
  { label: '0.4', 可视化交通枢纽数量: 111, 高速公路数量: 153, 可视化安全信息: 319, 交通畅通占比: 41 },
  { label: '0.5', 可视化交通枢纽数量: 456, 高速公路数量: 154, 可视化安全信息: 310, 交通畅通占比: 10 },
  { label: '0.6', 可视化交通枢纽数量: 213, 高速公路数量: 172, 可视化安全信息: 301, 交通畅通占比: 53 },
  { label: '0.7', 可视化交通枢纽数量: 222, 高速公路数量: 161, 可视化安全信息: 110, 交通畅通占比: 61 },
  { label: '0.8', 可视化交通枢纽数量: 311, 高速公路数量: 62, 可视化安全信息:130, 交通畅通占比: 71 },
  { label: '0.9', 可视化交通枢纽数量: 167, 高速公路数量: 244, 可视化安全信息: 123, 交通畅通占比: 61 },
  { label: '1.0', 可视化交通枢纽数量: 434, 高速公路数量: 412, 可视化安全信息: 103, 交通畅通占比: 53 },
  { label: '未评分', 可视化交通枢纽数量: 212, 高速公路数量: 147, 可视化安全信息: 123, 交通畅通占比: 10 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['可视化交通枢纽数量', '高速公路数量', '可视化安全信息','交通畅通占比'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  交通畅通占比: {
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
            { value: '可视化交通枢纽数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '高速公路数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '可视化安全信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '交通畅通占比', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '交通畅通占比') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '交通畅通占比') {
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
            if (value === '交通畅通占比') {
              return '#2b6cbb';
            }
            if (value === '运输车辆量') {
              return '#41a2fc';
            }
            if (value === '预警数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*交通畅通占比" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
