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
  { label: '0.1', 用户访问: 2800, 页面浏览量: 2800, 实时访问量: 2260, 实时用户量: 122 },
  { label: '0.2', 用户访问: 1800, 页面浏览量: 1800, 实时访问量: 1300, 实时用户量: 233 },
  { label: '0.3', 用户访问: 950, 页面浏览量: 950, 实时访问量: 900, 实时用户量: 145 },
  { label: '0.4', 用户访问: 500, 页面浏览量: 500, 实时访问量: 390, 实时用户量: 111 },
  { label: '0.5', 用户访问: 131, 页面浏览量: 131, 实时访问量: 100, 实时用户量: 133 },
  { label: '0.6', 用户访问: 1371, 页面浏览量: 1131, 实时访问量: 100, 实时用户量: 143 },
  { label: '0.7', 用户访问: 131, 页面浏览量: 131, 实时访问量: 100, 实时用户量: 113 },
  { label: '0.8', 用户访问: 1331, 页面浏览量: 1031, 实时访问量: 100, 实时用户量: 103 },
  { label: '0.9', 用户访问: 1341, 页面浏览量: 131, 实时访问量: 100, 实时用户量: 102 },
  { label: '1.0', 用户访问: 1031, 页面浏览量: 131, 实时访问量: 100, 实时用户量: 105 },
  { label: '未评分', 用户访问: 1322, 页面浏览量: 131, 实时访问量: 100, 实时用户量: 109},
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['用户访问', '页面浏览量', '实时访问量','实时用户量'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  实时用户量: {
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
            { value: '用户访问', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '页面浏览量', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '实时访问量', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '实时用户量', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '实时用户量') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '实时用户量') {
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
            if (value === '实时用户浏览量') {
              return '#2b6cbb';
            }
            if (value === '实时') {
              return '#41a2fc';
            }
            if (value === '趋势') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*实时用户量" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
