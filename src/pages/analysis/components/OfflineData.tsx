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
  { label: '0.1', 乘客数量: 563, 售票数量: 600, 客车数量: 600, 定制效率: 98 },
  { label: '0.2', 乘客数量: 900, 售票数量: 880, 客车数量: 700, 定制效率: 86 },
  { label: '0.3', 乘客数量: 950, 售票数量: 950, 客车数量: 800, 定制效率: 97 },
  { label: '0.4', 乘客数量: 500, 售票数量: 500, 客车数量: 390, 定制效率: 85 },
  { label: '0.5', 乘客数量: 234, 售票数量: 234, 客车数量: 366, 定制效率: 76 },
  { label: '0.6', 乘客数量: 234, 售票数量: 634, 客车数量: 666, 定制效率: 85 },
  { label: '0.7', 乘客数量: 634, 售票数量: 434, 客车数量: 566, 定制效率: 88 },
  { label: '0.8', 乘客数量: 234, 售票数量: 284, 客车数量: 666, 定制效率: 75},
  { label: '0.9', 乘客数量: 534, 售票数量: 334, 客车数量: 236, 定制效率: 78 },
  { label: '1.0', 乘客数量: 234, 售票数量: 234, 客车数量: 786, 定制效率: 68 },
  { label: '未评分', 乘客数量: 234, 售票数量: 234, 客车数量: 666, 定制效率: 96 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['乘客数量', '售票数量', '客车数量','定制效率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  定制效率: {
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
            { value: '乘客数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '售票数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '客车数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '定制效率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '定制效率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '定制效率') {
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
            if (value === '售票价格') {
              return '#41a2fc';
            }
            if (value === '售票数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*定制效率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
