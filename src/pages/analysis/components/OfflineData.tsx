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
  { label: '0.1', 管线信息: 2563, 管线长度: 1000, 设计图纸数量 : 1600, 修改数据次数: 2082 },
  { label: '0.2', 管线信息: 1900, 管线长度: 2880, 设计图纸数量 : 1700, 修改数据次数: 1463 },
  { label: '0.3', 管线信息: 1950, 管线长度: 1950, 设计图纸数量 : 1800, 修改数据次数: 1075 },
  { label: '0.4', 管线信息: 1500, 管线长度: 1500, 设计图纸数量 : 1390, 修改数据次数: 2156 },
  { label: '0.5', 管线信息: 1234, 管线长度: 1234, 设计图纸数量 : 1166, 修改数据次数: 1266 },
  { label: '0.6', 管线信息: 1234, 管线长度: 2634, 设计图纸数量 : 1666, 修改数据次数: 1254 },
  { label: '0.7', 管线信息: 3634, 管线长度: 1434, 设计图纸数量 : 1666, 修改数据次数: 1283 },
  { label: '0.8', 管线信息: 1234, 管线长度: 4284, 设计图纸数量 : 1666, 修改数据次数: 2175 },
  { label: '0.9', 管线信息: 1534, 管线长度: 1334, 设计图纸数量 : 2236, 修改数据次数: 1281 },
  { label: '1.0', 管线信息: 1234, 管线长度: 1234, 设计图纸数量 : 786, 修改数据次数:5183 },
  { label: '未评分', 管线信息: 1234, 管线长度: 1234, 设计图纸数量 : 4666, 修改数据次数: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['管线信息', '管线长度', '设计图纸数量','修改数据次数'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  修改数据次数: {
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
            { value: '管线信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '管线长度', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '设计图纸数量 ', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '修改数据次数', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '修改数据次数') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '修改数据次数') {
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
            if (value === '图纸数量') {
              return '#2b6cbb';
            }
            if (value === '管线信息') {
              return '#41a2fc';
            }
            if (value === '管线长度') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*修改数据次数" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
