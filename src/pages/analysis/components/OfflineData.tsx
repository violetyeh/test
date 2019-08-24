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
  { label: '0.1', 网络信息数量: 2563, 运维安全信息: 1000, 已运维数量: 1600, 政务网络数量: 2082 },
  { label: '0.2', 网络信息数量: 1900, 运维安全信息: 880, 已运维数量: 1700, 政务网络数量: 1463 },
  { label: '0.3', 网络信息数量: 1950, 运维安全信息: 1950, 已运维数量: 800, 政务网络数量: 1075 },
  { label: '0.4', 网络信息数量: 1500, 运维安全信息: 1500, 已运维数量: 1390, 政务网络数量: 2156 },
  { label: '0.5', 网络信息数量: 3321, 运维安全信息: 3321, 已运维数量: 1114, 政务网络数量: 3314 },
  { label: '0.6', 网络信息数量: 3321, 运维安全信息: 2621, 已运维数量: 1146, 政务网络数量: 3354 },
  { label: '0.7', 网络信息数量: 1621, 运维安全信息: 1421, 已运维数量: 1146, 政务网络数量: 3383 },
  { label: '0.8', 网络信息数量: 3321, 运维安全信息: 3384, 已运维数量: 1146, 政务网络数量: 2175 },
  { label: '0.9', 网络信息数量: 1521, 运维安全信息: 1321, 已运维数量: 3336, 政务网络数量: 3381 },
  { label: '1.0', 网络信息数量: 3321, 运维安全信息: 3321, 已运维数量: 786, 政务网络数量:983 },
  { label: '未评分', 网络信息数量: 3321, 运维安全信息: 3321, 已运维数量: 2146, 政务网络数量: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['网络信息数量', '运维安全信息', '已运维数量','政务网络数量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  政务网络数量: {
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
            { value: '网络信息数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '运维安全信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '已运维数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '政务网络数量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '政务网络数量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '政务网络数量') {
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
            if (value === '政务网络数量') {
              return '#2b6cbb';
            }
            if (value === '终端数量') {
              return '#41a2fc';
            }
            if (value === '运维安全信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*政务网络数量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
