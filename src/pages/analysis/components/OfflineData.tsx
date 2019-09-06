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
  { label: '0.1', 学员人数: 355, 教练车数量: 40, 教练人数:10, 学驾学费: 3082 },
  { label: '0.2', 学员人数: 320, 教练车数量: 36, 教练人数: 13, 学驾学费: 4063 },
  { label: '0.3', 学员人数: 395, 教练车数量: 39, 教练人数: 10, 学驾学费: 3075 },
  { label: '0.4', 学员人数: 340, 教练车数量: 35, 教练人数: 28, 学驾学费: 3056 },
  { label: '0.5', 学员人数: 395, 教练车数量: 39, 教练人数: 48, 学驾学费: 3066 },
  { label: '0.6', 学员人数: 350, 教练车数量: 34, 教练人数: 23, 学驾学费: 3054 },
  { label: '0.7', 学员人数: 390, 教练车数量: 85, 教练人数: 37, 学驾学费: 2083 },
  { label: '0.8', 学员人数: 340, 教练车数量: 15, 教练人数: 46, 学驾学费: 3075 },
  { label: '0.9', 学员人数: 395, 教练车数量: 35, 教练人数: 17, 学驾学费: 3081 },
  { label: '1.0', 学员人数: 395, 教练车数量: 43, 教练人数: 15, 学驾学费: 3083 },
  { label: '未评分', 学员人数: 390, 教练车数量: 76, 教练人数: 56, 学驾学费: 3064 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['学员人数', '教练车数量', '教练人数','学驾学费'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  学驾学费: {
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
            { value: '学员人数', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '教练车数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '教练人数', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '学驾学费', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '学驾学费') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '学驾学费') {
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
            if (value === '学员人数') {
              return '#2b6cbb';
            }
            if (value === '学驾学费') {
              return '#41a2fc';
            }
            if (value === '教练车数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*学驾学费" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
