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
  { label: '0.1', 监测信息: 280, 监测目标量: 280, 水压信息数据: 2260, 设备管理信息: 1022 },
  { label: '0.2', 监测信息: 180, 监测目标量: 180, 水压信息数据: 1300, 设备管理信息: 1033 },
  { label: '0.3', 监测信息: 950, 监测目标量: 950, 水压信息数据: 900, 设备管理信息: 515 },
  { label: '0.4', 监测信息: 500, 监测目标量: 500, 水压信息数据: 390, 设备管理信息: 611 },
  { label: '0.5', 监测信息: 170, 监测目标量: 170, 水压信息数据: 1500, 设备管理信息: 723 },
  { label: '0.6', 监测信息: 170, 监测目标量: 170, 水压信息数据: 2010, 设备管理信息: 456 },
  { label: '0.7', 监测信息: 170, 监测目标量: 170, 水压信息数据: 1000, 设备管理信息: 517 },
  { label: '0.8', 监测信息: 170, 监测目标量: 170, 水压信息数据: 1000, 设备管理信息: 624 },
  { label: '0.9', 监测信息: 170, 监测目标量: 170, 水压信息数据: 1600, 设备管理信息: 716 },
  { label: '1.0', 监测信息: 170, 监测目标量: 170, 水压信息数据: 1500, 设备管理信息: 418 },
  { label: '未评分', 监测信息: 170, 监测目标量: 170, 水压信息数据: 100, 设备管理信息: 112 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['监测信息', '监测目标量', '水压信息数据','设备管理信息'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  设备管理信息: {
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
            { value: '监测信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '监测目标量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '水压信息数据', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '设备管理信息', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '设备管理信息') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '设备管理信息') {
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
            if (value === '监测数量') {
              return '#2b6cbb';
            }
            if (value === '设备') {
              return '#41a2fc';
            }
            if (value === '网络') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*设备管理信息" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
