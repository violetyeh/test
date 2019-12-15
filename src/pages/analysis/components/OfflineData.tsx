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
  { label: '0.1', 本船信息: 3563, 静动态信息: 1000, 有效位置信息 : 1600, 海图标示 : 3082 },
  { label: '0.2', 本船信息: 1900, 静动态信息: 2880, 有效位置信息 : 1700, 海图标示 : 1463 },
  { label: '0.3', 本船信息: 1950, 静动态信息: 1950, 有效位置信息 : 1800, 海图标示 : 1075 },
  { label: '0.4', 本船信息: 1500, 静动态信息: 1500, 有效位置信息 : 1390, 海图标示 : 2156 },
  { label: '0.5', 本船信息: 4215, 静动态信息: 4215, 有效位置信息 : 1166, 海图标示 : 1266 },
  { label: '0.6', 本船信息: 4215, 静动态信息: 2634, 有效位置信息 : 2010, 海图标示 : 1254 },
  { label: '0.7', 本船信息: 3634, 静动态信息: 1434, 有效位置信息 : 2010, 海图标示 : 1283 },
  { label: '0.8', 本船信息: 4215, 静动态信息: 4284, 有效位置信息 : 2010, 海图标示 : 2175 },
  { label: '0.9', 本船信息: 1534, 静动态信息: 1334, 有效位置信息 : 2236, 海图标示 : 1281 },
  { label: '1.0', 本船信息: 4215, 静动态信息: 3234, 有效位置信息 : 786, 海图标示 :1183 },
  { label: '未评分', 本船信息: 2234, 静动态信息: 4234, 有效位置信息 : 2010, 海图标示 : 3164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['本船信息', '静动态信息', '有效位置信息','海图标示' ], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  海图标示 : {
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
            { value: '本船信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '静动态信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '有效位置信息 ', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '海图标示' , marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value ===  '海图标示') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '海图标示') {
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
            if (value === '海图数据') {
              return '#2b6cbb';
            }
            if (value === '船只数') {
              return '#41a2fc';
            }
            if (value === '静动态信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*海图标示" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
