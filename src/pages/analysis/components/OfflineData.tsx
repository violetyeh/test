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
  { label: '1月份', 备份信息: 819, 备份数量: 819, 备份恢复数量: 2619, 备份进度: 119 },
  { label: '2月份', 备份信息: 919, 备份数量: 880, 备份恢复数量: 1319, 备份进度: 83 },
  { label: '3月份', 备份信息: 950, 备份数量: 950, 备份恢复数量: 919, 备份进度: 119 },
  { label: '4月份', 备份信息: 519, 备份数量: 519, 备份恢复数量: 390, 备份进度: 56 },
  { label: '5月份', 备份信息: 1000, 备份数量: 698, 备份恢复数量: 1544, 备份进度: 66 },
  { label: '6月份', 备份信息: 1698, 备份数量: 634, 备份恢复数量: 515, 备份进度: 54 },
  { label: '7月份', 备份信息: 634, 备份数量: 434, 备份恢复数量: 1544, 备份进度: 83 },
  { label: '8月份', 备份信息: 1698, 备份数量: 284, 备份恢复数量: 512, 备份进度: 75 },
  { label: '9月份', 备份信息: 534, 备份数量: 334, 备份恢复数量: 236, 备份进度: 81 },
  { label: '10月份', 备份信息: 698, 备份数量: 698, 备份恢复数量: 786, 备份进度: 83 },
  { label: '11月份', 备份信息: 1698, 备份数量: 1698, 备份恢复数量: 1544, 备份进度: 119 },
  { label: '12月份', 备份信息: 1698, 备份数量: 1698, 备份恢复数量: 1544, 备份进度: 119 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['备份信息', '备份数量', '备份恢复数量','备份进度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  备份进度: {
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
      <Chart height={419} width={519} forceFit data={dv} scale={scale} padding="auto" onGetG2Instance={getG2Instance}>
        <Legend
          custom
          allowAllCanceled
          items={[
            { value: '备份信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '备份数量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '备份恢复数量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '备份进度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '备份进度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '备份进度') {
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
            if (value === '备份数量') {
              return '#2b6cbb';
            }
            if (value === '数据存储量') {
              return '#41a2fc';
            }
            if (value === '备份数量') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*备份进度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
