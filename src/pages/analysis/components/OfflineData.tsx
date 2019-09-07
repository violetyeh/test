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
  { label: '0.1', 到站汽车数量: 156, 进出站汽车数量: 100,安检客运汽车数量: 60, 安检效率: 98 },
  { label: '0.2', 到站汽车数量: 90, 进出站汽车数量: 88,安检客运汽车数量: 70, 安检效率: 86 },
  { label: '0.3', 到站汽车数量: 95, 进出站汽车数量: 90,安检客运汽车数量: 80, 安检效率: 97 },
  { label: '0.4', 到站汽车数量: 50, 进出站汽车数量: 50,安检客运汽车数量: 39, 安检效率: 85 },
  { label: '0.5', 到站汽车数量: 23, 进出站汽车数量: 34,安检客运汽车数量: 166, 安检效率: 96 },
  { label: '0.6', 到站汽车数量: 123, 进出站汽车数量: 34,安检客运汽车数量: 66, 安检效率: 75 },
  { label: '0.7', 到站汽车数量: 63, 进出站汽车数量: 34,安检客运汽车数量: 166, 安检效率: 88 },
  { label: '0.8', 到站汽车数量: 23, 进出站汽车数量: 84,安检客运汽车数量: 66, 安检效率: 75},
  { label: '0.9', 到站汽车数量: 53, 进出站汽车数量: 34,安检客运汽车数量: 26, 安检效率: 98 },
  { label: '1.0', 到站汽车数量: 43, 进出站汽车数量: 24,安检客运汽车数量: 76, 安检效率: 78 },
  { label: '未评分', 到站汽车数量: 43, 进出站汽车数量: 34,安检客运汽车数量: 66, 安检效率: 86 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['到站汽车数量', '进出站汽车数量', '安检客运汽车数量','安检效率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  安检效率: {
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
            { value: '到站汽车数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '进出站汽车数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '发车数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '安检效率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '安检效率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '安检效率') {
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
            if (value === '车辆数量') {
              return '#2b6cbb';
            }
            if (value === '安检效率') {
              return '#41a2fc';
            }
            if (value === '进出站汽车数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*安检效率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
