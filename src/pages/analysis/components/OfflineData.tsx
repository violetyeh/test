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
  { label: '0.1', 防火墙检测数量: 3563, 计算机安全信息: 1000, 安全审计信息: 1600, 漏洞检测数量: 2082 },
  { label: '0.2', 防火墙检测数量: 1900, 计算机安全信息: 1880, 安全审计信息: 1700, 漏洞检测数量: 1463 },
  { label: '0.3', 防火墙检测数量: 1950, 计算机安全信息: 1950, 安全审计信息: 1800, 漏洞检测数量: 1075 },
  { label: '0.4', 防火墙检测数量: 1500, 计算机安全信息: 1500, 安全审计信息: 1390, 漏洞检测数量: 2156 },
  { label: '0.5', 防火墙检测数量: 2034, 计算机安全信息: 2034, 安全审计信息: 1166, 漏洞检测数量: 1266 },
  { label: '0.6', 防火墙检测数量: 2034, 计算机安全信息: 1634, 安全审计信息: 1666, 漏洞检测数量: 1254 },
  { label: '0.7', 防火墙检测数量: 1634, 计算机安全信息: 1434, 安全审计信息: 1666, 漏洞检测数量: 1283 },
  { label: '0.8', 防火墙检测数量: 2034, 计算机安全信息: 1284, 安全审计信息: 1666, 漏洞检测数量: 2175 },
  { label: '0.9', 防火墙检测数量: 1534, 计算机安全信息: 1334, 安全审计信息: 1236, 漏洞检测数量: 1281 },
  { label: '1.0', 防火墙检测数量: 2034, 计算机安全信息: 2034, 安全审计信息: 786, 漏洞检测数量: 2183 },
  { label: '未评分', 防火墙检测数量: 2034, 计算机安全信息: 2034, 安全审计信息: 666, 漏洞检测数量: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['防火墙检测数量', '计算机安全信息', '安全审计信息','漏洞检测数量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  漏洞检测数量: {
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
            { value: '防火墙检测数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '计算机安全信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '安全审计信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '漏洞检测数量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '漏洞检测数量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '漏洞检测数量') {
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
            if (value === '计算机安全信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*漏洞检测数量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
