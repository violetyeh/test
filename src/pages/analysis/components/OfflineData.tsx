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
  { label: '0.1', 食品信息: 700, 过敏源信息: 2123, 分析目标数: 2260, 达标数: 122 },
  { label: '0.2', 食品信息: 1123, 过敏源信息: 1123, 分析目标数: 1300, 达标数: 353 },
  { label: '0.3', 食品信息: 950, 过敏源信息: 950, 分析目标数: 900, 达标数: 785 },
  { label: '0.4', 食品信息: 500, 过敏源信息: 500, 分析目标数: 390, 达标数: 801 },
  { label: '0.5', 食品信息: 689, 过敏源信息: 689, 分析目标数: 298, 达标数: 563 },
  { label: '0.6', 食品信息: 970, 过敏源信息: 570, 分析目标数: 500, 达标数: 123 },
  { label: '0.7', 食品信息: 689, 过敏源信息: 689, 分析目标数: 298, 达标数: 345 },
  { label: '0.8', 食品信息: 970, 过敏源信息: 770, 分析目标数: 500, 达标数: 378 },
  { label: '0.9', 食品信息: 689, 过敏源信息: 689, 分析目标数: 298, 达标数: 343 },
  { label: '1.0', 食品信息: 689, 过敏源信息: 689, 分析目标数: 298, 达标数: 358 },
  { label: '未评分', 食品信息: 689, 过敏源信息: 689, 分析目标数: 298, 达标数: 373 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['食品信息', '过敏源信息', '分析目标数','达标数'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  达标数: {
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
            { value: '食品信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '过敏源信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '分析目标数', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '达标数', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '达标数') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '达标数') {
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
        <Geom type="line" position="label*达标数" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
