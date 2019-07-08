import React, { Component, Suspense } from 'react';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';
import PageLoading from './components/PageLoading';
import { Dispatch } from 'redux';
import { IAnalysisData } from './data.d';
import { RadioChangeEvent } from 'antd/es/radio';
import { GridContent } from '@ant-design/pro-layout';
import getFakeChartData from './mock-data';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));
const TopSearch = React.lazy(() => import('./components/TopSearch'));
const ProportionSales = React.lazy(() => import('./components/ProportionSales'));
const OfflineData = React.lazy(() => import('./components/OfflineData'));

interface analysisProps {
  analysis: IAnalysisData;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface analysisState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  rangePickerValue: RangePickerValue;
}

class Analysis extends Component<analysisProps, analysisState> {
  state: analysisState = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };
  reqRef!: number;
  timeoutId!: number;

  handleChangeSalesType = (e: RadioChangeEvent) => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = (key: string) => {
    this.setState({
      currentTabKey: key,
    });
  };

  isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { analysis, loading } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = getFakeChartData;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    return (
      <GridContent>
        <React.Fragment>

          <Suspense fallback={null}>
            <SalesCard
              rangePickerValue={rangePickerValue}
              salesData={salesData}
              isActive={this.isActive}
              handleRangePickerChange={() => { }}
              loading={loading}
              selectDate={() => { }}
            />
            <div style={{ marginBottom: 50 }} />
            <Suspense fallback={<PageLoading />}>
              <IntroduceRow loading={loading} visitData={visitData} />
            </Suspense>
          </Suspense>
        </React.Fragment>
      </GridContent >
    );
  }
}

export default Analysis;
