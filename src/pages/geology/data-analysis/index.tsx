import { Component, Fragment } from 'react';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Divider, message, Card, Table, Form, Col, Row, Button, Input, Switch, Progress } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Save from './Save';
import styles from '../style.less';

interface DataAnalysisProps { }
interface DataAnalysisState {
  saveVisible: boolean;
  data: any[];
  currentItem: any;
}

class DataAnalysis extends Component<DataAnalysisProps, DataAnalysisState> {
  state: DataAnalysisState = {
    saveVisible: false,
    data: [],
    currentItem: {},
  };

  columns: ColumnProps<any>[] = [
    {
      title: '广告投放类别',
      dataIndex: 'id',
    },
    {
      title: '行业分类',
      dataIndex: 'date',
    },
    {
      title: '广告定位',
      dataIndex: 'creator',
    },
    {
      title: '综合门户',
      dataIndex: 'column',
    },
    {
      title: '价格区间',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.edit(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.setting(record)}>删除</a>
        </Fragment>
      ),
    },
   

  ];

  edit = (record: any) => {

    this.setState({
      currentItem: record,
      saveVisible: true,
    })
  };

  setting = (record: any) => {
    message.error('系统处于离线状态，无法进行此操作');
  };
  render() {
    const { saveVisible, currentItem } = this.state;
    const data = [
      {
        id: '网站媒体',
        date: ' 新闻资讯',
        creator: '标准广告位',
        column:' 新浪网 ',
        status: '20元-100元',
      },
      {
        id: '微信',
        date: '财经商业',
        creator: '非标运营位',
        column:'凤凰网 ',
        status:'100元-1000元',
      },
      {
        id: '微博',
        date: 'IT-科技',
        creator: '固定运营位',
        column:'腾讯网',
        status: '1000元-2000元',
      },
      {
        id: '视频网站',
        date: '房产家居',
        creator: '标准广告位',
        column:'搜狐网',
        status: '2000元-10000元',
      },
      {
        id: '贴吧',
        date: '酒店旅游',
        creator: '非标运营位',
        column:'光明网 ',
        status: '10000元以上',
      },
      {
        id: '论坛',
        date: '教育培训',
        creator: '标准广告位',
        column:'慧聪网',
        status: '2000元-10000元',
      },
      {
        id: '报纸杂志',
        date: '女性时尚',
        creator: '标准广告位',
        column:'中国经济网',
        status: '100元-1000元',
      },
      {
        id: '百科',
        date: '亲子母婴',
        creator: '固定运营位',
        column:'中国日报网',
        status: '100元-1000元',
      },
    ];
       return (
      <PageHeaderWrapper title="广告投放营销管理">
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <Form layout="inline">
              <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                <Col md={7} sm={24}>
                  <Form.Item label="广告投放类别">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="行业分类">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col md={9} sm={24}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ float: 'right', marginBottom: 24 }}>
                      <Button
                        icon="plus"
                        htmlType="button"
                        onClick={() => this.setState({ saveVisible: true, currentItem: {} })}
                      >
                        添加投放广告营销
                      </Button>
                      <Divider type="vertical" />
                      <Button icon="search" type="primary" htmlType="submit">
                        查询
                      </Button>
                      <Button style={{ marginLeft: 8 }} onClick={() => { }}>
                        重置
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
          <Table dataSource={data} columns={this.columns} rowKey={item => item.id} />
        </Card>
        {saveVisible && <Save currentItem={currentItem} handleSaveVisible={() => this.setState({ saveVisible: false })} />}
      </PageHeaderWrapper>
    );
  }
}

export default DataAnalysis;
