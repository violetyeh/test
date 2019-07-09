import React from 'react';
import { Row, Col, Card, Tabs, DatePicker } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import Charts from './Charts';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { ISalesData } from '../data';
import styles from '../style.less';

const { Bar } = Charts;

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const rankingListData: { title: string; total: number }[] = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: '媒体发布数据' + (i + 1),
    total: 23 * (i + 1),
  });
}

const SalesCard = ({
  rangePickerValue,
  salesData,
  isActive,
  handleRangePickerChange,
  loading,
  selectDate,
}: {
  rangePickerValue: RangePickerValue;
  isActive: (key: 'today' | 'week' | 'month' | 'year') => string;
  salesData: ISalesData[];
  loading: boolean;
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  selectDate: (key: 'today' | 'week' | 'month' | 'year') => void;
}) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs

          size="large"
          tabBarStyle={{ marginBottom: 24 }}
        >
          <TabPane
            tab='媒体发布数据'
            key="sales"
          >
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={295}
                    title='每月发布工作量'
                    data={salesData}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>
                    楼宇媒体发布点排行
                  </h4>
                  <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                      <li key={item.title}>
                        <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span className={styles.rankingItemValue}>
                          {numeral(item.total).format('0,0')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>

        </Tabs>
      </div>
    </Card>
  );

export default SalesCard;
