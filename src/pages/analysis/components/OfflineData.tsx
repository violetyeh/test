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
  { label: '0.1', 网盘已占空间: 80, 网盘资源数: 80, 文档数量: 160, 网盘剩余空间: 10 },
  { label: '0.2', 网盘已占空间: 90, 网盘资源数: 80, 文档数量: 130, 网盘剩余空间: 8 },
  { label: '0.3', 网盘已占空间: 95, 网盘资源数: 90, 文档数量: 90, 网盘剩余空间: 10 },
  { label: '0.4', 网盘已占空间: 50, 网盘资源数: 50, 文档数量: 39, 网盘剩余空间: 5 },
  { label: '0.5', 网盘已占空间: 23, 网盘资源数: 24, 文档数量: 166, 网盘剩余空间: 6},
  { label: '0.6', 网盘已占空间: 12, 网盘资源数: 64, 文档数量: 66, 网盘剩余空间: 5 },
  { label: '0.7', 网盘已占空间: 63, 网盘资源数: 44, 文档数量: 166, 网盘剩余空间: 8 },
  { label: '0.8', 网盘已占空间: 23, 网盘资源数: 24, 文档数量: 66, 网盘剩余空间: 7 },
  { label: '0.9', 网盘已占空间: 53, 网盘资源数: 34, 文档数量: 23, 网盘剩余空间: 8 },
  { label: '1.0', 网盘已占空间: 23, 网盘资源数: 23, 文档数量: 78, 网盘剩余空间: 8 },
  { label: '未评分', 网盘已占空间: 13, 网盘资源数: 123, 文档数量: 166, 网盘剩余空间: 10 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['网盘已占空间', '网盘资源数', '文档数量','网盘剩余空间'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  网盘剩余空间: {
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
            { value: '网盘已占空间', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '网盘资源数', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '文档数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '网盘剩余空间', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '网盘剩余空间') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '网盘剩余空间') {
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
            if (value === '资源数量') {
              return '#2b6cbb';
            }
            if (value === '网盘空间') {
              return '#41a2fc';
            }
            if (value === '网盘资源数') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*网盘剩余空间" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
