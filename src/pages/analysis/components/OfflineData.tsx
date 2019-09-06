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
  { label: '0.1', 长途汽车数量: 154, 路线信息: 80, 售出车票: 45, 总销售额: 1000 },
  { label: '0.2', 长途汽车数量: 190, 路线信息: 80, 售出车票: 13, 总销售额: 812 },
  { label: '0.3', 长途汽车数量: 121, 路线信息: 90, 售出车票: 90, 总销售额: 1012 },
  { label: '0.4', 长途汽车数量: 150, 路线信息: 50, 售出车票: 39, 总销售额: 524 },
  { label: '0.5', 长途汽车数量: 123, 路线信息: 24, 售出车票: 50, 总销售额: 656},
  { label: '0.6', 长途汽车数量: 112, 路线信息: 64, 售出车票: 66, 总销售额: 541 },
  { label: '0.7', 长途汽车数量: 163, 路线信息: 44, 售出车票: 16, 总销售额: 878 },
  { label: '0.8', 长途汽车数量: 123, 路线信息: 24, 售出车票: 66, 总销售额: 752 },
  { label: '0.9', 长途汽车数量: 153, 路线信息: 34, 售出车票: 23, 总销售额: 841 },
  { label: '1.0', 长途汽车数量: 123, 路线信息: 23, 售出车票: 78, 总销售额: 812 },
  { label: '未评分', 长途汽车数量: 113, 路线信息: 13, 售出车票: 66, 总销售额: 1100 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['长途汽车数量', '路线信息', '售出车票','总销售额'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  总销售额: {
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
            { value: '长途汽车数量', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '路线信息', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '售出车票', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '总销售额', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '总销售额') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '总销售额') {
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
            if (value === '汽车数量') {
              return '#2b6cbb';
            }
            if (value === '总销售额') {
              return '#41a2fc';
            }
            if (value === '路线信息') {
              return '#54ca76';
            }
          }]}
          adjust={[{
            type: 'dodge',
            marginRatio: 1 / 32,
          }]}
        />
        <Geom type="line" position="label*总销售额" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
