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
  { label: '0.1', 图斑面积: 2800, 纸状地类面积: 2800, 点状地类面积: 2260, 基本农田: 2000 },
  { label: '0.2', 图斑面积: 1800, 纸状地类面积: 1800, 点状地类面积: 1300, 基本农田: 3000 },
  { label: '0.3', 图斑面积: 1950, 纸状地类面积: 950, 点状地类面积: 900, 基本农田: 5000 },
  { label: '0.4', 图斑面积: 2500, 纸状地类面积: 500, 点状地类面积: 390, 基本农田: 1000 },
  { label: '0.5', 图斑面积: 2170, 纸状地类面积: 1270, 点状地类面积: 100, 基本农田: 3000 },
  { label: '0.6', 图斑面积: 3170, 纸状地类面积: 1470, 点状地类面积: 3100, 基本农田: 1234 },
  { label: '0.7', 图斑面积: 1720, 纸状地类面积: 1170, 点状地类面积: 2100, 基本农田: 5213 },
  { label: '0.8', 图斑面积: 1970, 纸状地类面积: 2170, 点状地类面积: 1100, 基本农田: 6868 },
  { label: '0.9', 图斑面积: 1070, 纸状地类面积: 1720, 点状地类面积: 100, 基本农田: 1452 },
  { label: '1.0', 图斑面积: 3170, 纸状地类面积: 170, 点状地类面积: 1600, 基本农田: 1023 },
  { label: '未评分', 图斑面积: 1170, 纸状地类面积: 170, 点状地类面积: 1900, 基本农田: 2103 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['图斑面积', '纸状地类面积', '点状地类面积','基本农田'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  基本农田: {
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
            { value: '图斑面积', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '纸状地类面积', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '点状地类面积', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '基本农田', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '基本农田') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '基本农田') {
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
            if (value === '土地利用') {
              return '#2b6cbb';
            }
            if (value === '线状地类') {
              return '#41a2fc';
            }
            if (value === '路面宽度') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*基本农田" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
