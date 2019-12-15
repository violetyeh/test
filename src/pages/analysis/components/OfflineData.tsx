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
  { label: '0.1', 影像信息: 2563, 数据库信息: 1300, 影像特征: 1600, 数据提取进度: 2082 },
  { label: '0.2', 影像信息: 1900, 数据库信息: 4880, 影像特征: 1700, 数据提取进度: 1463 },
  { label: '0.3', 影像信息: 1950, 数据库信息: 1950, 影像特征: 3800, 数据提取进度: 1075 },
  { label: '0.4', 影像信息: 1500, 数据库信息: 1500, 影像特征: 1390, 数据提取进度: 2156 },
  { label: '0.5', 影像信息: 1234, 数据库信息: 1234, 影像特征: 1166, 数据提取进度: 1266 },
  { label: '0.6', 影像信息: 1234, 数据库信息: 2634, 影像特征: 1666, 数据提取进度: 1254 },
  { label: '0.7', 影像信息: 3634, 数据库信息: 1434, 影像特征: 1666, 数据提取进度: 1283 },
  { label: '0.8', 影像信息: 3634, 数据库信息: 4284, 影像特征: 1666, 数据提取进度: 2175 },
  { label: '0.9', 影像信息: 5434, 数据库信息: 1334, 影像特征: 5236, 数据提取进度: 1281 },
  { label: '1.0', 影像信息: 1234, 数据库信息: 1234, 影像特征: 786, 数据提取进度:5183 },
  { label: '未评分', 影像信息: 1234, 数据库信息: 1234, 影像特征: 4666, 数据提取进度: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['影像信息', '数据库信息', '影像特征','数据提取进度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  数据提取进度: {
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
            { value: '影像信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '数据库信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '影像特征', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '数据提取进度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '数据提取进度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '数据提取进度') {
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
            if (value === '影像信息') {
              return '#41a2fc';
            }
            if (value === '数据库信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*数据提取进度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
