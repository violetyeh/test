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
  { label: '0.1', 服务器信息: 1700, 虚拟机数量: 1500, 存储空间信息:2390, 实例信息: 1100 },
  { label: '0.2', 服务器信息: 1900, 虚拟机数量: 2600, 存储空间信息: 4113, 实例信息: 1200 },
  { label: '0.3', 服务器信息: 1950, 虚拟机数量: 3950, 存储空间信息: 3250, 实例信息: 1100 },
  { label: '0.4', 服务器信息: 5100, 虚拟机数量: 1500, 存储空间信息: 2139, 实例信息: 1500 },
  { label: '0.5', 服务器信息: 2510, 虚拟机数量: 1950, 存储空间信息: 4652, 实例信息: 900 },
  { label: '0.6', 服务器信息: 1950, 虚拟机数量: 4634, 存储空间信息: 2252, 实例信息: 3000 },
  { label: '0.7', 服务器信息: 1950, 虚拟机数量: 2685, 存储空间信息: 1152, 实例信息: 2600 },
  { label: '0.8', 服务器信息: 1020, 虚拟机数量: 3950, 存储空间信息: 1152, 实例信息: 520 },
  { label: '0.9', 服务器信息: 2350, 虚拟机数量: 1950, 存储空间信息: 2252, 实例信息: 3100 },
  { label: '1.0', 服务器信息: 3150, 虚拟机数量: 1950, 存储空间信息: 3112, 实例信息: 1203 },
  { label: '未评分', 服务器信息: 1150, 虚拟机数量: 1950, 存储空间信息: 1052, 实例信息: 1420 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['服务器信息', '虚拟机数量', '存储空间信息','实例信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  实例信息: {
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
            { value: '服务器信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '虚拟机数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '存储空间信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '实例信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '实例信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '实例信息') {
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
            if (value === '服务器信息') {
              return '#2b6cbb';
            }
            if (value === '新增虚拟机') {
              return '#41a2fc';
            }
            if (value === '虚拟机数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*实例信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
