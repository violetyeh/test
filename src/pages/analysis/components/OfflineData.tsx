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
  { label: '0.1', 施工监理数量: 1700, 监理项目信息: 1500, 监理信息:2390, 监理安全率: 1100 },
  { label: '0.2', 施工监理数量: 1900, 监理项目信息: 2600, 监理信息: 4113, 监理安全率: 1200 },
  { label: '0.3', 施工监理数量: 1950, 监理项目信息: 3950, 监理信息: 3250, 监理安全率: 1100 },
  { label: '0.4', 施工监理数量: 5100, 监理项目信息: 1500, 监理信息: 2139, 监理安全率: 1500 },
  { label: '0.5', 施工监理数量: 2510, 监理项目信息: 1950, 监理信息: 4652, 监理安全率: 900 },
  { label: '0.6', 施工监理数量: 1950, 监理项目信息: 4634, 监理信息: 2252, 监理安全率: 3000 },
  { label: '0.7', 施工监理数量: 1950, 监理项目信息: 2685, 监理信息: 1152, 监理安全率: 2600 },
  { label: '0.8', 施工监理数量: 1020, 监理项目信息: 3950, 监理信息: 1152, 监理安全率: 520 },
  { label: '0.9', 施工监理数量: 2350, 监理项目信息: 1950, 监理信息: 2252, 监理安全率: 3100 },
  { label: '1.0', 施工监理数量: 3150, 监理项目信息: 1950, 监理信息: 3112, 监理安全率: 1203 },
  { label: '未评分', 施工监理数量: 1150, 监理项目信息: 1950, 监理信息: 1052, 监理安全率: 1420 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['施工监理数量', '监理项目信息', '监理信息','监理安全率'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  监理安全率: {
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
            { value: '施工监理数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '监理项目信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '监理信息', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '监理安全率', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '监理安全率') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '监理安全率') {
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
            if (value === '施工监理数量') {
              return '#2b6cbb';
            }
            if (value === '新增项目') {
              return '#41a2fc';
            }
            if (value === '监理项目信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*监理安全率" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
