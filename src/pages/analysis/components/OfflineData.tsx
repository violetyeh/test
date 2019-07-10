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
  { label: '0.1', 广告数量: 280, 广告资源量: 280, 资源管理文档: 2260, 资源上报数量: 12 },
  { label: '0.2', 广告数量: 180, 广告资源量: 180, 资源管理文档: 1300, 资源上报数量: 13 },
  { label: '0.3', 广告数量: 950, 广告资源量: 950, 资源管理文档: 900, 资源上报数量: 15 },
  { label: '0.4', 广告数量: 500, 广告资源量: 500, 资源管理文档: 390, 资源上报数量: 11 },
  { label: '0.5', 广告数量: 170, 广告资源量: 170, 资源管理文档: 1500, 资源上报数量: 23 },
  { label: '0.6', 广告数量: 170, 广告资源量: 170, 资源管理文档: 2010, 资源上报数量: 56 },
  { label: '0.7', 广告数量: 170, 广告资源量: 170, 资源管理文档: 1000, 资源上报数量: 17 },
  { label: '0.8', 广告数量: 170, 广告资源量: 170, 资源管理文档: 1000, 资源上报数量: 24 },
  { label: '0.9', 广告数量: 170, 广告资源量: 170, 资源管理文档: 1600, 资源上报数量: 16 },
  { label: '1.0', 广告数量: 170, 广告资源量: 170, 资源管理文档: 1500, 资源上报数量: 18 },
  { label: '未评分', 广告数量: 170, 广告资源量: 170, 资源管理文档: 100, 资源上报数量: 12 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['广告数量', '广告资源量', '资源管理文档','资源上报数量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  资源上报数量: {
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
            { value: '广告数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '广告资源量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '资源管理文档', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '资源上报数量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '资源上报数量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '资源上报数量') {
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
            if (value === '放款应还本金') {
              return '#2b6cbb';
            }
            if (value === '价格') {
              return '#41a2fc';
            }
            if (value === '收益') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*资源上报数量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
