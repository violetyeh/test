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
  { label: '0.1', 大数据信息条数: 27030, 数据存储数量: 10800, 存储日志信息: 21060, 存储容量: 35105 },
  { label: '0.2', 大数据信息条数: 13510, 数据存储数量: 14900, 存储日志信息: 10300, 存储容量: 31050 },
  { label: '0.3', 大数据信息条数: 19530, 数据存储数量: 15935, 存储日志信息: 10900, 存储容量: 35105 },
  { label: '0.4', 大数据信息条数: 13520, 数据存储数量: 15350, 存储日志信息: 39321, 存储容量: 41050 },
  { label: '0.5', 大数据信息条数: 45670, 数据存储数量: 21170, 存储日志信息: 30321, 存储容量: 35105 },
  { label: '0.6', 大数据信息条数: 11370, 数据存储数量: 17270, 存储日志信息: 32110, 存储容量: 53500 },
  { label: '0.7', 大数据信息条数: 22270, 数据存储数量: 16170, 存储日志信息: 11105, 存储容量: 61050 },
  { label: '0.8', 大数据信息条数: 31170, 数据存储数量: 14362, 存储日志信息:10300, 存储容量: 71050 },
  { label: '0.9', 大数据信息条数: 45167, 数据存储数量: 22170, 存储日志信息: 20321, 存储容量: 61050 },
  { label: '1.0', 大数据信息条数: 42170, 数据存储数量: 42170, 存储日志信息: 10321, 存储容量: 53500 },
  { label: '未评分', 大数据信息条数: 22170, 数据存储数量: 45147, 存储日志信息: 16321, 存储容量: 35105 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['大数据信息条数', '数据存储数量', '存储日志信息','存储容量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  存储容量: {
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
      <Chart height={400} width={350} forceFit data={dv} scale={scale} padding="auto" onGetG2Instance={getG2Instance}>
        <Legend
          custom
          allowAllCanceled
          items={[
            { value: '大数据信息条数', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '数据存储数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '存储日志信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '存储容量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '存储容量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '存储容量') {
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
            if (value === '存储容量') {
              return '#2b6cbb';
            }
            if (value === '存储数据量') {
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
        <Geom type="line" position="label*存储容量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
