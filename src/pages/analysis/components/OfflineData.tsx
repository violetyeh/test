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
  { label: '0.1', 产品订单数量: 1563, 产品订单目标量: 1000, 产品订单价格: 600, 产品订单发货速度: 82 },
  { label: '0.2', 产品订单数量: 900, 产品订单目标量: 880, 产品订单价格: 700, 产品订单发货速度: 63 },
  { label: '0.3', 产品订单数量: 950, 产品订单目标量: 950, 产品订单价格: 800, 产品订单发货速度: 75 },
  { label: '0.4', 产品订单数量: 500, 产品订单目标量: 500, 产品订单价格: 390, 产品订单发货速度: 56 },
  { label: '0.5', 产品订单数量: 234, 产品订单目标量: 234, 产品订单价格: 1666, 产品订单发货速度: 66 },
  { label: '0.6', 产品订单数量: 1234, 产品订单目标量: 634, 产品订单价格: 666, 产品订单发货速度: 54 },
  { label: '0.7', 产品订单数量: 634, 产品订单目标量: 434, 产品订单价格: 1666, 产品订单发货速度: 83 },
  { label: '0.8', 产品订单数量: 234, 产品订单目标量: 284, 产品订单价格: 666, 产品订单发货速度: 75 },
  { label: '0.9', 产品订单数量: 534, 产品订单目标量: 334, 产品订单价格: 236, 产品订单发货速度: 81 },
  { label: '1.0', 产品订单数量: 234, 产品订单目标量: 234, 产品订单价格: 786, 产品订单发货速度: 83 },
  { label: '未评分', 产品订单数量: 234, 产品订单目标量: 234, 产品订单价格: 666, 产品订单发货速度: 64 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['产品订单数量', '产品订单目标量', '产品订单价格','产品订单发货速度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  产品订单发货速度: {
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
            { value: '产品订单数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '产品订单目标量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '产品订单价格', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '产品订单发货速度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '产品订单发货速度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '产品订单发货速度') {
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
            if (value === '样品数') {
              return '#41a2fc';
            }
            if (value === '产品订单目标量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*产品订单发货速度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
