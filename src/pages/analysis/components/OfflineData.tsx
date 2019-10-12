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
  { label: '0.1', 工程监理数量: 170, 工期数: 150, 监理信息:239, 工程进度: 11 },
  { label: '0.2', 工程监理数量: 100, 工期数: 260, 监理信息: 411, 工程进度: 12 },
  { label: '0.3', 工程监理数量: 150, 工期数: 395, 监理信息: 320, 工程进度: 11 },
  { label: '0.4', 工程监理数量: 510, 工期数: 150, 监理信息: 219, 工程进度: 15 },
  { label: '0.5', 工程监理数量: 250, 工期数: 195, 监理信息: 462, 工程进度: 9 },
  { label: '0.6', 工程监理数量: 190, 工期数: 463, 监理信息: 222, 工程进度: 30 },
  { label: '0.7', 工程监理数量: 150, 工期数: 268, 监理信息: 112, 工程进度: 26 },
  { label: '0.8', 工程监理数量: 100, 工期数: 395, 监理信息: 152, 工程进度: 52 },
  { label: '0.9', 工程监理数量: 250, 工期数: 195, 监理信息: 222, 工程进度: 31 },
  { label: '1.0', 工程监理数量: 350, 工期数: 195, 监理信息: 312, 工程进度: 12 },
  { label: '未评分', 工程监理数量: 115, 工期数: 195, 监理信息: 52, 工程进度: 14 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['工程监理数量', '工期数', '监理信息','工程进度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  工程进度: {
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
            { value: '工程监理数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '工期数', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '监理信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '工程进度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '工程进度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '工程进度') {
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
            if (value === '工程监理数量') {
              return '#2b6cbb';
            }
            if (value === '新增项目') {
              return '#41a2fc';
            }
            if (value === '工期数') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*工程进度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
