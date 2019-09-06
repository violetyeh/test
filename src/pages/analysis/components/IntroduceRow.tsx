import React from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Charts from './Charts';
import numeral from 'numeral';
import styles from '../style.less';
import Yuan from '../utils/Yuan';
import Trend from './Trend';
import { IVisitData } from '../data.d';
const { ChartCard, MiniArea, MiniBar, MiniProgress, Field } = Charts;

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: IVisitData[] }) => {
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title='售票数量'
          action={
            <Tooltip
              title={
                <FormattedMessage id="analysis.analysis.introduce" defaultMessage="Introduce" />
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          loading={loading}
          total={1333}
          footer='今日售票量:145'
          contentHeight={46}
        >
          <Trend flag="up" style={{ marginRight: 16 }}>
            <FormattedMessage id="analysis.analysis.week" defaultMessage="Weekly Changes" />
            <span className={styles.trendText}>23%</span>
          </Trend>
          <Trend flag="down">
            <FormattedMessage id="analysis.analysis.day" defaultMessage="Daily Changes" />
            <span className={styles.trendText}>27%</span>
          </Trend>
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title='发车数量'
          action={
            <Tooltip
              title={
                <FormattedMessage id="analysis.analysis.introduce" defaultMessage="Introduce" />
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={numeral(102).format('0,0')}
          footer='今日发车：20'
          contentHeight={46}
        >
          <MiniArea color="#975FE4" data={visitData} />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title='列车数量'
          action={
            <Tooltip
              title={
                <FormattedMessage id="analysis.analysis.introduce" defaultMessage="Introduce" />
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={numeral(23).format('0,0')}
          footer='列车按时到站率：8%'
          contentHeight={46}
        >
          <MiniBar data={visitData} />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title='售票效率'
          action={
            <Tooltip
              title={
                <FormattedMessage id="analysis.analysis.introduce" defaultMessage="Introduce" />
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total="80%"
          footer={
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <Trend flag="up" style={{ marginRight: 16 }}>
                <FormattedMessage id="analysis.analysis.week" defaultMessage="Weekly Changes" />
                <span className={styles.trendText}>5%</span>
              </Trend>
              <Trend flag="down">
                <FormattedMessage id="analysis.analysis.day" defaultMessage="Weekly Changes" />
                <span className={styles.trendText}>7%</span>
              </Trend>
            </div>
          }
          contentHeight={46}
        >
          <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
        </ChartCard>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
