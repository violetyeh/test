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
  { label: '0.1', 权籍管理: 3563, 不动产单元号: 1000, 权籍调查表: 1600, 建库进度: 2082 },
  { label: '0.2', 权籍管理: 1900, 不动产单元号: 1880, 权籍调查表: 1700, 建库进度: 1463 },
  { label: '0.3', 权籍管理: 1950, 不动产单元号: 1950, 权籍调查表: 1800, 建库进度: 1075 },
  { label: '0.4', 权籍管理: 1500, 不动产单元号: 1500, 权籍调查表: 1390, 建库进度: 2156 },
  { label: '0.5', 权籍管理: 2034, 不动产单元号: 2034, 权籍调查表: 1166, 建库进度: 1266 },
  { label: '0.6', 权籍管理: 2034, 不动产单元号: 1634, 权籍调查表: 1666, 建库进度: 1254 },
  { label: '0.7', 权籍管理: 1634, 不动产单元号: 1434, 权籍调查表: 1666, 建库进度: 1283 },
  { label: '0.8', 权籍管理: 2034, 不动产单元号: 1284, 权籍调查表: 1666, 建库进度: 2175 },
  { label: '0.9', 权籍管理: 1534, 不动产单元号: 1334, 权籍调查表: 1236, 建库进度: 1281 },
  { label: '1.0', 权籍管理: 2034, 不动产单元号: 2034, 权籍调查表: 786, 建库进度: 2183 },
  { label: '未评分', 权籍管理: 2034, 不动产单元号: 2034, 权籍调查表: 666, 建库进度: 2164 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['权籍管理', '不动产单元号', '权籍调查表','建库进度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  建库进度: {
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
            { value: '权籍管理', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '不动产单元号', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '权籍调查表', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '建库进度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '建库进度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '建库进度') {
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
            if (value === '不动产数量') {
              return '#2b6cbb';
            }
            if (value === '建库信息') {
              return '#41a2fc';
            }
            if (value === '不动产单元号') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*建库进度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
