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
  { label: '0.1', 视觉程序信息: 563, 终端信息: 1000, 通讯参数信息 : 1600, 端口信息数量: 2082 },
  { label: '0.2', 视觉程序信息: 1900, 终端信息: 2880, 通讯参数信息 : 1700, 端口信息数量: 1463 },
  { label: '0.3', 视觉程序信息: 1950, 终端信息: 1950, 通讯参数信息 : 1800, 端口信息数量: 1075 },
  { label: '0.4', 视觉程序信息: 1500, 终端信息: 1500, 通讯参数信息 : 1390, 端口信息数量: 2156 },
  { label: '0.5', 视觉程序信息: 1234, 终端信息: 1234, 通讯参数信息 : 1166, 端口信息数量: 1266 },
  { label: '0.6', 视觉程序信息: 2234, 终端信息: 2634, 通讯参数信息 : 1666, 端口信息数量: 1254 },
  { label: '0.7', 视觉程序信息: 1634, 终端信息: 1434, 通讯参数信息 : 1666, 端口信息数量: 1283 },
  { label: '0.8', 视觉程序信息: 1234, 终端信息: 1284, 通讯参数信息 : 1666, 端口信息数量: 2175 },
  { label: '0.9', 视觉程序信息: 1534, 终端信息: 1334, 通讯参数信息 : 2236, 端口信息数量: 1281 },
  { label: '1.0', 视觉程序信息: 1234, 终端信息: 1234, 通讯参数信息 : 786, 端口信息数量:183 },
  { label: '未评分', 视觉程序信息: 1234, 终端信息: 1234, 通讯参数信息 : 666, 端口信息数量: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['视觉程序信息', '终端信息', '通讯参数信息','端口信息数量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  端口信息数量: {
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
            { value: '视觉程序信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '终端信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '通讯参数信息 ', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '端口信息数量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '端口信息数量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '端口信息数量') {
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
            if (value === '视觉程序数量') {
              return '#2b6cbb';
            }
            if (value === '终端地址') {
              return '#41a2fc';
            }
            if (value === '终端信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*端口信息数量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
