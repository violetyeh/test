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
  { label: '0.1', 目标检测里程: 280, 今日检测里程: 280, 公路总里程: 2260, 养护检测进度: 12 },
  { label: '0.2', 目标检测里程: 180, 今日检测里程: 180, 公路总里程: 1300, 养护检测进度: 13 },
  { label: '0.3', 目标检测里程: 950, 今日检测里程: 950, 公路总里程: 1900, 养护检测进度: 15 },
  { label: '0.4', 目标检测里程: 500, 今日检测里程: 500, 公路总里程: 1390, 养护检测进度: 11 },
  { label: '0.5', 目标检测里程: 170, 今日检测里程: 170, 公路总里程: 1500, 养护检测进度: 23 },
  { label: '0.6', 目标检测里程: 170, 今日检测里程: 170, 公路总里程: 2010, 养护检测进度: 56 },
  { label: '0.7', 目标检测里程: 170, 今日检测里程: 170, 公路总里程: 1000, 养护检测进度: 17 },
  { label: '0.8', 目标检测里程: 170, 今日检测里程: 170, 公路总里程: 1000, 养护检测进度: 24 },
  { label: '0.9', 目标检测里程: 170, 今日检测里程: 170, 公路总里程: 1600, 养护检测进度: 16 },
  { label: '1.0', 目标检测里程: 170, 今日检测里程: 170, 公路总里程: 1500, 养护检测进度: 18 },
  { label: '未评分', 目标检测里程: 170, 今日检测里程: 170, 公路总里程: 1100, 养护检测进度: 12 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['目标检测里程', '今日检测里程', '公路总里程','养护检测进度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  养护检测进度: {
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
            { value: '目标检测里程', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '今日检测里程', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '公路总里程', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '养护检测进度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '养护检测进度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '养护检测进度') {
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
            if (value === '公路里程数') {
              return '#2b6cbb';
            }
            if (value === '养护里程数') {
              return '#41a2fc';
            }
            if (value === '完成公路数') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*养护检测进度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
