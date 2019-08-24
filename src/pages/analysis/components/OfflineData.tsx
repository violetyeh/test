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
  { label: '0.1', 防火墙预警次数: 1563, 预警病毒数量: 1000, 预警反馈信息: 1600, 病毒恢复信息: 2082 },
  { label: '0.2', 防火墙预警次数: 1900, 预警病毒数量: 1880, 预警反馈信息: 1700, 病毒恢复信息: 1463 },
  { label: '0.3', 防火墙预警次数: 1950, 预警病毒数量: 1950, 预警反馈信息: 1800, 病毒恢复信息: 1075 },
  { label: '0.4', 防火墙预警次数: 1500, 预警病毒数量: 1500, 预警反馈信息: 1390, 病毒恢复信息: 2156 },
  { label: '0.5', 防火墙预警次数: 1234, 预警病毒数量: 1234, 预警反馈信息: 1166, 病毒恢复信息: 1266 },
  { label: '0.6', 防火墙预警次数: 1234, 预警病毒数量: 1634, 预警反馈信息: 1666, 病毒恢复信息: 1254 },
  { label: '0.7', 防火墙预警次数: 1634, 预警病毒数量: 1434, 预警反馈信息: 1666, 病毒恢复信息: 1283 },
  { label: '0.8', 防火墙预警次数: 1234, 预警病毒数量: 1284, 预警反馈信息: 1666, 病毒恢复信息: 2175 },
  { label: '0.9', 防火墙预警次数: 1534, 预警病毒数量: 1334, 预警反馈信息: 1236, 病毒恢复信息: 1281 },
  { label: '1.0', 防火墙预警次数: 1234, 预警病毒数量: 1234, 预警反馈信息: 786, 病毒恢复信息: 2183 },
  { label: '未评分', 防火墙预警次数: 1234, 预警病毒数量: 1234, 预警反馈信息: 666, 病毒恢复信息: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['防火墙预警次数', '预警病毒数量', '预警反馈信息','病毒恢复信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  病毒恢复信息: {
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
            { value: '防火墙预警次数', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '预警病毒数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '预警反馈信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '病毒恢复信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '病毒恢复信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '病毒恢复信息') {
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
            if (value === '病毒数量') {
              return '#2b6cbb';
            }
            if (value === '预警信息') {
              return '#41a2fc';
            }
            if (value === '预警病毒数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*病毒恢复信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
