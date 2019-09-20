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
  { label: '0.1', 已发布制图数据: 1563, 制图标准信息: 1000, 新增标准: 600, 发布进度: 82 },
  { label: '0.2', 已发布制图数据: 900, 制图标准信息: 880, 新增标准: 700, 发布进度: 63 },
  { label: '0.3', 已发布制图数据: 950, 制图标准信息: 950, 新增标准: 800, 发布进度: 75 },
  { label: '0.4', 已发布制图数据: 500, 制图标准信息: 500, 新增标准: 390, 发布进度: 56 },
  { label: '0.5', 已发布制图数据: 234, 制图标准信息: 234, 新增标准: 1666, 发布进度: 66 },
  { label: '0.6', 已发布制图数据: 1234, 制图标准信息: 634, 新增标准: 666, 发布进度: 54 },
  { label: '0.7', 已发布制图数据: 634, 制图标准信息: 434, 新增标准: 1666, 发布进度: 83 },
  { label: '0.8', 已发布制图数据: 234, 制图标准信息: 284, 新增标准: 666, 发布进度: 75 },
  { label: '0.9', 已发布制图数据: 534, 制图标准信息: 334, 新增标准: 236, 发布进度: 81 },
  { label: '1.0', 已发布制图数据: 234, 制图标准信息: 234, 新增标准: 786, 发布进度: 83 },
  { label: '未评分', 已发布制图数据: 234, 制图标准信息: 234, 新增标准: 666, 发布进度: 64 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['已发布制图数据', '制图标准信息', '新增标准','发布进度'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  发布进度: {
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
            { value: '已发布制图数据', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '制图标准信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '新增标准', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '发布进度', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '发布进度') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '发布进度') {
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
            if (value === '发布数量') {
              return '#2b6cbb';
            }
            if (value === '制图数据') {
              return '#41a2fc';
            }
            if (value === '制图标准信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*发布进度" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
