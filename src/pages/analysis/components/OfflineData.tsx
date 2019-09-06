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
  { label: '0.1', 咨询人数: 1280, 客服回复次数: 280, 咨询问题数量: 260, 客服服务效率: 312 },
  { label: '0.2', 咨询人数: 180, 客服回复次数: 180, 咨询问题数量: 1300, 客服服务效率: 413 },
  { label: '0.3', 咨询人数: 950, 客服回复次数: 950, 咨询问题数量: 900, 客服服务效率: 415 },
  { label: '0.4', 咨询人数: 500, 客服回复次数: 500, 咨询问题数量: 390, 客服服务效率: 511 },
  { label: '0.5', 咨询人数: 233, 客服回复次数: 233, 咨询问题数量: 1500, 客服服务效率:123 },
  { label: '0.6', 咨询人数: 233, 客服回复次数: 233, 咨询问题数量: 2010, 客服服务效率: 156 },
  { label: '0.7', 咨询人数: 233, 客服回复次数: 233, 咨询问题数量: 1000, 客服服务效率: 1117 },
  { label: '0.8', 咨询人数: 370, 客服回复次数: 270, 咨询问题数量: 1500, 客服服务效率: 724 },
  { label: '0.9', 咨询人数: 233, 客服回复次数: 233, 咨询问题数量: 1600, 客服服务效率: 516 },
  { label: '1.0', 咨询人数: 233, 客服回复次数: 233, 咨询问题数量: 1500, 客服服务效率: 118 },
  { label: '未评分', 咨询人数: 233, 客服回复次数: 233, 咨询问题数量: 100, 客服服务效率: 512 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['咨询人数', '客服回复次数', '咨询问题数量','客服服务效率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  客服服务效率: {
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
            { value: '咨询人数', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '客服回复次数', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '咨询问题数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '客服服务效率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '客服服务效率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '客服服务效率') {
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
            if (value === '咨询人数') {
              return '#2b6cbb';
            }
            if (value === '客服人数') {
              return '#41a2fc';
            }
            if (value === '效率') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*客服服务效率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
