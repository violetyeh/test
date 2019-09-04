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
  { label: '0.1', 运输业务数量: 227, 运输车辆数量: 208, 运输里程: 160, 定位信息: 105 },
  { label: '0.2', 运输业务数量: 123, 运输车辆数量: 149, 运输里程: 300, 定位信息: 310 },
  { label: '0.3', 运输业务数量: 195, 运输车辆数量: 159, 运输里程: 200, 定位信息: 105 },
  { label: '0.4', 运输业务数量: 211, 运输车辆数量: 253, 运输里程: 393, 定位信息: 410 },
  { label: '0.5', 运输业务数量: 456, 运输车辆数量: 154, 运输里程: 303, 定位信息: 105 },
  { label: '0.6', 运输业务数量: 213, 运输车辆数量: 272, 运输里程: 310, 定位信息: 530 },
  { label: '0.7', 运输业务数量: 222, 运输车辆数量: 161, 运输里程: 105, 定位信息: 610 },
  { label: '0.8', 运输业务数量: 311, 运输车辆数量: 362, 运输里程:300, 定位信息: 710 },
  { label: '0.9', 运输业务数量: 167, 运输车辆数量: 244, 运输里程: 203, 定位信息: 610 },
  { label: '1.0', 运输业务数量: 434, 运输车辆数量: 412, 运输里程: 103, 定位信息: 530 },
  { label: '未评分', 运输业务数量: 212, 运输车辆数量: 147, 运输里程: 163, 定位信息: 105 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['运输业务数量', '运输车辆数量', '运输里程','定位信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  定位信息: {
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
            { value: '运输业务数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '运输车辆数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '运输里程', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '定位信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '定位信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '定位信息') {
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
            if (value === '定位信息') {
              return '#2b6cbb';
            }
            if (value === '车辆数量') {
              return '#41a2fc';
            }
            if (value === '运输业务数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*定位信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
