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
  { label: '0.1', 扫描病人数量: 55, 扫描仪使用次数: 40, 眼科扫描信息:10, 扫描效率: 82 },
  { label: '0.2', 扫描病人数量: 20, 扫描仪使用次数: 36, 眼科扫描信息: 13, 扫描效率: 63 },
  { label: '0.3', 扫描病人数量: 95, 扫描仪使用次数: 39, 眼科扫描信息: 10, 扫描效率: 75 },
  { label: '0.4', 扫描病人数量: 40, 扫描仪使用次数: 35, 眼科扫描信息: 28, 扫描效率: 56 },
  { label: '0.5', 扫描病人数量: 95, 扫描仪使用次数: 39, 眼科扫描信息: 48, 扫描效率: 66 },
  { label: '0.6', 扫描病人数量: 50, 扫描仪使用次数: 34, 眼科扫描信息: 23, 扫描效率: 54 },
  { label: '0.7', 扫描病人数量: 90, 扫描仪使用次数: 85, 眼科扫描信息: 37, 扫描效率: 83 },
  { label: '0.8', 扫描病人数量: 40, 扫描仪使用次数: 15, 眼科扫描信息: 46, 扫描效率: 75 },
  { label: '0.9', 扫描病人数量: 95, 扫描仪使用次数: 35, 眼科扫描信息: 17, 扫描效率: 81 },
  { label: '1.0', 扫描病人数量: 95, 扫描仪使用次数: 43, 眼科扫描信息: 15, 扫描效率: 83 },
  { label: '未评分', 扫描病人数量: 90, 扫描仪使用次数: 76, 眼科扫描信息: 56, 扫描效率: 64 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['扫描病人数量', '扫描仪使用次数', '眼科扫描信息','扫描效率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  扫描效率: {
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
            { value: '扫描病人数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '扫描仪使用次数', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '眼科扫描信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '扫描效率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '扫描效率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '扫描效率') {
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
            if (value === '扫描病人数量') {
              return '#2b6cbb';
            }
            if (value === '扫描效率') {
              return '#41a2fc';
            }
            if (value === '扫描仪使用次数') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*扫描效率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
