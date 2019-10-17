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
  { label: '0.1', 自来水信息数量: 17030, 数据调峰数量: 10800, 调峰日志信息: 21060, 自来水容量: 50000 },
  { label: '0.2', 自来水信息数量: 15010, 数据调峰数量: 14900, 调峰日志信息: 10300, 自来水容量: 30000 },
  { label: '0.3', 自来水信息数量: 19530, 数据调峰数量: 15950, 调峰日志信息: 10900, 自来水容量: 50000 },
  { label: '0.4', 自来水信息数量: 15020, 数据调峰数量: 15500, 调峰日志信息: 39100, 自来水容量: 40000 },
  { label: '0.5', 自来水信息数量: 45670, 数据调峰数量: 21170, 调峰日志信息: 30100, 自来水容量: 50000 },
  { label: '0.6', 自来水信息数量: 11370, 数据调峰数量: 17270, 调峰日志信息: 10010, 自来水容量: 55000 },
  { label: '0.7', 自来水信息数量: 12270, 数据调峰数量: 16170, 调峰日志信息: 11000, 自来水容量: 60000 },
  { label: '0.8', 自来水信息数量: 31170, 数据调峰数量: 14370, 调峰日志信息:10300, 自来水容量: 70000 },
  { label: '0.9', 自来水信息数量: 45167, 数据调峰数量: 12170, 调峰日志信息: 10100, 自来水容量: 60000 },
  { label: '1.0', 自来水信息数量: 42170, 数据调峰数量: 42170, 调峰日志信息: 10100, 自来水容量: 55000 },
  { label: '未评分', 自来水信息数量: 12170, 数据调峰数量: 45170, 调峰日志信息: 16100, 自来水容量: 50000 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['自来水信息数量', '数据调峰数量', '调峰日志信息','自来水容量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  自来水容量: {
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
            { value: '自来水信息数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '数据调峰数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '调峰日志信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '自来水容量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '自来水容量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '自来水容量') {
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
            if (value === '自来水容量') {
              return '#2b6cbb';
            }
            if (value === '调峰数据量') {
              return '#41a2fc';
            }
            if (value === '出错数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*自来水容量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
