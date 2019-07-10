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
  { label: '0.1', 楼宇数量: 113, 媒体设备数量: 222, 媒体资源数量: 260, 资源传播量: 412 },
  { label: '0.2', 楼宇数量: 180, 媒体设备数量: 180, 媒体资源数量: 300, 资源传播量: 413 },
  { label: '0.3', 楼宇数量: 450, 媒体设备数量: 950, 媒体资源数量: 900, 资源传播量: 415 },
  { label: '0.4', 楼宇数量: 330, 媒体设备数量: 500, 媒体资源数量: 390, 资源传播量: 511 },
  { label: '0.5', 楼宇数量: 634, 媒体设备数量: 634, 媒体资源数量: 1500, 资源传播量:123 },
  { label: '0.6', 楼宇数量: 634, 媒体设备数量: 634, 媒体资源数量: 2010, 资源传播量: 156 },
  { label: '0.7', 楼宇数量: 634, 媒体设备数量: 634, 媒体资源数量: 1000, 资源传播量: 1117 },
  { label: '0.8', 楼宇数量: 370, 媒体设备数量: 270, 媒体资源数量: 1500, 资源传播量: 724 },
  { label: '0.9', 楼宇数量: 634, 媒体设备数量: 634, 媒体资源数量: 470, 资源传播量: 516 },
  { label: '1.0', 楼宇数量: 634, 媒体设备数量: 634, 媒体资源数量: 260, 资源传播量: 118 },
  { label: '未评分', 楼宇数量: 634, 媒体设备数量: 634, 媒体资源数量: 100, 资源传播量: 512 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['楼宇数量', '媒体设备数量', '媒体资源数量','资源传播量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  资源传播量: {
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
            { value: '楼宇数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '媒体设备数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '媒体资源数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '资源传播量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '资源传播量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '资源传播量') {
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
            if (value === '媒体资源量') {
              return '#2b6cbb';
            }
            if (value === '价格') {
              return '#41a2fc';
            }
            if (value === '收益') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*资源传播量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
