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
  { label: '0.1', 排期信息: 700, 排期数量: 800, 播放信息: 260, 影片数量: 90 },
  { label: '0.2', 排期信息: 150, 排期数量: 900, 播放信息: 130, 影片数量: 35 },
  { label: '0.3', 排期信息: 195, 排期数量: 950, 播放信息: 900, 影片数量: 50 },
  { label: '0.4', 排期信息: 150, 排期数量: 500, 播放信息: 390, 影片数量: 15 },
  { label: '0.5', 排期信息: 70, 排期数量: 110, 播放信息: 600, 影片数量: 33 },
  { label: '0.6', 排期信息: 117, 排期数量: 270, 播放信息: 100, 影片数量: 34 },
  { label: '0.7', 排期信息: 170, 排期数量: 170, 播放信息: 100, 影片数量: 78 },
  { label: '0.8', 排期信息: 170, 排期数量: 370, 播放信息:300, 影片数量: 80 },
  { label: '0.9', 排期信息: 167, 排期数量: 170, 播放信息: 100, 影片数量: 70 },
  { label: '1.0', 排期信息: 170, 排期数量: 170, 播放信息: 100, 影片数量: 60 },
  { label: '未评分', 排期信息: 170, 排期数量: 170, 播放信息: 100, 影片数量: 3 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['排期信息', '排期数量', '播放信息','影片数量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  影片数量: {
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
            { value: '排期信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '排期数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '播放信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '影片数量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '影片数量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '影片数量') {
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
            if (value === '影片数量') {
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
        <Geom type="line" position="label*影片数量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
