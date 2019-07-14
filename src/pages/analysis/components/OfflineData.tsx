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
  { label: '1月份', URL过滤信息: 819, 过滤数量: 819, 过滤速度每毫秒: 2619, 过滤效率: 119 },
  { label: '2月份', URL过滤信息: 919, 过滤数量: 880, 过滤速度每毫秒: 1319, 过滤效率: 83 },
  { label: '3月份', URL过滤信息: 950, 过滤数量: 950, 过滤速度每毫秒: 919, 过滤效率: 119 },
  { label: '4月份', URL过滤信息: 519, 过滤数量: 519, 过滤速度每毫秒: 390, 过滤效率: 56 },
  { label: '5月份', URL过滤信息: 1000, 过滤数量: 698, 过滤速度每毫秒: 1544, 过滤效率: 66 },
  { label: '6月份', URL过滤信息: 1698, 过滤数量: 634, 过滤速度每毫秒: 515, 过滤效率: 54 },
  { label: '7月份', URL过滤信息: 634, 过滤数量: 434, 过滤速度每毫秒: 1544, 过滤效率: 83 },
  { label: '8月份', URL过滤信息: 1698, 过滤数量: 284, 过滤速度每毫秒: 512, 过滤效率: 75 },
  { label: '9月份', URL过滤信息: 534, 过滤数量: 334, 过滤速度每毫秒: 236, 过滤效率: 81 },
  { label: '10月份', URL过滤信息: 698, 过滤数量: 698, 过滤速度每毫秒: 786, 过滤效率: 83 },
  { label: '11月份', URL过滤信息: 1698, 过滤数量: 1698, 过滤速度每毫秒: 1544, 过滤效率: 119 },
  { label: '12月份', URL过滤信息: 1698, 过滤数量: 1698, 过滤速度每毫秒: 1544, 过滤效率: 119 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['URL过滤信息', '过滤数量', '过滤速度每毫秒','过滤效率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  过滤效率: {
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
      <Chart height={419} width={519} forceFit data={dv} scale={scale} padding="auto" onGetG2Instance={getG2Instance}>
        <Legend
          custom
          allowAllCanceled
          items={[
            { value: 'URL过滤信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '过滤数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '过滤速度每毫秒', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '过滤效率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '过滤效率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '过滤效率') {
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
            if (value === '过滤数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*过滤效率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
