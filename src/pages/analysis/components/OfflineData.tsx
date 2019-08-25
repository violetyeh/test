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
  { label: '0.1', 计算机网络信息: 2563, 安全检测数量: 1300, 防火墙信息: 1600, 安全管理信息: 2082 },
  { label: '0.2', 计算机网络信息: 2900, 安全检测数量: 4880, 防火墙信息: 1700, 安全管理信息: 1463 },
  { label: '0.3', 计算机网络信息: 4950, 安全检测数量: 1950, 防火墙信息: 3800, 安全管理信息: 1075 },
  { label: '0.4', 计算机网络信息: 1500, 安全检测数量: 1500, 防火墙信息: 1390, 安全管理信息: 2156 },
  { label: '0.5', 计算机网络信息: 1234, 安全检测数量: 1234, 防火墙信息: 1166, 安全管理信息: 1266 },
  { label: '0.6', 计算机网络信息: 3234, 安全检测数量: 2634, 防火墙信息: 1666, 安全管理信息: 1254 },
  { label: '0.7', 计算机网络信息: 3634, 安全检测数量: 1434, 防火墙信息: 1666, 安全管理信息: 1283 },
  { label: '0.8', 计算机网络信息: 3634, 安全检测数量: 4284, 防火墙信息: 1666, 安全管理信息: 2175 },
  { label: '0.9', 计算机网络信息: 5434, 安全检测数量: 1334, 防火墙信息: 2236, 安全管理信息: 1281 },
  { label: '1.0', 计算机网络信息: 1234, 安全检测数量: 1234, 防火墙信息: 7861, 安全管理信息:1183 },
  { label: '未评分', 计算机网络信息: 1234, 安全检测数量: 1234, 防火墙信息: 4666, 安全管理信息: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['计算机网络信息', '安全检测数量', '防火墙信息','安全管理信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  安全管理信息: {
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
            { value: '计算机网络信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '安全检测数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '防火墙信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '安全管理信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '安全管理信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '安全管理信息') {
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
            if (value === '计算机网络信息') {
              return '#41a2fc';
            }
            if (value === '安全检测数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*安全管理信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
