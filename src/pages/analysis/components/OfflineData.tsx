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
  { label: '0.1', 广告数量: 1280, 广告滚动次数: 280, 广告滚动信息: 260, 滚动完成数量: 312 },
  { label: '0.2', 广告数量: 180, 广告滚动次数: 180, 广告滚动信息: 1300, 滚动完成数量: 413 },
  { label: '0.3', 广告数量: 950, 广告滚动次数: 950, 广告滚动信息: 900, 滚动完成数量: 415 },
  { label: '0.4', 广告数量: 500, 广告滚动次数: 500, 广告滚动信息: 390, 滚动完成数量: 511 },
  { label: '0.5', 广告数量: 170, 广告滚动次数: 170, 广告滚动信息: 1500, 滚动完成数量:123 },
  { label: '0.6', 广告数量: 170, 广告滚动次数: 170, 广告滚动信息: 2010, 滚动完成数量: 156 },
  { label: '0.7', 广告数量: 170, 广告滚动次数: 170, 广告滚动信息: 1000, 滚动完成数量: 1117 },
  { label: '0.8', 广告数量: 370, 广告滚动次数: 270, 广告滚动信息: 1500, 滚动完成数量: 724 },
  { label: '0.9', 广告数量: 170, 广告滚动次数: 170, 广告滚动信息: 1600, 滚动完成数量: 516 },
  { label: '1.0', 广告数量: 170, 广告滚动次数: 170, 广告滚动信息: 1500, 滚动完成数量: 118 },
  { label: '未评分', 广告数量: 170, 广告滚动次数: 170, 广告滚动信息: 100, 滚动完成数量: 512 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['广告数量', '广告滚动次数', '广告滚动信息','滚动完成数量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  滚动完成数量: {
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
            { value: '广告滚动次数', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '广告滚动信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '滚动完成数量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '滚动完成数量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '滚动完成数量') {
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
            if (value === '广告数量') {
              return '#2b6cbb';
            }
            if (value === '滚动次数') {
              return '#41a2fc';
            }
            if (value === '成功数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*滚动完成数量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
