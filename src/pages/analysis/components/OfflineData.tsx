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
  { label: '0.1', 农残信息: 700, 检测目标数: 2800, 检测分析价格: 2260, 达标数: 122 },
  { label: '0.2', 农残信息: 1800, 检测目标数: 1800, 检测分析价格: 1300, 达标数: 353 },
  { label: '0.3', 农残信息: 950, 检测目标数: 950, 检测分析价格: 900, 达标数: 785 },
  { label: '0.4', 农残信息: 500, 检测目标数: 500, 检测分析价格: 390, 达标数: 801 },
  { label: '0.5', 农残信息: 170, 检测目标数: 170, 检测分析价格: 100, 达标数: 563 },
  { label: '0.6', 农残信息: 970, 检测目标数: 570, 检测分析价格: 500, 达标数: 123 },
  { label: '0.7', 农残信息: 170, 检测目标数: 170, 检测分析价格: 100, 达标数: 345 },
  { label: '0.8', 农残信息: 970, 检测目标数: 770, 检测分析价格: 500, 达标数: 378 },
  { label: '0.9', 农残信息: 170, 检测目标数: 170, 检测分析价格: 100, 达标数: 343 },
  { label: '1.0', 农残信息: 170, 检测目标数: 170, 检测分析价格: 100, 达标数: 358 },
  { label: '未评分', 农残信息: 170, 检测目标数: 170, 检测分析价格: 100, 达标数: 373 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['农残信息', '检测目标数', '检测分析价格','达标数'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  达标数: {
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
            { value: '农残信息', marker: { symbol: 'square', fill: '#3182bd', radius: 5 } },
            { value: '检测目标数', marker: { symbol: 'square', fill: '#41a2fc', radius: 5 } },
            { value: '检测分析价格', marker: { symbol: 'square', fill: '#54ca76', radius: 5 } },
            { value: '达标数', marker: { symbol: 'hyphen', stroke: '#fad248', radius: 5, lineWidth: 3 } },
          ]}
          onClick={(ev) => {
            const item = ev.item;
            const value = item.value;
            const checked = ev.checked;
            const geoms = chartIns.getAllGeoms();
            for (let i = 0; i < geoms.length; i++) {
              const geom = geoms[i];
              if (geom.getYScale().field === value && value === '达标数') {
                if (checked) {
                  geom.show();
                } else {
                  geom.hide();
                }
              } else if (geom.getYScale().field === 'value' && value !== '达标数') {
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
            if (value === '放款应还本金') {
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
        <Geom type="line" position="label*达标数" color="#fad248" size={3} />
      </Chart>
    </Card>
  );

export default OfflineData;
