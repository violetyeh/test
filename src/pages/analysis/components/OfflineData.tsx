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
  { label: '0.1', 监控视频大小: 127, 安防设备信息: 1008, 监控日志信息: 1600, 安防存储容量: 105 },
  { label: '0.2', 监控视频大小: 123, 安防设备信息: 1409, 监控日志信息: 3000, 安防存储容量: 310 },
  { label: '0.3', 监控视频大小: 195, 安防设备信息: 1059, 监控日志信息: 900, 安防存储容量: 105 },
  { label: '0.4', 监控视频大小: 111, 安防设备信息: 1053, 监控日志信息: 3930, 安防存储容量: 410 },
  { label: '0.5', 监控视频大小: 456, 安防设备信息: 1504, 监控日志信息: 3030, 安防存储容量: 105 },
  { label: '0.6', 监控视频大小: 113, 安防设备信息: 1702, 监控日志信息: 3100, 安防存储容量: 530 },
  { label: '0.7', 监控视频大小: 222, 安防设备信息: 1061, 监控日志信息: 1050, 安防存储容量: 610 },
  { label: '0.8', 监控视频大小: 311, 安防设备信息: 3602, 监控日志信息:3000, 安防存储容量: 710 },
  { label: '0.9', 监控视频大小: 167, 安防设备信息: 2404, 监控日志信息: 2030, 安防存储容量: 610 },
  { label: '1.0', 监控视频大小: 434, 安防设备信息: 4102, 监控日志信息: 1030, 安防存储容量: 530 },
  { label: '未评分', 监控视频大小: 212, 安防设备信息: 1407, 监控日志信息: 1630, 安防存储容量: 105 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['监控视频大小', '安防设备信息', '监控日志信息','安防存储容量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  安防存储容量: {
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
      <Chart height={400} width={3} forceFit data={dv} scale={scale} padding="auto" onGetG2Instance={getG2Instance}>
        <Legend
          custom
          allowAllCanceled
          items={[
            { value: '监控视频大小', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '安防设备信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '监控日志信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '安防存储容量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '安防存储容量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '安防存储容量') {
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
            if (value === '安防存储容量') {
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
        <Geom type="line" position="label*安防存储容量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
