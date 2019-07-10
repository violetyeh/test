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
  { label: '0.1', 精准广告数量: 1280, 精准广告投放量: 280, 投放管理文档: 260, 投放成功数量: 312 },
  { label: '0.2', 精准广告数量: 180, 精准广告投放量: 180, 投放管理文档: 1300, 投放成功数量: 413 },
  { label: '0.3', 精准广告数量: 950, 精准广告投放量: 950, 投放管理文档: 900, 投放成功数量: 415 },
  { label: '0.4', 精准广告数量: 500, 精准广告投放量: 500, 投放管理文档: 390, 投放成功数量: 511 },
  { label: '0.5', 精准广告数量: 170, 精准广告投放量: 170, 投放管理文档: 1500, 投放成功数量:123 },
  { label: '0.6', 精准广告数量: 170, 精准广告投放量: 170, 投放管理文档: 2010, 投放成功数量: 156 },
  { label: '0.7', 精准广告数量: 170, 精准广告投放量: 170, 投放管理文档: 1000, 投放成功数量: 1117 },
  { label: '0.8', 精准广告数量: 370, 精准广告投放量: 270, 投放管理文档: 1500, 投放成功数量: 724 },
  { label: '0.9', 精准广告数量: 170, 精准广告投放量: 170, 投放管理文档: 1600, 投放成功数量: 516 },
  { label: '1.0', 精准广告数量: 170, 精准广告投放量: 170, 投放管理文档: 1500, 投放成功数量: 118 },
  { label: '未评分', 精准广告数量: 170, 精准广告投放量: 170, 投放管理文档: 100, 投放成功数量: 512 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['精准广告数量', '精准广告投放量', '投放管理文档','投放成功数量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  投放成功数量: {
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
            { value: '精准广告数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '精准广告投放量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '投放管理文档', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '投放成功数量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '投放成功数量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '投放成功数量') {
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
        <Geom type="line" position="label*投放成功数量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
