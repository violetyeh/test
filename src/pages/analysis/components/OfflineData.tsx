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
  { label: '0.1', 公路试验数量: 2563,公路试验检测信息: 1000, 试验检测数据: 1600, 检测进度: 2082 },
  { label: '0.2', 公路试验数量: 1900,公路试验检测信息: 880, 试验检测数据: 1700, 检测进度: 1463 },
  { label: '0.3', 公路试验数量: 1950,公路试验检测信息: 1950, 试验检测数据: 800, 检测进度: 1075 },
  { label: '0.4', 公路试验数量: 1500,公路试验检测信息: 1500, 试验检测数据: 1390, 检测进度: 2156 },
  { label: '0.5', 公路试验数量: 631,公路试验检测信息: 631, 试验检测数据: 1166, 检测进度: 1266 },
  { label: '0.6', 公路试验数量: 631,公路试验检测信息: 2634, 试验检测数据: 3021, 检测进度: 1254 },
  { label: '0.7', 公路试验数量: 1634,公路试验检测信息: 1434, 试验检测数据: 3021, 检测进度: 1283 },
  { label: '0.8', 公路试验数量: 631,公路试验检测信息: 1284, 试验检测数据: 3021, 检测进度: 2175 },
  { label: '0.9', 公路试验数量: 1534,公路试验检测信息: 1334, 试验检测数据: 1236, 检测进度: 1281 },
  { label: '1.0', 公路试验数量: 631,公路试验检测信息: 631, 试验检测数据: 786, 检测进度:983 },
  { label: '未评分', 公路试验数量: 631,公路试验检测信息: 631, 试验检测数据: 2666, 检测进度: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['公路试验数量', '公路试验检测信息', '试验检测数据','检测进度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  检测进度: {
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
            { value: '公路试验数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '公路试验检测信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '试验检测数据', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '检测进度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '检测进度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '检测进度') {
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
            if (value === '试验信息') {
              return '#41a2fc';
            }
            if (value === '公路试验检测信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*检测进度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
