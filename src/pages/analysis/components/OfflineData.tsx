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
  { label: '0.1', 可视化页面模板数量: 80, 数据采集目标: 80, 数据相关信息: 160, 可视化数据信息: 10 },
  { label: '0.2', 可视化页面模板数量: 90, 数据采集目标: 80, 数据相关信息: 130, 可视化数据信息: 8 },
  { label: '0.3', 可视化页面模板数量: 95, 数据采集目标: 90, 数据相关信息: 90, 可视化数据信息: 10 },
  { label: '0.4', 可视化页面模板数量: 50, 数据采集目标: 50, 数据相关信息: 39, 可视化数据信息: 5 },
  { label: '0.5', 可视化页面模板数量: 123, 数据采集目标: 24, 数据相关信息: 166, 可视化数据信息: 6},
  { label: '0.6', 可视化页面模板数量: 123, 数据采集目标: 64, 数据相关信息: 66, 可视化数据信息: 5 },
  { label: '0.7', 可视化页面模板数量: 63, 数据采集目标: 44, 数据相关信息: 166, 可视化数据信息: 8 },
  { label: '0.8', 可视化页面模板数量: 123, 数据采集目标: 24, 数据相关信息: 66, 可视化数据信息: 7 },
  { label: '0.9', 可视化页面模板数量: 53, 数据采集目标: 34, 数据相关信息: 23, 可视化数据信息: 8 },
  { label: '1.0', 可视化页面模板数量: 23, 数据采集目标: 23, 数据相关信息: 78, 可视化数据信息: 8 },
  { label: '未评分', 可视化页面模板数量: 123, 数据采集目标: 123, 数据相关信息: 166, 可视化数据信息: 10 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['可视化页面模板数量', '数据采集目标', '数据相关信息','可视化数据信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  可视化数据信息: {
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
            { value: '可视化页面模板数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '数据采集目标', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '数据相关信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '可视化数据信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '可视化数据信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '可视化数据信息') {
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
            if (value === '样品数') {
              return '#41a2fc';
            }
            if (value === '数据采集目标') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*可视化数据信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
