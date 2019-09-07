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
  { label: '0.1', 客车总数量: 156, 报班汽车数量: 100,客运汽车数量: 160, 检验效率: 98 },
  { label: '0.2', 客车总数量: 290, 报班汽车数量: 188,客运汽车数量: 170, 检验效率: 86 },
  { label: '0.3', 客车总数量: 195, 报班汽车数量: 290,客运汽车数量: 180, 检验效率: 97 },
  { label: '0.4', 客车总数量: 250, 报班汽车数量: 150,客运汽车数量: 139, 检验效率: 85 },
  { label: '0.5', 客车总数量: 123, 报班汽车数量: 234,客运汽车数量: 166, 检验效率: 96 },
  { label: '0.6', 客车总数量: 123, 报班汽车数量: 134,客运汽车数量: 166, 检验效率: 75 },
  { label: '0.7', 客车总数量: 263, 报班汽车数量: 234,客运汽车数量: 166, 检验效率: 88 },
  { label: '0.8', 客车总数量: 123, 报班汽车数量: 184,客运汽车数量: 166, 检验效率: 75},
  { label: '0.9', 客车总数量: 253, 报班汽车数量: 234,客运汽车数量: 126, 检验效率: 98 },
  { label: '1.0', 客车总数量: 143, 报班汽车数量: 124,客运汽车数量: 176, 检验效率: 78 },
  { label: '未评分', 客车总数量: 243, 报班汽车数量: 234,客运汽车数量: 166, 检验效率: 86 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['客车总数量', '报班汽车数量', '客运汽车数量','检验效率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  检验效率: {
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
            { value: '客车总数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '报班汽车数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '发车数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '检验效率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '检验效率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '检验效率') {
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
            if (value === '检验效率') {
              return '#41a2fc';
            }
            if (value === '报班汽车数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*检验效率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
