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
  { label: '0.1', 企业业务数量: 50, 客户数量: 40, 业务服务信息:10, 服务进度: 82 },
  { label: '0.2', 企业业务数量: 20, 客户数量: 6, 业务服务信息: 13, 服务进度: 63 },
  { label: '0.3', 企业业务数量: 90, 客户数量: 9, 业务服务信息: 10, 服务进度: 75 },
  { label: '0.4', 企业业务数量: 10, 客户数量: 5, 业务服务信息: 8, 服务进度: 56 },
  { label: '0.5', 企业业务数量: 95, 客户数量: 9, 业务服务信息: 8, 服务进度: 66 },
  { label: '0.6', 企业业务数量: 50, 客户数量: 34, 业务服务信息: 3, 服务进度: 54 },
  { label: '0.7', 企业业务数量: 90, 客户数量: 85, 业务服务信息: 7, 服务进度: 83 },
  { label: '0.8', 企业业务数量: 10, 客户数量: 15, 业务服务信息: 6, 服务进度: 75 },
  { label: '0.9', 企业业务数量: 95, 客户数量: 35, 业务服务信息: 17, 服务进度: 81 },
  { label: '1.0', 企业业务数量: 95, 客户数量: 43, 业务服务信息: 15, 服务进度: 83 },
  { label: '未评分', 企业业务数量: 90, 客户数量: 76, 业务服务信息: 56, 服务进度: 64 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['企业业务数量', '客户数量', '业务服务信息','服务进度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  服务进度: {
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
            { value: '企业业务数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '客户数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '业务服务信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '服务进度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '服务进度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '服务进度') {
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
            if (value === '企业业务数量') {
              return '#2b6cbb';
            }
            if (value === '服务进度') {
              return '#41a2fc';
            }
            if (value === '客户数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*服务进度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
