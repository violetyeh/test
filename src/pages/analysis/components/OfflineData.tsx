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
  { label: '0.1', 今日病人数量: 154, 病人数量: 80, 眼底照相信息: 45, 荧光造影信息: 100 },
  { label: '0.2', 今日病人数量: 190, 病人数量: 80, 眼底照相信息: 13, 荧光造影信息: 81 },
  { label: '0.3', 今日病人数量: 121, 病人数量: 90, 眼底照相信息: 90, 荧光造影信息: 101 },
  { label: '0.4', 今日病人数量: 150, 病人数量: 50, 眼底照相信息: 39, 荧光造影信息: 52 },
  { label: '0.5', 今日病人数量: 123, 病人数量: 24, 眼底照相信息: 50, 荧光造影信息: 65},
  { label: '0.6', 今日病人数量: 112, 病人数量: 64, 眼底照相信息: 66, 荧光造影信息: 54 },
  { label: '0.7', 今日病人数量: 163, 病人数量: 44, 眼底照相信息: 16, 荧光造影信息: 87 },
  { label: '0.8', 今日病人数量: 123, 病人数量: 24, 眼底照相信息: 66, 荧光造影信息: 75 },
  { label: '0.9', 今日病人数量: 153, 病人数量: 34, 眼底照相信息: 23, 荧光造影信息: 84 },
  { label: '1.0', 今日病人数量: 123, 病人数量: 23, 眼底照相信息: 78, 荧光造影信息: 81 },
  { label: '未评分', 今日病人数量: 113, 病人数量: 13, 眼底照相信息: 66, 荧光造影信息: 110 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['今日病人数量', '病人数量', '眼底照相信息','荧光造影信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  荧光造影信息: {
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
            { value: '今日病人数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '病人数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '眼底照相信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '荧光造影信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '荧光造影信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '荧光造影信息') {
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
            if (value === '照相数量') {
              return '#2b6cbb';
            }
            if (value === '荧光造影信息') {
              return '#41a2fc';
            }
            if (value === '病人数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*荧光造影信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
