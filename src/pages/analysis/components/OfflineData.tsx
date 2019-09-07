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
  { label: '0.1', 储物柜数量: 1563, 储物数量: 1000, 反复储物次数: 1600, 储物柜占用率: 208 },
  { label: '0.2', 储物柜数量: 1900, 储物数量: 1880, 反复储物次数: 1700, 储物柜占用率: 146 },
  { label: '0.3', 储物柜数量: 1950, 储物数量: 1950, 反复储物次数: 1800, 储物柜占用率: 107 },
  { label: '0.4', 储物柜数量: 1500, 储物数量: 1500, 反复储物次数: 1390, 储物柜占用率: 215 },
  { label: '0.5', 储物柜数量: 1234, 储物数量: 1234, 反复储物次数: 1166, 储物柜占用率: 126 },
  { label: '0.6', 储物柜数量: 1234, 储物数量: 1634, 反复储物次数: 1666, 储物柜占用率: 125 },
  { label: '0.7', 储物柜数量: 1634, 储物数量: 1434, 反复储物次数: 1666, 储物柜占用率: 128 },
  { label: '0.8', 储物柜数量: 1234, 储物数量: 1284, 反复储物次数: 1666, 储物柜占用率: 217 },
  { label: '0.9', 储物柜数量: 1534, 储物数量: 1334, 反复储物次数: 1236, 储物柜占用率: 128 },
  { label: '1.0', 储物柜数量: 1234, 储物数量: 1234, 反复储物次数: 786, 储物柜占用率: 218},
  { label: '未评分', 储物柜数量: 1234, 储物数量: 1234, 反复储物次数: 666, 储物柜占用率: 216 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['储物柜数量', '储物数量', '反复储物次数','储物柜占用率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  储物柜占用率: {
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
            { value: '储物柜数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '储物数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '反复储物次数', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '储物柜占用率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '储物柜占用率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '储物柜占用率') {
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
            if (value === '储物数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*储物柜占用率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
