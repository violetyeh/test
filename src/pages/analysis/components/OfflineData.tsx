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
  { label: '0.1', 高速公路数量: 127, 高速公路车流量: 2008, 运营管理信息: 160, 设备信息: 105 },
  { label: '0.2', 高速公路数量: 123, 高速公路车流量: 1049, 运营管理信息: 300, 设备信息: 310 },
  { label: '0.3', 高速公路数量: 195, 高速公路车流量: 1509, 运营管理信息: 100, 设备信息: 105 },
  { label: '0.4', 高速公路数量: 111, 高速公路车流量: 1053, 运营管理信息: 393, 设备信息: 410 },
  { label: '0.5', 高速公路数量: 456, 高速公路车流量: 1504, 运营管理信息: 303, 设备信息: 105 },
  { label: '0.6', 高速公路数量: 113, 高速公路车流量: 1172, 运营管理信息: 310, 设备信息: 530 },
  { label: '0.7', 高速公路数量: 222, 高速公路车流量: 1621, 运营管理信息: 105, 设备信息: 210 },
  { label: '0.8', 高速公路数量: 311, 高速公路车流量: 3612, 运营管理信息:300, 设备信息: 410 },
  { label: '0.9', 高速公路数量: 167, 高速公路车流量: 2144, 运营管理信息: 203, 设备信息: 110 },
  { label: '1.0', 高速公路数量: 434, 高速公路车流量: 1112, 运营管理信息: 203, 设备信息: 230 },
  { label: '未评分', 高速公路数量: 212, 高速公路车流量: 1047, 运营管理信息: 163, 设备信息: 105 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['高速公路数量', '高速公路车流量', '运营管理信息','设备信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  设备信息: {
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
            { value: '高速公路数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '高速公路事故数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '运营管理信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '设备信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '设备信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '设备信息') {
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
            if (value === '设备信息') {
              return '#2b6cbb';
            }
            if (value === '监控存储数据量') {
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
        <Geom type="line" position="label*设备信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
